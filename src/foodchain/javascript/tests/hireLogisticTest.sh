echo ''
echo ''
echo '********************  HIRE LOGISTIC TEST STARTED! ***********************'
echo ''


## Creating new asset..
echo 'Enter 1. logistic id'
read lId1
echo 'Hiring product ..'
node invoke.js org1 caner_3a HireLogistic id_test_1 $lId1
echo ''

echo ''
node query.js org1 caner_3a HireLogistic id_test_1 $lId1
echo ''

echo 'Enter 2. logistic id'
read lId2
echo 'Hiring product ..'
node invoke.js org1 caner_3b HireLogistic id_test_2 $lId2
echo ''

echo ''
node query.js org1 caner_3b HireLogistic id_test_2 $lId2
echo ''

echo 'Enter 3. logistic id'
read lId3
echo 'Hiring product ..'
node invoke.js org1 caner_3c HireLogistic id_test_3 $lId3
echo ''

echo ''
node query.js org1 caner_3c HireLogistic id_test_3 $lId3
echo ''


echo ''
echo ''
echo '******************** HIRE LOGISTIC TEST COMPLETED! ***********************'
echo ''
echo ''
echo ''