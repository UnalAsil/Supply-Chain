echo ''
echo ''
echo '******************** NEW PRODUCT CREATION TEST STARTED! ***********************'
echo ''


## Creating new asset..
echo 'Creating new product: id_test_1 !!'
node invoke.js org1 caner_1a CreateProduct id_test_1 type_test_1 100 100 3 4
echo ''

echo ''
node query.js org1 caner_1a CreateProduct id_test_1 type_test_1 100 100 3 4
echo ''

echo 'Creating new product: id_test_2 !!'
node invoke.js org1 caner_1b CreateProduct id_test_2 type_test_2 200 200 5 6
echo ''

echo ''
node query.js org1 caner_1b CreateProduct id_test_2 type_test_2 200 200 5 6
echo ''

echo 'Creating new product: id_test_3 !!'
node invoke.js org1 caner_1c CreateProduct id_test_3 type_test_3 300 300 8 9
echo ''

echo ''
node query.js org1 caner_1c CreateProduct id_test_3 type_test_3 300 300 8 9
echo ''


echo ''
echo ''
echo '******************** NEW PRODUCT CREATION TEST COMPLETED! ***********************'
echo ''
echo ''
echo ''
