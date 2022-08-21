import { assert } from "console";
import winston from "winston";
import { Sport } from "./enums/sports";

export class CacheFileService {
    logger: winston.Logger;
    lastUpdated: number;

    constructor(_logger: winston.Logger) {
        this.logger = _logger;
        this.logger.info("Initializing FileService")
        this._initEachCache();
        this.lastUpdated = this.getLastUpdateTime();
        this.logger.info(`last_updated epoch: ${this.lastUpdated}`)
    }

    cacheAllScores(scores: any) {
        assert(scores.length === 10);
        const fs = require('fs');
        fs.writeFileSync(__dirname + `/../cache/all.json`, JSON.stringify(scores[0]));
        fs.writeFileSync(__dirname + `/../cache/${Sport.American_Football_NCAAF}.json`, JSON.stringify(scores[1]));
        fs.writeFileSync(__dirname + `/../cache/${Sport.American_Football_NFL}.json`, JSON.stringify(scores[2]));
        fs.writeFileSync(__dirname + `/../cache/${Sport.Baseball_MLB}.json`, JSON.stringify(scores[3]));
        fs.writeFileSync(__dirname + `/../cache/${Sport.Basketball_NBA}.json`, JSON.stringify(scores[4]));
        fs.writeFileSync(__dirname + `/../cache/${Sport.Basketball_NCAAB}.json`, JSON.stringify(scores[5]));
        fs.writeFileSync(__dirname + `/../cache/${Sport.Ice_Hockey_NHL}.json`, JSON.stringify(scores[6]));
        fs.writeFileSync(__dirname + `/../cache/${Sport.Soccer_EPL}.json`, JSON.stringify(scores[7]));
        fs.writeFileSync(__dirname + `/../cache/${Sport.Soccer_Germany_Bundesliga}.json`, JSON.stringify(scores[8]));
        fs.writeFileSync(__dirname + `/../cache/${Sport.Soccer_Spain_La_Liga}.json`, JSON.stringify(scores[9]));
        this._updateLastUpdated();
    }

    getAllScores() : any {
        const allJson = this._getScores("all");
        const ncaafJson = this._getScores(Sport.American_Football_NCAAF);
        const nflJson = this._getScores(Sport.American_Football_NFL);
        const mlbJson = this._getScores(Sport.Baseball_MLB);
        const nbaJson = this._getScores(Sport.Basketball_NBA);
        const ncaabJson = this._getScores(Sport.Basketball_NCAAB);
        const nhlJson = this._getScores(Sport.Ice_Hockey_NHL);
        const eplJson = this._getScores(Sport.Soccer_EPL);
        const bundesligaJson = this._getScores(Sport.Soccer_Germany_Bundesliga);
        const laLigaJson = this._getScores(Sport.Soccer_Spain_La_Liga);
        return [allJson, ncaafJson, nflJson, mlbJson, nbaJson, ncaabJson, nhlJson, eplJson, bundesligaJson, laLigaJson]
    }

    getLastUpdateTime() : any {
        const fs = require('fs');
        const cacheFile = __dirname + `/../cache/_last_updated.json`;
        return JSON.parse(fs.readFileSync(cacheFile)).last_update;
    }



    _initCache(file: string) : any {
        const fs = require('fs');
        const cacheFile = __dirname + `/../cache/${file}.json`;
        try {
            fs.readFileSync(cacheFile);
        } catch (error) {
            if (error.code === 'ENOENT') {
                this.logger.error(`Creating file for ${cacheFile}.`);
                fs.writeFileSync(cacheFile, "[]");
            }
            else {
                this.logger.error(String(error));
                throw new Error(error);
            }
        }
    }

    _initEachCache() : any {
        this._initLastUpdated();
        this._initCache("all");
        this._initCache(Sport.American_Football_NCAAF);
        this._initCache(Sport.American_Football_NFL);
        this._initCache(Sport.Baseball_MLB);
        this._initCache(Sport.Basketball_NBA);
        this._initCache(Sport.Basketball_NCAAB);
        this._initCache(Sport.Ice_Hockey_NHL);
        this._initCache(Sport.Soccer_EPL);
        this._initCache(Sport.Soccer_Germany_Bundesliga);
        this._initCache(Sport.Soccer_Spain_La_Liga);
    }

    _initLastUpdated() : any {
        const fs = require('fs');
        const cacheFile = __dirname + `/../cache/_last_updated.json`;
        try {
            fs.readFileSync(cacheFile);
        } catch (error) {
            if (error.code === 'ENOENT') {
                this.logger.error(`Creating file for ${cacheFile}.`);
                fs.writeFileSync(cacheFile, `{"last_update": ${Date.now()}}`);
            }
            else {
                this.logger.error(String(error));
                throw new Error(error);
            }
        }
    }

    _getScores(sport: string) : any {
        const fs = require('fs');
        const cacheFile = __dirname + `/../cache/${sport}.json`;
        return JSON.parse(fs.readFileSync(cacheFile));
    }

    _updateLastUpdated() {
        const fs = require('fs');
        const cacheFile: string = __dirname + `/../cache/_last_updated.json`;
        fs.writeFileSync(cacheFile,  `{"last_update": ${Date.now()}}`);
        this.lastUpdated = this.getLastUpdateTime();
    }
}
