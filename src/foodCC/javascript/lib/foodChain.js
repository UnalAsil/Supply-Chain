/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const crypto = require('crypto');

class foodChain extends Contract {

    async initLedger(ctx) {
        console.log("Success init");
    }

    // Checks state type of an id
    // [Restricted]
    async CheckStateType(ctx, user_id, stateType){
        if(stateType == 'inspector'){
            user_id = user_id + '_inspector';
        }
        else if(stateType == 'logistic'){
            user_id = user_id + '_logistic';
        }

        const assetString = await this.ReadAsset(ctx, user_id);
        const asset = JSON.parse(assetString);

        if(asset.StateType == stateType)
            return [true, asset];
        return [false, `State Type: ${asset.StateType} is not match with ${stateType}.`];
    }

    // Checks role of a wallet
    // [Restricted]
    async CheckRole(ctx, user_id, role){
        const assetString = await this.ReadAsset(ctx, user_id);
        const asset = JSON.parse(assetString);

        if(asset.Role == role)
            return [true, asset];
        return [false, `Role: ${asset.Role} is not match with ${role}.`];
    }


    /* ------------------------------------------------------------- */
    /* ------------------ User related functions ------------------- */


    // Returns wallet CA of message caller
    // [Caller] : anybody
    async GetCallerCA(ctx) {
        return ctx.stub.getCreator().idBytes.toString('utf8');
    }

    // Creates wallet for user. 
    // [Caller] : 'user'
    async CreateUserWallet(ctx, balance, role) {
        var user_ca = await this.GetCallerCA(ctx);
        var user_id = crypto.createHash('sha1').update(user_ca).digest('hex').toString('utf8');

        const new_balance = {
            StateType: 'wallet',
            WalletID: user_id,
            Balance: Number(balance),
            Role: role
        };

        ctx.stub.putState(new_balance.WalletID, Buffer.from(JSON.stringify(new_balance)));

        return JSON.stringify(new_balance);
    }



    /* ------------------------------------------------------------- */
    /* -------------------- Inspector functions -------------------- */


    // Creates inspector wallet for inspector. 
    // [Caller] : 'inspector'
    async CreateInspector(ctx, price) {
        var user_ca = await this.GetCallerCA(ctx);
        var user_id = crypto.createHash('sha1').update(user_ca).digest('hex').toString('utf8');

        const inspector = {
            StateType: 'inspector',
            InspectorID: user_id,
            Price: Number(price),
            ProdList: [],
            Reputation: 0,
            VoteCount: 0, 
        };

        ctx.stub.putState(inspector.InspectorID + '_inspector', Buffer.from(JSON.stringify(inspector)));

        return inspector;
    }

    // Updates inspector's price.
    // [Caller] : 'inspector'
    async UpdateInspectorPrice(ctx, price) {
        var user_ca = await this.GetCallerCA(ctx);
        var user_id = crypto.createHash('sha1').update(user_ca).digest('hex').toString('utf8');

        const exists = await this.AssetExists(ctx, user_id);
        if (!exists) {
            throw new Error(`The asset InspectorID does not exist`);
        } 

        var values = await this.CheckStateType(ctx, user_id, 'inspector');
        if (values[0] == false) {
            throw new Error(values[1]);
        }

        const inspectorWallet = {
            StateType: values[1].StateType,
            InspectorID:values[1].InspectorID,
            Price: Number(price),
            ProdList: values[1].ProdList,
            Reputation: values[1].Reputation,
            VoteCount: values[1].VoteCount, 
        };
        ctx.stub.putState(inspectorWallet.InspectorID + '_inspector', Buffer.from(JSON.stringify(inspectorWallet)));
        return values[1];
    }

