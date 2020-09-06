echo ''
echo ''
echo '********************  TRANSPORT PRODUCT TEST STARTED! ***********************'
echo ''


## Creating new asset..
echo 'Transporting product ..'
node invoke.js org1 caner_3a TransportProduct id_test_1 2 2
echo ''

echo ''
node query.js org1 caner_3a TransportProduct id_test_1 2 2 
echo ''

echo 'Transporting product ..'
node invoke.js org1 caner_3b TransportProduct id_test_2 5 5 
echo ''

echo ''
node query.js org1 caner_3b TransportProduct id_test_2 5 5 
echo ''

echo 'Transporting product ..'
node invoke.js org1 caner_3c TransportProduct id_test_3 10 10 
echo ''

echo ''
node query.js org1 caner_3c TransportProduct id_test_3 10 10
echo ''


echo ''
echo ''
echo '******************** TRANSPORT PRODUCT TEST COMPLETED! ***********************'
echo ''
echo ''
echo ''