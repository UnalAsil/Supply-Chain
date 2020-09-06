/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // parse arguments

        var args = process.argv.slice(2);
        if (args.length == 0) {
            var org_name = "org1";
            var Org_name = "Org1";
            var admin_name = "admin";
            var passw = "adminpw";
            console.log("Default enrolled: org1 admin adminpw");
        }
        else if (args.length == 1 && (args[0] == '-h' || args[0] == '--help')){
            console.log("Usage: \n'node enrollAdmin.js <orgX> <admin name> <password>'");
            return;
        }
        else if (args.length == 3) {
            var org_name = args[0];
            // First letter uppercase (Org1, Org2)
            var Org_name = org_name.charAt(0).toUpperCase() + org_name.slice(1);
            var admin_name = args[1];
            var passw = args[2];
        }
        else {
            console.log("Error on arguments. Usage: \n'node enrollAdmin.js <orgX> <admin name> <password>'");
            return;
        }  

        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'food-network', 'organizations', 'peerOrganizations', org_name+'.food-network.com', 'connection-'+org_name+'.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities['ca.'+org_name+'.food-network.com'];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const ca = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), org_name+'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get(admin_name);
        if (identity) {
            console.log('An identity for the admin user "'+admin_name+'" already exists in the wallet');
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: admin_name, enrollmentSecret: passw });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: Org_name+'MSP',
            type: 'X.509',
        };
        await wallet.put(admin_name, x509Identity);
        console.log('Successfully enrolled admin user "'+admin_name+'" and imported it into the wallet');

    } catch (error) {
        console.error('Failed to enroll admin user "'+admin_name+'": ${error}');
        process.exit(1);
    }
}

main();
