/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');


async function main(org_name, user_name, func_and_args) {
    try {
        // console.log("dirname: " + __dirname
        // + " org_name:" + org_name
        // + " user_name:" + user_name
        // + " func_and_args:" + func_and_args);
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'food-network', 'organizations', 'peerOrganizations', org_name+'.food-network.com', 'connection-'+org_name+'.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities. //process.cwd()
        const walletPath = path.join(__dirname, org_name+'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(user_name);
        if (!identity) {
            console.log('An identity for the user "'+user_name+'" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: user_name, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('foodCC');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        
        //const result = await contract.evaluateTransaction('GetAllAssets');
        const result = await contract.evaluateTransaction(...func_and_args);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        // Disconnect from the gateway.
        await gateway.disconnect();
        return result.toString();
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

async function parse_and_run() {
    // parse arguments
    var args = process.argv.slice(2);
    if (args.length == 0) {
        var org_name = "org1";
        var user_name = "appUser";
        var func_and_args = ['GetAllAssets'];
        console.log("Default query: org1 appUser GetAllAssets");
    }
    else if (args.length == 1 && (args[0] == '-h' || args[0] == '--help')){
        console.log("Usage: \n'node query.js <orgX> <username> <function_name> <arg 1> <arg 2> ...'");
        return;
    }
    else if (args.length >= 3) {
        var org_name = args[0];
        var user_name = args[1];
        var func_and_args = args.slice(2, args.length);
    }
    else {
        console.log("Error on arguments. Usage: \n'node query.js <orgX> <username> <function_name> <arg 1> <arg 2> ...'");
        return;
    }  

    main(org_name, user_name, func_and_args);
}

if (require.main === module) {
    // Called directly
    parse_and_run();
} 

module.exports.query = main;