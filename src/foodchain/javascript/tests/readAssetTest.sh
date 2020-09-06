echo ''
echo ''
echo '******************** READ ASSET TEST STARTED! ***********************'
echo ''

## Read Asset ..
echo 'Read Asset: id_test_1'
node query.js org1 caner_1a ReadAsset id_test_1
echo ''

echo 'Read Asset: id_test_2'
node query.js org1 caner_1b ReadAsset id_test_2
echo ''

echo 'Read Asset: id_test_3'
node query.js org1 caner_1c ReadAsset id_test_2
echo ''

echo ''
echo ''
echo '******************** READ ASSET TEST COMPLETED! ***********************'
echo ''
echo ''
echo ''