    // Inspector gives a score to a product.
    // [Caller] : 'inspector'
    async InspectProduct(ctx, prodID, score){
        var user_ca = await this.GetCallerCA(ctx);
        var user_id = crypto.createHash('sha1').update(user_ca).digest('hex').toString('utf8');

        var values = await this.CheckStateType(ctx, user_id, 'inspector');
        if (values[0] == false) {
            throw new Error(values[1]);
        }
        var inspector = values[1];

        // Remove prodID from inspector's wallet
        var tmpProdList = inspector.ProdList;
        var prodIndex = tmpProdList.indexOf(prodID);

        if(prodIndex < 0) {
            throw new Error(`Inspector is not hired to inspect this product.`);
        }

        tmpProdList.splice(prodIndex, 1);

        const inspectorWallet = {
            StateType: inspector.StateType,
            InspectorID:inspector.InspectorID,
            Price: inspector.Price,
            ProdList: tmpProdList,
            Reputation: inspector.Reputation,
            VoteCount: inspector.VoteCount, 
        };
        ctx.stub.putState(inspectorWallet.InspectorID + '_inspector', Buffer.from(JSON.stringify(inspectorWallet)));

        // Get product asset
        const assetString = await this.ReadAsset(ctx, prodID);
        const asset = JSON.parse(assetString);

        // Transfer inspection price
        const isTokenTransferred =  await this.TransferToken(ctx, asset.OwnerID, inspector.InspectorID, inspector.Price); 

        if (!isTokenTransferred) {
            throw new Error(`Token transaction is not completed.`);
        }

        // Give score to the product
        var dummy = asset.InspectRate;
        dummy[user_id] = score;
        
        const updatedAsset = {
            StateType: 'product',
            ProductID: asset.ProductID,
            ProductType: asset.ProductType,
            Kilo: asset.Kilo,
            OwnerID: asset.OwnerID,
            AppraisedValue: asset.AppraisedValue,
            CreationTime: asset.CreationTime,
            Location: asset.Location,
            InspectRate: dummy,
        };
        ctx.stub.putState(updatedAsset.ProductID, Buffer.from(JSON.stringify(updatedAsset)));

        return;
    } 

    // Hire a inspector to inspect a product.
    // [Caller] : 'producer'
    async HireInspector (ctx, prodID, inspectID){
        var user_ca = await this.GetCallerCA(ctx);
        var user_id = crypto.createHash('sha1').update(user_ca).digest('hex').toString('utf8');

        const exists = await this.AssetExists(ctx, inspectID);
        if (!exists) {
            throw new Error(`The asset InspectorID does not exist`);
        } 
        
        var values = await this.CheckRole(ctx, user_id, 'producer');
        if (values[0] == false) {
            throw new Error(values[1]);
        }        

        const assetString = await this.ReadAsset(ctx, inspectID + '_inspector');
        const asset = JSON.parse(assetString);

        var newProdList = asset.ProdList;
        newProdList.push(prodID);

        const inspectorWallet = {
            StateType: asset.StateType,
            InspectorID:asset.InspectorID,
            Price: asset.Price,
            ProdList: newProdList,
            Reputation: asset.Reputation,
            VoteCount: asset.VoteCount, 
        };
        ctx.stub.putState(inspectorWallet.InspectorID + '_inspector', Buffer.from(JSON.stringify(inspectorWallet)));
        return asset;
    }


    /* ------------------------------------------------------------- */
    /* -------------------- Logistic functions --------------------- */


    // Creates logistic's secondary (logistic) wallet
    // [Caller] : 'logistic'
    async CreateLogistic(ctx, priceRent, priceKM, capacity) {
        var user_ca = await this.GetCallerCA(ctx);
        var user_id = crypto.createHash('sha1').update(user_ca).digest('hex').toString('utf8');

        const logistic = {
            StateType: 'logistic',
            LogisticID: user_id,
            RentingPrice: Number(priceRent),
            KilometerPrice: Number(priceKM),
            TruckCapacity: capacity,
            ProdList: {},
            Reputation: 0,
            VoteCount: 0, 
        };

        ctx.stub.putState(logistic.LogisticID + '_logistic', Buffer.from(JSON.stringify(logistic)));
        return logistic;
    }

