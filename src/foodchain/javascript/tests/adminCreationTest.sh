echo ''
echo ''
echo '******************** ADMIN CREATION TEST STARTED! ***********************'
echo ''

# Clean wallets
echo 'Cleaning wallets ...'
rm -rf org1wallet
rm -rf org2wallet
echo 'DONE !!'
echo ''

## Enrolling Admin for org1
echo 'Addding admin to org1 ...'
node enrollAdmin.js org1 admin adminpw
echo 'DONE !!'
echo ''

echo 'Addding admin to org2 ...'
node enrollAdmin.js org2 admin adminpw
echo 'DONE !!'
echo ''

# echo 'Addding admin to org3 ...'
# node enrollAdmin.js org3 admin adminpw
# echo 'DONE !!'
# echo ''

# echo 'Addding admin to org4 ...'
# node enrollAdmin.js org4 admin adminpw
# echo 'DONE !!'
# echo ''

# echo 'Addding admin to org5 ...'
# node enrollAdmin.js org5 admin adminpw
# echo 'DONE !!'
# echo ''

# echo 'Addding admin to org6 ...'
# node enrollAdmin.js org6 admin adminpw
# echo 'DONE !!'
# echo ''

# echo 'Addding admin to org7 ...'
# node enrollAdmin.js org7 admin adminpw
# echo 'DONE !!'
# echo ''

echo ''
echo ''
echo '******************** ADMIN CREATION TEST COMPLETED! ***********************'
echo ''
echo ''
echo ''