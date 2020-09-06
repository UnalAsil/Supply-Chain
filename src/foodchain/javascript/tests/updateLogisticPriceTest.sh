echo ''
echo ''
echo '********************  UPDATE LOGISTIC PRICE TEST STARTED! ***********************'
echo ''


## Creating new asset..
echo 'Updating price ..'
node invoke.js org1 caner_3a UpdateLogisticPrice 10 15 
echo ''

echo ''
node query.js org1 caner_3a UpdateLogisticPrice 10 15 
echo ''

echo 'Updating price ..'
node invoke.js org1 caner_3b UpdateLogisticPrice 12 15 
echo ''

echo ''
node query.js org1 caner_3b UpdateLogisticPrice 12 15 
echo ''

echo 'Updating price ..'
node invoke.js org1 caner_3c UpdateLogisticPrice 10 18 
echo ''

echo ''
node query.js org1 caner_3c UpdateLogisticPrice 10 18
echo ''


echo ''
echo ''
echo '******************** UPDATE LOGISTIC PRICE TEST COMPLETED! ***********************'
echo ''
echo ''
echo ''