    // Updates logistic's price.
    // [Caller] : 'logistic'
    async UpdateLogisticPrice(ctx, priceRent, priceKM) {
        var user_ca = await this.GetCallerCA(ctx);
        var user_id = crypto.createHash('sha1').update(user_ca).digest('hex').toString('utf8');

        const exists = await this.AssetExists(ctx, user_id);
        if (!exists) {
            throw new Error(`The asset LogisticID does not exist`);
        } 
        
        var values = await this.CheckStateType(ctx, user_id, 'logistic');
        if (values[0] == false) {
            throw new Error(values[1]);
        }
        var asset = values[1];

        const updatedLogistic = {
            StateType: asset.StateType,
            LogisticID: asset.LogisticID,
            RentingPrice: Number(priceRent),
            KilometerPrice: Number(priceKM),
            TruckCapacity: asset.TruckCapacity,
            ProdList: asset.ProdList,
            Reputation: asset.Reputation,
            VoteCount: asset.VoteCount, 
        };

        ctx.stub.putState(updatedLogistic.LogisticID + '_logistic', Buffer.from(JSON.stringify(updatedLogistic)));
        return asset;
    }

    // Updates logistic's truck capacity.
    // [Caller] : 'logistic'
    async UpdateLogisticTruckCapacity(ctx, truckCapacity) {
        var user_ca = await this.GetCallerCA(ctx);
        var user_id = crypto.createHash('sha1').update(user_ca).digest('hex').toString('utf8');

        const exists = await this.AssetExists(ctx, user_id);
        if (!exists) {
            throw new Error(`The asset LogisticID does not exist`);
        } 
        
        var values = await this.CheckStateType(ctx, user_id, 'logistic');
        if (values[0] == false) {
            throw new Error(values[1]);
        }
        var asset = values[1];

        const updatedLogistic = {
            StateType: asset.StateType,
            LogisticID: asset.LogisticID,
            RentingPrice: asset.RentingPrice,
            KilometerPrice: asset.KilometerPrice,
            TruckCapacity: truckCapacity,
            ProdList: asset.ProdList,
            Reputation: asset.Reputation,
            VoteCount: asset.VoteCount, 
        };

        ctx.stub.putState(updatedLogistic.LogisticID + '_logistic', Buffer.from(JSON.stringify(updatedLogistic)));
        return asset;
    }

    // Moves a product from a location to a new location
    // [Caller] : 'logistic'
    async TransportProduct(ctx, prodID, newX, newY) {
        var user_ca = await this.GetCallerCA(ctx);
        var user_id = crypto.createHash('sha1').update(user_ca).digest('hex').toString('utf8');

        const exists = await this.AssetExists(ctx, user_id);
        if (!exists) {
            throw new Error(`The asset LogisticID does not exist`);
        } 

        var values = await this.CheckStateType(ctx, user_id, 'logistic');
        if (values[0] == false) {
            throw new Error(values[1]);
        }
        var logistic = values[1];

        // Remove prodID from logistic's wallet
        var tmpProdList = logistic.ProdList;

        if(tmpProdList[prodID] === undefined) {
            throw new Error(`Logistic is not hired to move this product.`);
        }

        const caller_id = tmpProdList[prodID];
        delete tmpProdList[prodID];

        const assetString2 = await this.ReadAsset(ctx, prodID);
        const product = JSON.parse(assetString2);

        // Get distance and transportation price
        var dist = Math.sqrt((product.Location['x'] - newX)**2 + (product.Location['y'] - newY)**2);
        var transportationPrice = (product.Kilo % logistic.TruckCapacity)*logistic.RentingPrice + dist*logistic.KilometerPrice;

        // Transfer logistic price14
        const isTokenTransferred = await this.TransferToken(ctx, caller_id, logistic.LogisticID, transportationPrice); 

        if (!isTokenTransferred) {
            throw new Error(`Token transaction is not completed. Price: ${transportationPrice}`);
        }

        const updatedProduct = {
            StateType: product.StateType,
            ProductID: product.ProductID,
            ProductType: product.ProductType,
            Kilo: product.Kilo,
            OwnerID: product.OwnerID,
            AppraisedValue: product.AppraisedValue,
            CreationTime: product.CreationTime,
            Location: {'x': Number(newX), 'y': Number(newY)},
            InspectRate: product.InspectRate,
        };

        return ctx.stub.putState(updatedProduct.ProductID, Buffer.from(JSON.stringify(updatedProduct)));
    }

