import winston from "winston";
import {Sport} from "./enums/sports"

export class OddsApiService {
    logger: winston.Logger;

    constructor(_logger: winston.Logger) {
        this.logger = _logger;
        this.logger.info("Initializing OddsApiService")
    }

    async getAllScores(daysBack: number) : Promise<any> {
        return Promise.all([
            [],
            this.getScores(Sport.American_Football_NCAAF, daysBack),
            this.getScores(Sport.American_Football_NFL, daysBack),
            this.getScores(Sport.Baseball_MLB, daysBack),
            this.getScores(Sport.Basketball_NBA, daysBack),
            this.getScores(Sport.Basketball_NCAAB, daysBack),
            this.getScores(Sport.Ice_Hockey_NHL, daysBack),
            this.getScores(Sport.Soccer_EPL, daysBack),
            this.getScores(Sport.Soccer_Germany_Bundesliga, daysBack),
            this.getScores(Sport.Soccer_Spain_La_Liga, daysBack),
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
