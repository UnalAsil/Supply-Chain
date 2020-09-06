echo ''
echo ''
echo '******************** FILTER ASSETS TEST STARTED! ***********************'
echo ''


echo 'Enter filter keyword: eg. wallet, logistic, product, inspector'
read fId
node query.js org1 caner_1a FilterAssets $fId


echo ''
echo ''
echo '******************** FILTER ASSETS TEST COMPLETED! ***********************'
echo ''