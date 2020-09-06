echo ''
echo ''
echo '********************  UPDATE LOGISTIC TRUCK CAPACITY TEST STARTED! ***********************'
echo ''


## Creating new asset..
echo 'Updating Truck Capacity ..'
node invoke.js org1 caner_3a UpdateLogisticTruckCapacity 225 
echo ''

echo ''
node query.js org1 caner_3a UpdateLogisticTruckCapacity 225 
echo ''

echo 'Updating Truck Capacity ..'
node invoke.js org1 caner_3b UpdateLogisticTruckCapacity 265 
echo ''

echo ''
node query.js org1 caner_3b UpdateLogisticTruckCapacity 265 
echo ''

echo 'Updating Truck Capacity ..'
node invoke.js org1 caner_3c UpdateLogisticTruckCapacity 350 
echo ''

echo ''
node query.js org1 caner_3c UpdateLogisticTruckCapacity 350
echo ''


echo ''
echo ''
echo '******************** UPDATE LOGISTIC TRUCK CAPACITY TEST COMPLETED! ***********************'
echo ''
echo ''
echo ''