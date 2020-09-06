## Enrolling Admin for org1
echo 'Addding admin to org1 ...'
node enrollAdmin.js org1 admin adminpw
echo 'DONE !!'
echo ''

## Enrolling Admin for org2
echo 'Addding admin to org2 ...'
node enrollAdmin.js org2 admin adminpw
echo 'DONE !!'
echo ''

## User Registering for every orgs.
# For Producer Test
node registerUser.js org1 caner_1a admin
echo ''

node registerUser.js org1 caner_1b admin
echo ''

node registerUser.js org1 caner_1c admin
echo ''

# For Logistic Test
node registerUser.js org1 caner_3a admin
echo ''

node registerUser.js org1 caner_3b admin
echo ''

node registerUser.js org1 caner_3c admin
echo ''

# For Market Test
node registerUser.js org1 caner_4a admin
echo ''

node registerUser.js org1 caner_4b admin
echo ''

node registerUser.js org1 caner_4c admin
echo ''

# For Customer Test
node registerUser.js org1 caner_5a admin
echo ''

node registerUser.js org1 caner_5b admin
echo ''

node registerUser.js org1 caner_5c admin
echo ''

# For Inspector Test
node registerUser.js org2 caner_2a admin
echo ''

node registerUser.js org2 caner_2b admin
echo ''

node registerUser.js org2 caner_2c admin
echo ''
