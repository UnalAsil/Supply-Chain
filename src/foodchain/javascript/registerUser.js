/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // parse arguments
        var args = process.argv.slice(2);
        if (args.length == 0) {
            var org_name = "org1";
            var Org_name = "Org1";
            var user_name = "appUser";
            var admin_name = "admin";
            console.log("Default register: org1 appUser admin");
        }
        else if (args.length == 1 && (args[0] == '-h' || args[0] == '--help')){
            console.log("Usage: \n'node registerUser.js <orgX> <username> <admin name>'");
            return;
        }
        else if (args.length == 3) {
            var org_name = args[0];
            // First letter uppercase (Org1, Org2)
            var Org_name = org_name.charAt(0).toUpperCase() + org_name.slice(1);
            var user_name = args[1];
            var admin_name = args[2];
        }
        else {
            console.log("Error on arguments. Usage: \n'node registerUser.js <orgX> <username> <admin name>'");
            return;
        }


        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'food-network', 'organizations', 'peerOrganizations', org_name+'.food-network.com', 'connection-'+org_name+'.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities['ca.'+org_name+'.food-network.com'].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), org_name+'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get(user_name);
        if (userIdentity) {
            console.log('An identity for the user "'+user_name+'" already exists in the wallet');
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get(admin_name);
        if (!adminIdentity) {
            console.log('An identity for the admin user "'+admin_name+'" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, admin_name);

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: org_name+'.department1',
            enrollmentID: user_name,
            role: 'client'
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: user_name,
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: Org_name+'MSP',
            type: 'X.509',
        };
        await wallet.put(user_name, x509Identity);
        console.log('Successfully registered and enrolled admin user "'+user_name+'" and imported it into the wallet');

    } catch (error) {
        console.error(`Failed to register user "${user_name}": ${error}`);
        process.exit(1);
    }
}

main();
