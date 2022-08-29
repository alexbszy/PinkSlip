import express from "express";
import expressWs from "express-ws";
import fs from "fs";
import https from "https";
import path from "path";
import winston from "winston";
import {DatabaseFileService} from "./DatabaseFileService"
import {CacheFileService} from "./CacheFileService"
import {OddsApiService} from "./OddsApiService"


function sendScores(ws: any, cacheFileService: any) {
  const toSendScores = {
    "type": "scores",
    "data": cacheFileService.getAllScores()
  };
  ws.send(JSON.stringify(toSendScores));
}


function sendCurrentState(ws: any, databaseFileService: any) {
  const toSendAllOrders = {
    "type": "allOrders",
    "data": databaseFileService.getAllBets()
  };
  ws.send(JSON.stringify(toSendAllOrders));
}


async function bootstrap() {
  const port = process.env.PORT || 8443;
  const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}][${level}]${message}`;
  });

  const logger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), logFormat),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({filename: 'index.log'})
    ]
  });
const serverOptions = {
  cert: fs.readFileSync(path.join(__dirname, '../ssl', 'fullchain.pem')),
  key: fs.readFileSync(path.join(__dirname, '../ssl', 'privkey.pem'))
}

  const databaseFileService: DatabaseFileService = new DatabaseFileService(logger);
  const oddsApiService: OddsApiService = new OddsApiService(logger);
  const cacheFileService: CacheFileService = new CacheFileService(logger);

  const app = express();
  const server = https.createServer(serverOptions, app);
  expressWs(app, server)
  // const app = expressWs(express()).app;

  app.use(express.static(__dirname + "/../src/webapp/web/static"));
  app.use(express.static(__dirname + "/../src/webapp/web/static/template", {extensions: ['html']}));

  app.ws('/', (ws:any, req:any) => {
    databaseFileService.clearExpired()
    sendScores(ws, cacheFileService);
    sendCurrentState(ws, databaseFileService);

    const timeSinceLastUpdateInMinutes: number = (Date.now() - cacheFileService.getLastUpdateTime()) / 6e4;
    logger.info(`Time since last update in minutes: ${timeSinceLastUpdateInMinutes}`)

    if (timeSinceLastUpdateInMinutes >= 60) {
        logger.info(`Requesting updated scores from oddsApiService`);
        oddsApiService.getAllScores(3).then((values) => {
        cacheFileService.cacheAllScores(values);
        sendScores(ws, cacheFileService);
      });
    }

    logger.info("Connected")

    ws.on('message', (msg:any) => {
      const msgJson = JSON.parse(msg);
      logger.info(`on message ${msg}`);

      if (msgJson.type === "walletConnected") {
        logger.info("wallet Connected - adding user to db");
        databaseFileService.addWallet(msgJson.walletAddress);
        ws.send(JSON.stringify({"type": "walletConnected"}));
      }
      else if (msgJson.type === "removeOrder") {
        databaseFileService.removeOrder(msgJson.data);
        const toSendRemoveOrder = {
          "type": "removeOrder",
          "data": msgJson.data
        };
        sendCurrentState(ws, databaseFileService);
        ws.send(JSON.stringify(toSendRemoveOrder));
      }
      else if (msgJson.type === "addOrder") {
        databaseFileService.addOrder(msgJson.data);
        const toSendAddOrder = {
          "type": "addOrder",
          "data": msgJson.data
        };
        sendCurrentState(ws, databaseFileService);
        ws.send(JSON.stringify(toSendAddOrder));
      }
      else if (msgJson.type === "fill") {
        databaseFileService.addFill(msgJson.data);
        logger.info(JSON.stringify(msgJson.data));

        databaseFileService.updateOrder({"walletAddress": msgJson.data.maker, "orderId": msgJson.data.makerBetId, "status": "pending"});

        const toSendAddFill = {
          "type": "fill",
          "data": msgJson.data
        };
        sendCurrentState(ws, databaseFileService);
        ws.send(JSON.stringify(toSendAddFill));
      }
    });
  });

  server.listen(port, () => {
  // app.listen(port, () => {
    logger.info( `Server started at https://localhost:${port}` );
  });
}

bootstrap();