    // Hires a logistic to carry a product.
    // [Caller] : 'producer, hall, market' 
    async HireLogistic(ctx, prodID, logisticID) {
        var user_ca = await this.GetCallerCA(ctx);
        var user_id = crypto.createHash('sha1').update(user_ca).digest('hex').toString('utf8');

        const exists1 = await this.AssetExists(ctx, prodID);
        const exists2 = await this.AssetExists(ctx, logisticID);
        if (!exists1) {
            throw new Error(`The asset ${prodID} does not exist`);
        } else if (!exists2) {
            throw new Error(`The asset ${logisticID} does not exist`);
        }
     
        // Get logistic's asset
        const assetString = await this.ReadAsset(ctx, logisticID + '_logistic');
        const asset = JSON.parse(assetString);

        // Get product's asset
        const assetString2 = await this.ReadAsset(ctx, prodID);
        const prodAsset = JSON.parse(assetString2);

        if(asset.TruckCapacity < prodAsset.Kilo) {
            throw new Error(`Logistic's truck capacity is not enough!`);
        }

        // Push productID to logistic's list
        var newProdList = asset.ProdList;
        newProdList[prodID] = user_id;

        const updatedLogistic = {
            StateType: asset.StateType,
            LogisticID: asset.LogisticID,
            RentingPrice: asset.RentingPrice,
            KilometerPrice: asset.KilometerPrice,
            TruckCapacity: asset.TruckCapacity,
            ProdList: newProdList,
            Reputation: asset.Reputation,
            VoteCount: asset.VoteCount, 
        };
        ctx.stub.putState(updatedLogistic.LogisticID + '_logistic', Buffer.from(JSON.stringify(updatedLogistic)));
        return asset;
    }


    /* ------------------------------------------------------------- */
    /* --------------------- Product functions --------------------- */


    // Creates a product.
    // [Caller] : 'producer'
    async CreateProduct(ctx, product_id, type, kilo, appraisedValue,x,y) {
        var user_ca = await this.GetCallerCA(ctx);
        var user_id = crypto.createHash('sha1').update(user_ca).digest('hex').toString('utf8');

        var values = await this.CheckRole(ctx, user_id, 'producer');
        if (values[0] == false) {
            throw new Error(values[1]);
        }
        

        var date = Math.floor(Date.now()/10000);
        const asset = {
            StateType: 'product',
            ProductID: product_id,
            ProductType: type,
            Kilo: kilo,
            OwnerID: user_id,
            AppraisedValue: appraisedValue,
            CreationTime: date,
            Location: {'x': x, 'y': y},
            InspectRate: {},
        };

        ctx.stub.putState(asset.ProductID, Buffer.from(JSON.stringify(asset)));
        return asset;
    }

