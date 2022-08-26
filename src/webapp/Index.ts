import express from "express";
import expressWs from "express-ws";
import fs from "fs";
import https from "https";
import path from "path";
import winston from "winston";
import {DatabaseFileService} from "./DatabaseFileService"
import {CacheFileService} from "./CacheFileService"
import {OddsApiService} from "./OddsApiService"

async function bootstrap() {
  const port = process.env.PORT || 3000;
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
  cert: fs.readFileSync(path.join(__dirname, '../ssl', 'server.crt')),
  key: fs.readFileSync(path.join(__dirname, '../ssl', 'server.key'))
}
  const databaseFileService: DatabaseFileService = new DatabaseFileService(logger);
  const oddsApiService: OddsApiService = new OddsApiService(logger);
  const cacheFileService: CacheFileService = new CacheFileService(logger);

  const app = express();
  const server = https.createServer(serverOptions, app);
  expressWs(app, server)

  app.use(express.static(__dirname + "/../src/webapp/web/static"));
  app.use(express.static(__dirname + "/../src/webapp/web/static/template", {extensions: ['html']}));

  app.ws('/', (ws:any, req:any) => {
    const timeSinceLastUpdateInMinutes: number = (Date.now() - cacheFileService.getLastUpdateTime()) / 6e4;
    logger.info(`Time since last update in minutes: ${timeSinceLastUpdateInMinutes}`)
    if (timeSinceLastUpdateInMinutes >= 60) {
        logger.info(`Requesting updated scores from oddsApiService`);
        oddsApiService.getAllScores(3).then((values) => {
        cacheFileService.cacheAllScores(values);
        ws.send(JSON.stringify(cacheFileService.getAllScores()));
      });
    }
    logger.info("Connected")

    const toSendScores = {
      "type": "scores",
      "data": cacheFileService.getAllScores()
    };

    ws.send(JSON.stringify(toSendScores));
    ws.on('message', (msg:any) => {
      const msgJson = JSON.parse(msg);
      logger.info(`on message ${msg}`);
      if (msgJson.type === "walletConnected") {
        logger.info("wallet Connected - adding user to db");
        const toSendOpenOrdersForWallet = {
          "type": "walletOpenOrders",
          "data": databaseFileService.getData(msgJson.walletAddress)
        };
        ws.send(JSON.stringify(toSendOpenOrdersForWallet));
      }
      if (msgJson.type === "removeOrder") {
        databaseFileService.removeOrder(msgJson.data);
        const toSendRemoveOrder = {
          "type": "removeOrder",
          "data": msgJson.data
        };
        ws.send(JSON.stringify(toSendRemoveOrder));
      }
      if (msgJson.type === "addOrder") {
        databaseFileService.addOrder(msgJson.data);
        const toSendAddOrder = {
          "type": "addOrder",
          "data": msgJson.data
        };
        ws.send(JSON.stringify(toSendAddOrder));
      }
    });
  });


  server.listen(port, () => {
    logger.info( `Server started at https://localhost:${port}` );
  });
}

bootstrap();
