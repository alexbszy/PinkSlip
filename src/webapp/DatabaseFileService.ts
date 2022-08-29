import winston from "winston";

export class DatabaseFileService {
    logger: winston.Logger;

    constructor(_logger: winston.Logger) {
        this.logger = _logger;
        this.logger.info("Initializing Database");
        this._initOpenBetsDatabase();
        this._initFillsDatabase();
        this.clearExpired();
    }

    getBetsByWallet(walletAddress: string) : any {
        const fs = require('fs');
        const dbFile = __dirname + `/../db/orders.json`;
        const currentOpenOrders = JSON.parse(fs.readFileSync(dbFile));

        if(!currentOpenOrders.hasOwnProperty(walletAddress)){
            return {}
        }
        return currentOpenOrders[walletAddress];
    }


    addWallet(walletAddress: string) : any {
        try {
            const fs = require('fs');
            const dbFile = __dirname + `/../db/orders.json`;
            const currentOrders = JSON.parse(fs.readFileSync(dbFile));
            this.logger.info(JSON.stringify(currentOrders));

            if(!currentOrders.hasOwnProperty(walletAddress)){
                currentOrders[walletAddress] = []
            }
            fs.writeFileSync(dbFile, JSON.stringify(currentOrders, null, 4));
            return true;
        } catch (error) {
            this.logger.error(String(error));
        }
        return false;
    }

    getAllBets() : any {
        const fs = require('fs');
        const dbFile = __dirname + `/../db/orders.json`;
        const currentOrders = JSON.parse(fs.readFileSync(dbFile));
        let allOpenOrders = [];
        const keys = Object.keys(currentOrders);
        keys.forEach((key) => {
            allOpenOrders = allOpenOrders.concat((currentOrders[key]));
        })
        return allOpenOrders;
    }

    getAllFills() : any {
        const fs = require('fs');
        const dbFile = __dirname + `/../db/fills.json`;
        const currentFills = JSON.parse(fs.readFileSync(dbFile));
        return currentFills;
    }

    clearExpired() : any {
        const fs = require('fs');
        const dbFile = __dirname + `/../db/orders.json`;
        const currentOrders = JSON.parse(fs.readFileSync(dbFile));
        const keys = Object.keys(currentOrders);
        const currentEpochTime = Date.now();
        keys.forEach((key) => {
            currentOrders[key] = currentOrders[key].filter(x => x.expiry > currentEpochTime || x.status !== "open");
        })
        fs.writeFileSync(dbFile, JSON.stringify(currentOrders, null, 4));
    }


    addOrder(addOrder: any) : boolean {
        try {
            const fs = require('fs');
            const dbFile = __dirname + `/../db/orders.json`;
            const currentOrders = JSON.parse(fs.readFileSync(dbFile));
            this.logger.info(JSON.stringify(currentOrders));

            if(!currentOrders.hasOwnProperty(addOrder.walletAddress)){
                currentOrders[addOrder.walletAddress] = []
            }
            currentOrders[addOrder.walletAddress].push(addOrder);
            fs.writeFileSync(dbFile, JSON.stringify(currentOrders, null, 4));

            return true;
        } catch (error) {
            this.logger.error(String(error));
        }
        return false;
    }

    addFill(addFill: any) : boolean {
        try {
            const fs = require('fs');
            const dbFile = __dirname + `/../db/fills.json`;
            const currentFills = JSON.parse(fs.readFileSync(dbFile));
            this.logger.info(JSON.stringify(currentFills));
            currentFills.push(addFill);
            fs.writeFileSync(dbFile, JSON.stringify(currentFills, null, 4));
            return true;
        } catch (error) {
            this.logger.error(String(error));
        }
        return false;
    }

    removeOrder(removeOrder: any) : boolean {
        try {
            const fs = require('fs');
            const dbFile = __dirname + `/../db/orders.json`;
            const currentOrders = JSON.parse(fs.readFileSync(dbFile));
            this.logger.info(JSON.stringify(currentOrders));
            if(currentOrders.hasOwnProperty(removeOrder.walletAddress)){
                currentOrders[removeOrder.walletAddress]
                = currentOrders[removeOrder.walletAddress].filter(x => x.orderId !== ('' + removeOrder.orderId));
                if (!currentOrders[removeOrder.walletAddress].length) {
                    delete currentOrders[removeOrder.walletAddress];
                }
            }
            fs.writeFileSync(dbFile, JSON.stringify(currentOrders, null, 4));
            return true;
        } catch (error) {
            this.logger.error(String(error));
        }
        return false;
}

updateOrder(updateOrder: any) : boolean {
    try {
        const fs = require('fs');
        const dbFile = __dirname + `/../db/orders.json`;
        const currentOrders = JSON.parse(fs.readFileSync(dbFile));
        this.logger.info(JSON.stringify(currentOrders));
        if(currentOrders.hasOwnProperty(updateOrder.walletAddress)){
            currentOrders[updateOrder.walletAddress].forEach((order, index) => {
                if (order.orderId === updateOrder.orderId) {
                    currentOrders[updateOrder.walletAddress][index].status = updateOrder.status;
                }
            });
        }
        fs.writeFileSync(dbFile, JSON.stringify(currentOrders, null, 4));
        return true;
    } catch (error) {
        this.logger.error(String(error));
    }
    return false;
}

    _initOpenBetsDatabase() : any {
        const fs = require('fs');
        const databaseFile = __dirname + `/../db/${"orders.json"}`;
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

    _initFillsDatabase() : any {
        const fs = require('fs');
        const databaseFile = __dirname + `/../db/${"fills.json"}`;
        try {
            fs.readFileSync(databaseFile);
        } catch (error) {
            if (error.code === 'ENOENT') {
                this.logger.error(`Creating file for ${databaseFile}.`);
                fs.writeFileSync(databaseFile, `[]`);
            }
            else {
                this.logger.error(String(error));
                throw new Error(error);
            }
        }
    }
}