    // Transfer the product's owner from a user to another.
    // [Restricted]
    async TransferProductOwnership(ctx, prodID, newOwnerID) {
        var user_ca = await this.GetCallerCA(ctx);
        var user_id = crypto.createHash('sha1').update(user_ca).digest('hex').toString('utf8');

        const assetString = await this.ReadAsset(ctx, prodID);
        const asset = JSON.parse(assetString);

        const updatedAsset = {
            StateType: 'product',
            ProductID: asset.ProductID,
            ProductType: asset.ProductType,
            Kilo: asset.Kilo,
            OwnerID: newOwnerID,
            AppraisedValue: asset.AppraisedValue,
            CreationTime: asset.CreationTime,
            Location: asset.Location,
            Inspec: {},
        };
        return ctx.stub.putState(updatedAsset.ProductID, Buffer.from(JSON.stringify(updatedAsset)));
    }

    // Updates a product's price.
    // [Caller] : 'producer'
    async UpdateProductPrice(ctx, prodID, newPrice){
        const exists = await this.AssetExists(ctx, prodID);
        if (!exists) {
            throw new Error(`The asset ${prodID} does not exist`);
        } 

        var user_ca = await this.GetCallerCA(ctx);
        var user_id = crypto.createHash('sha1').update(user_ca).digest('hex').toString('utf8');

        var values = await this.CheckRole(ctx, user_id, 'producer');
        if (values[0] == false) {
            throw new Error(values[1]);
        }

        const assetString = await this.ReadAsset(ctx, prodID);
        const asset = JSON.parse(assetString);
        
        const updatedAsset = {
            StateType: 'product',
            ProductID: asset.ProductID,
            ProductType: asset.ProductType,
            Kilo: asset.Kilo,
            OwnerID: asset.OwnerID,
            AppraisedValue: Number(newPrice),
            CreationTime: asset.CreationTime,
            Location: asset.Location,
            InspectRate: {},
        };
        return ctx.stub.putState(updatedAsset.ProductID, Buffer.from(JSON.stringify(updatedAsset)));
    }

    // Takes token 
    // [Caller] : 'hall, market'
    async BuyProduct(ctx, prodID) {
        var user_ca = await this.GetCallerCA(ctx);
        var user_id = crypto.createHash('sha1').update(user_ca).digest('hex').toString('utf8');

        const exists = await this.AssetExists(ctx, prodID);
        if (!exists) {
            throw new Error(`The asset ${prodID} does not exist`);
        } 

        const assetString1 = await this.ReadAsset(ctx, prodID);
        const product = JSON.parse(assetString1);

        // Transfer inspection price
        const isTokenTransferred = await this.TransferToken(ctx, user_id, product.OwnerID, product.AppraisedValue); 
        if (!isTokenTransferred) {
            throw new Error(`Token transaction is not completed.`);
        }

        await this.TransferProductOwnership(ctx, prodID, user_id);
    }

    // Customers can buy a small amount of product from market
    // [Caller] : 'customer'
    async BuyPartialProduct(ctx, prodID, amount) {
        var user_ca = await this.GetCallerCA(ctx);
        var user_id = crypto.createHash('sha1').update(user_ca).digest('hex').toString('utf8');

        const exists = await this.AssetExists(ctx, prodID);
        if (!exists) {
            throw new Error(`The asset ${prodID} does not exist`);
        } 

        const assetString1 = await this.ReadAsset(ctx, prodID);
        const product = JSON.parse(assetString1);

        // Be sure that seller is 'market'
        var values = await this.CheckRole(ctx, product.OwnerID, 'market');
        if (!values[0]) {
            throw new Error(`Customer can buy partial product only from market.`);
        }
        if (product.Kilo < amount) {
            throw new Error(`Product doesn't have ${amount} amount, it only has ${product.Kilo}.`);
        }

        // Calculate partial price
        const partialPrice = amount * (product.AppraisedValue / product.Kilo);

        // Transfer inspection price
        const isTokenTransferred = await this.TransferToken(ctx, user_id, product.OwnerID, partialPrice); 
        if (!isTokenTransferred) {
            throw new Error(`Token transaction is not completed.`);
        }

        const updatedProduct = {
            StateType: product.StateType,
            ProductID: product.ProductID,
            ProductType: product.ProductType,
            Kilo: Number(product.Kilo) - Number(amount),
            OwnerID: product.OwnerID,
            AppraisedValue: product.AppraisedValue,
            CreationTime: product.CreationTime,
            Location: product.Location,
            InspectRate: product.InspectRate,
        };

        return ctx.stub.putState(updatedProduct.ProductID, Buffer.from(JSON.stringify(updatedProduct)));
    }


