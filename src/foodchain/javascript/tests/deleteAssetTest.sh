echo ''
echo ''
echo '******************** DELETE ASSET TEST STARTED! ***********************'
echo ''

# ## Creating new asset..
# echo 'Creating new product: id_test_1 !!'
# node invoke.js org1 caner_1a CreateProduct id_test_1 type_test_1 100 1000 3 4
# echo ''

# echo 'Creating new product: id_test_2 !!'
# node invoke.js org2 caner_2a CreateProduct id_test_2 type_test_2 200 2000 5 6
# echo ''

## Get All Assets Test ..
echo 'Getting All Assets'
node query.js org1 caner_1a GetAllAssets
echo ''
echo ''

## Delete Asset Test ..
echo 'Delete product: id_test_1 !!'
node invoke.js org1 caner_1a DeleteAsset id_test_1
echo ''

echo 'Delete product: id_test_2 !!'
node invoke.js org1 caner_1b DeleteAsset id_test_2
echo ''

echo 'Delete product: id_test_3 !!'
node invoke.js org1 caner_1c DeleteAsset id_test_3
echo ''

## Get All Assets Test ..
echo 'Getting All Assets'
node query.js org1 caner_1a GetAllAssets
echo ''
echo ''

echo ''
echo ''
echo '******************** DELETE ASSET TEST COMPLETED! ***********************'
echo ''
echo ''
echo ''