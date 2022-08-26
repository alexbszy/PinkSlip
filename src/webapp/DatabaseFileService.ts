import winston from "winston";

export class DatabaseFileService {
    logger: winston.Logger;

    constructor(_logger: winston.Logger) {
        this.logger = _logger;
        this.logger.info("Initializing Database");
        this._initDatabase();
    }

    getData(walletAddress: string) : any {
        const fs = require('fs');
        const dbFile = __dirname + `/../db/open_orders.json`;
        const currentOpenOrders = JSON.parse(fs.readFileSync(dbFile));

        if(!currentOpenOrders.hasOwnProperty(walletAddress)){
            return {}
        }
        return currentOpenOrders[walletAddress];
    }

    addOrder(addOrder: any) : boolean {
        try {
            const fs = require('fs');
            const dbFile = __dirname + `/../db/open_orders.json`;
            const currentOpenOrders = JSON.parse(fs.readFileSync(dbFile));
            this.logger.info(JSON.stringify(currentOpenOrders));

            if(!currentOpenOrders.hasOwnProperty(addOrder.walletAddress)){
                currentOpenOrders[addOrder.walletAddress] = []
            }
            currentOpenOrders[addOrder.walletAddress].push(addOrder);
            fs.writeFileSync(dbFile, JSON.stringify(currentOpenOrders, null, 4));

            return true;
        } catch (error) {
            this.logger.error(String(error));
        }
        return false;
    }

    removeOrder(removeOrder: any) : boolean {
        try {
            const fs = require('fs');
            const dbFile = __dirname + `/../db/open_orders.json`;
            const currentOpenOrders = JSON.parse(fs.readFileSync(dbFile));
            this.logger.info(JSON.stringify(currentOpenOrders));
            if(currentOpenOrders.hasOwnProperty(removeOrder.walletAddress)){
                currentOpenOrders[removeOrder.walletAddress]
                = currentOpenOrders[removeOrder.walletAddress].filter(x => x.orderId !== ('' + removeOrder.orderId));
                if (!currentOpenOrders[removeOrder.walletAddress].length) {
                    delete currentOpenOrders[removeOrder.walletAddress];
                }
            }
            fs.writeFileSync(dbFile, JSON.stringify(currentOpenOrders, null, 4));
            return true;
        } catch (error) {
            this.logger.error(String(error));
        }
        return false;
}

    _initDatabase() : any {
        const fs = require('fs');
        const databaseFile = __dirname + `/../db/${"open_orders.json"}`;
        try {
            fs.readFileSync(databaseFile);
        } catch (error) {
            if (error.code === 'ENOENT') {
                this.logger.error(`Creating file for ${databaseFile}.`);
                fs.writeFileSync(databaseFile, `{}`);
            }
            else {
                this.logger.error(String(error));
                throw new Error(error);
            }
        }
    }


}
