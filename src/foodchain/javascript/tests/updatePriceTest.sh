echo ''
echo ''
echo '******************** UPDATE PRICE TEST STARTED! ***********************'
echo ''


## Update Price Test ..
echo 'Updating price for product: id_test_1 !!'
node invoke.js org1 caner_1a UpdateProductPrice id_test_1 50
echo ''

node query.js org1 caner_1a UpdateProductPrice id_test_1 50
echo ''

echo 'Updating price for product: id_test_2 !!'
node invoke.js org1 caner_1b UpdateProductPrice id_test_2 40
echo ''

node query.js org1 caner_1b UpdateProductPrice id_test_2 40
echo ''

echo 'Updating price for product: id_test_3 !!'
node invoke.js org1 caner_1c UpdateProductPrice id_test_2 80
echo ''

node query.js org1 caner_1c UpdateProductPrice id_test_2 80
echo ''


echo ''
echo ''
echo '******************** UPDATE PRICE TEST COMPLETED! ***********************'
echo ''
echo ''
echo ''
