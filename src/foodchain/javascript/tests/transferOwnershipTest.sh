echo ''
echo ''
echo '******************** TRANSFER OWNERSHIP TEST STARTED! ***********************'
echo ''

echo 'Query All Assets'
node query.js org1 caner_1a GetAllAssets

echo ''
echo '***********************************************************'
echo ''

echo 'Ownership Transfer Summary: id_test_1: caner_1a --> oth'
echo 'Enter Owner ID'
read ownId
echo 'Ownership Transfer Started : id_test_1: caner_1a --> oth'
node invoke.js org1 caner_1a TransferProductOwnership id_test_1 $ownId
echo 'Done!!'
echo ''

echo ''
echo '***********************************************************'
echo ''

echo 'Query All Assets'
node query.js org1 caner_1a GetAllAssets

echo ''
echo '***********************************************************'
echo ''


echo ''
echo ''
echo '******************** TRANSFER OWNERSHIP TEST COMPLETED! ***********************'
echo ''
echo ''
echo ''