    /* ------------------------------------------------------------- */
    /* ---------------------- Token functions ---------------------- */


    // Adds an amount to the user's balance
    // [Restricted]
    async AddBalance(ctx, walletID, amount){
        const exists = await this.AssetExists(ctx, walletID);
        if (!exists) {
            throw new Error(`The asset ${walletID} does not exist`);
        } 

        const assetString = await this.ReadAsset(ctx, walletID);
        const asset = JSON.parse(assetString);

        const updatedWallet =  {StateType: asset.StateType,
                                WalletID: asset.WalletID,
                                Balance: Number(asset.Balance) + Number(amount),
                                Role: asset.Role };

        return ctx.stub.putState(updatedWallet.WalletID, Buffer.from(JSON.stringify(updatedWallet)));
    }

    // Transfer token from a user to another
    // [Restricted]
    async TransferToken(ctx, fromWalletID, toWalletID, amount) {
        const exists_1 = await this.AssetExists(ctx, fromWalletID);
        const exists_2 = await this.AssetExists(ctx, toWalletID);
        if (!exists_1 || !exists_2) {
            throw new Error(`The asset ${fromWalletID} or ${toWalletID} does not exist`);
        } 

        const assetString = await this.ReadAsset(ctx, fromWalletID);
        const sender_wallet = JSON.parse(assetString);

        if(sender_wallet.Balance >= amount) {
            await this.AddBalance(ctx, fromWalletID, -amount);
            await this.AddBalance(ctx, toWalletID, amount);
            return true;
        } else {
            // Sender does not have enough token
            return false;
        }
    }


    /* ------------------------------------------------------------- */
    /* ------------------ General Asset Functions ------------------ */


    // ReadAsset returns the asset stored in the world state with given id.
    // [Restricted]
    async ReadAsset(ctx, id) {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }

    // DeleteAsset deletes an given asset from the world state.
    // [Restricted]
    async DeleteAsset(ctx, id) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }

    // AssetExists returns true when asset with given ID exists in world state.
    // [Restricted]
    async AssetExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    // GetAllAssets returns all assets found in the world state.
    // [Restricted]
    async GetAllAssets(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: result.value.key, Record: record });
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

    // Filters assets by their stateTypes and returns
    // [Restricted]
    async FilterAssets(ctx, stateType) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            if(record.StateType == stateType){
                allResults.push({ Key: result.value.key, Record: record });
            }
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

    // GetAssetHistory returns the chain of custody for an asset since issuance.
    // [Restricted]
    async GetAssetHistory(ctx, assetName) {
        const resultsIterator = await ctx.stub.getHistoryForKey(assetName);
        const results = await this.GetAllResults(resultsIterator, true);

        return JSON.stringify(results);
    }

    // [Restricted]
    async GetAllResults(iterator, isHistory) {
        const allResults = [];
        let res = await iterator.next();
        while (!res.done) {
            const jsonRes = {};
    
            if (isHistory) {
                jsonRes.TxId = res.value.txId;
                jsonRes.Timestamp = res.value.timestamp;
                jsonRes.IsDelete = res.value.isDelete;
            }
    
            if (res.value.value.length > 0) {
                jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
            } else {
                jsonRes.Record = {ID: res.value.key};
            }
    
            jsonRes.Key = res.value.key;
    
            console.log('Result: ' + JSON.stringify(jsonRes));
            allResults.push(jsonRes);
            res = await iterator.next();
        }
    
        await iterator.close();
        return allResults;
    }
}

module.exports = foodChain;