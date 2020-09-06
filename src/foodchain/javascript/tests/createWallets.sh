echo ''
echo ''
echo '******************** CREATE WALLETS TEST STARTED! ***********************'
echo ''


echo ''
echo '***************************************************************'
echo 'Create Producer Wallet: caner_1a !!'
node invoke.js org1 caner_1a CreateUserWallet 1000 producer
echo ''

node query.js org1 caner_1a CreateUserWallet 1000 producer

echo ''
echo 'Create Producer Wallet: caner_1b !!'
node invoke.js org1 caner_1b CreateUserWallet 2000 producer
echo ''

node query.js org1 caner_1b CreateUserWallet 2000 producer

echo ''
echo 'Create Producer Wallet: caner_1c !!'
node invoke.js org1 caner_1c CreateUserWallet 2500 producer
echo ''

node query.js org1 caner_1c CreateUserWallet 2500 producer

echo ''
echo '***************************************************************'
echo 'Create Inspector Wallet: caner_2a !!'
node invoke.js org2 caner_2a CreateUserWallet 1000 inspector
echo ''

node query.js org2 caner_2a CreateUserWallet 1000 inspector

echo ''
echo 'Create Inspector Wallet: caner_2b !!'
node invoke.js org2 caner_2b CreateUserWallet 2000 inspector
echo ''

node query.js org2 caner_2b CreateUserWallet 2000 inspector

echo ''
echo 'Create Inspector Wallet: caner_2c !!'
node invoke.js org2 caner_2c CreateUserWallet 2500 inspector
echo ''

node query.js org2 caner_2c CreateUserWallet 2500 inspector


echo ''
echo '***************************************************************'
echo 'Create Logistic Wallet: caner_3a !!'
node invoke.js org1 caner_3a CreateUserWallet 1000 logistic
echo ''

node query.js org1 caner_3a CreateUserWallet 1000 logistic

echo ''
echo 'Create Logistic Wallet: caner_3b !!'
node invoke.js org1 caner_3b CreateUserWallet 2000 logistic
echo ''

node query.js org1 caner_3b CreateUserWallet 2000 logistic

echo ''
echo 'Create Logistic Wallet: caner_3c !!'
node invoke.js org1 caner_3c CreateUserWallet 2500 logistic
echo ''

node query.js org1 caner_3c CreateUserWallet 2500 logistic


echo ''
echo '***************************************************************'
echo 'Create Market Wallet: caner_4a !!'
node invoke.js org1 caner_4a CreateUserWallet 1000 market
echo ''

node query.js org1 caner_4a CreateUserWallet 1000 market

echo ''
echo 'Create Market Wallet: caner_4b !!'
node invoke.js org1 caner_4b CreateUserWallet 2000 market
echo ''

node query.js org1 caner_4b CreateUserWallet 2000 market

echo ''
echo 'Create Market Wallet: caner_4c !!'
node invoke.js org1 caner_4c CreateUserWallet 2500 market
echo ''

node query.js org1 caner_4c CreateUserWallet 2500 market


echo ''
echo '***************************************************************'
echo 'Create Customer Wallet: caner_5a !!'
node invoke.js org1 caner_5a CreateUserWallet 1000 customer
echo ''

node query.js org1 caner_5a CreateUserWallet 1000 customer

echo ''
echo 'Create Customer Wallet: caner_5b !!'
node invoke.js org1 caner_5b CreateUserWallet 2000 customer
echo ''

node query.js org1 caner_5b CreateUserWallet 2000 customer

echo ''
echo 'Create Customer Wallet: caner_5c !!'
node invoke.js org1 caner_5c CreateUserWallet 2500 customer
echo ''

node query.js org1 caner_5c CreateUserWallet 2500 customer

echo ''
echo ''
echo '******************** CREATE WALLETS TEST COMPLETED! ***********************'
echo ''