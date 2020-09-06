echo ''
echo ''
echo '******************** UPDATE INSPECTOR PRICE TEST STARTED! ***********************'
echo ''


echo 'Updating Price to 50 !!'
node invoke.js org2 caner_2a UpdateInspectorPrice 50
echo ''

node query.js org2 caner_2a UpdateInspectorPrice 50

echo ''
echo ''

echo ''
echo ''
echo '******************** UPDATE INSPECTOR PRICE TEST COMPLETED! ***********************'
echo ''