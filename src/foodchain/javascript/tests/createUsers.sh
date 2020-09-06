echo ''
echo ''
echo '******************** CREATE USERS TEST STARTED! ***********************'
echo ''



echo ''
echo '***************************************************************'
echo 'Create Inspector: caner_2a !!'
node invoke.js org2 caner_2a CreateInspector 25
echo ''

node query.js org2 caner_2a CreateInspector 25

echo ''
echo 'Create Inspector: caner_2b !!'
node invoke.js org2 caner_2b CreateInspector 25
echo ''

node query.js org2 caner_2b CreateInspector 25

echo ''
echo 'Create Inspector: caner_2c !!'
node invoke.js org2 caner_2c CreateInspector 25
echo ''

node query.js org2 caner_2c CreateInspector 25


echo ''
echo '***************************************************************'
echo 'Create Logistic: caner_3a !!'
node invoke.js org1 caner_3a CreateLogistic 12 16 200
echo ''

node query.js org1 caner_3a CreateLogistic 12 16 200

echo ''
echo 'Create Logistic: caner_3b !!'
node invoke.js org1 caner_3b CreateLogistic 12 16 150
echo ''

node query.js org1 caner_3b CreateLogistic 12 16 150

echo ''
echo 'Create Logistic: caner_3c !!'
node invoke.js org1 caner_3c CreateLogistic 12 16 250
echo ''

node query.js org1 caner_3c CreateLogistic 12 16 250

echo ''
echo ''
echo '******************** CREATE USERS TEST COMPLETED! ***********************'
echo ''