echo ''
echo ''
echo '******************** INSPECT PRODUCT TEST STARTED! ***********************'
echo ''


echo 'Query All Assets'
node query.js org1 caner_1a GetAllAssets
echo ''
echo ''

echo 'Enter Inspector ID'
read iId
echo 'Enter Product ID'
read pId

echo 'Hiring Inspector: ${iId}' 
node invoke.js org1 caner_1a HireInspector $pId $iId
echo ''
node query.js org1 caner_1a HireInspector $pId $iId
echo ''

echo 'Inspecting Product: Score: 6 !!'
node invoke.js org2 caner_2a InspectProduct $pId 6
echo ''

echo ''
node query.js org2 caner_2a InspectProduct $pId 6

echo ''
echo ''

echo ''
echo ''
echo '******************** INSPECT PRODUCT TEST COMPLETED! ***********************'
echo ''