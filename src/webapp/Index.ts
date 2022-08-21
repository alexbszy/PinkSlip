import express from "express";
import expressWs from "express-ws";
import winston from "winston";
import {CacheFileService} from "./CacheFileService"
import {OddsApiService} from "./OddsApiService"

async function bootstrap() {
  const port = process.env.PORT || 8082;
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({filename: 'index.log'})
    ]
  });

  const oddsApiService: OddsApiService = new OddsApiService(logger);
  const cacheFileService: CacheFileService = new CacheFileService(logger);

  const app = expressWs(express()).app;
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
    ws.send(JSON.stringify(cacheFileService.getAllScores()));
    ws.on('message', (msg:any) => {
      logger.info(`on message ${msg}`);
      if (msg === "request") {
        ws.send("sending something soon");
      }
    });
  });

  app.listen(port, () => {
      logger.info( `Server started at http://localhost:${port}` );
  });
}

bootstrap();
