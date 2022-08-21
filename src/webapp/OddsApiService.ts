import winston from "winston";
import { CURRENT_BET_LIST } from "./CurrentList";

export class OddsApiService {
    logger: winston.Logger;

    constructor(_logger: winston.Logger) {
        this.logger = _logger;
        this.logger.info("Initializing OddsApiService")
    }

    async getAllScores(daysBack: number) : Promise<any> {
        return Promise.all([
            this.getScores(CURRENT_BET_LIST[0], daysBack),
            this.getScores(CURRENT_BET_LIST[1], daysBack),
            this.getScores(CURRENT_BET_LIST[2], daysBack),
            this.getScores(CURRENT_BET_LIST[3], daysBack),
            this.getScores(CURRENT_BET_LIST[4], daysBack),
            this.getScores(CURRENT_BET_LIST[5], daysBack),
            this.getScores(CURRENT_BET_LIST[6], daysBack),
            this.getScores(CURRENT_BET_LIST[7], daysBack),
            this.getScores(CURRENT_BET_LIST[8], daysBack),
            this.getScores(CURRENT_BET_LIST[9], daysBack)
        ]);
    }

    async getScores(sport: string, daysBack: number) : Promise<any> {
        const axios = require('axios');
        require('dotenv').config({ path: __dirname + '/../.env'});
        let url: string = `https://api.the-odds-api.com/v4/sports/${sport}/scores/?apiKey=${process.env.ODDS_API_KEY}`;
        if (daysBack > 0) {
            url = `https://api.the-odds-api.com/v4/sports/${sport}/scores/?daysFrom=${daysBack}&apiKey=${process.env.ODDS_API_KEY}`;
        }
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            this.logger.error(String(error));
            return [];
        }
    }
}
