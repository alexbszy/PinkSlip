import { assert } from "console";
import winston from "winston";
import { CURRENT_BET_LIST } from "./CurrentList";

export class CacheFileService {
    logger: winston.Logger;
    lastUpdated: number;

    constructor(_logger: winston.Logger) {
        this.logger = _logger;
        this.logger.info("Initializing FileService");
        this._initEachCache();
        this.lastUpdated = this.getLastUpdateTime();
        this.logger.info(`last_updated epoch: ${this.lastUpdated}`);
    }

    cacheAllScores(scores: any) {
        assert(scores.length === 10);
        const fs = require('fs');
        CURRENT_BET_LIST.forEach((sport: string, index: number) => {
            fs.writeFileSync(__dirname + `/../cache/${sport}.json`, JSON.stringify(scores[index], null, 4));
        });
        this._updateLastUpdated();
    }

    getAllScores() : any {
        const allScores = [];
        CURRENT_BET_LIST.forEach((sport: string) => {
            allScores.push( this._getScores(sport));
        });
        return allScores;
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
            }
        }
    }

    _initEachCache() : any {
        this._initLastUpdated();
        CURRENT_BET_LIST.forEach((sport: string) => {
            this._initCache(sport);
        });
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
