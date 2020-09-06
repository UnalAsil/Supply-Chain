
function help(){
    echo ''
    echo '##############################################################'
    echo '##############################################################'
    echo '########               TEST MODULE              ##############'
    echo '##############################################################'
    echo '##############################################################'
    echo ''
    echo ''
    echo '-- Select Test Number & Press Enter'
    echo '>> [1] Prerequists'
    echo '>> [2] Create Wallets (Producer, Inspector, Logistic, Market, Customer)'
    echo '>> [3] Create Users (Inspector, Logistic)'

    echo ''
    echo '>> [4] Create Products'
    echo ''

    echo '>> [5] Asset Read Test'
    echo '>> [6] Asset Delete Test'
    echo '>> [7] Getting All Assets Test'
    echo '>> [8] Getting Specific Asset History Test'
    echo '>> [9] Filter Assets Test'

    echo ''
    echo '>> [10] Price Update Test'
    echo '>> [11] Transfer Product Ownership Test'
    echo ''


    echo '>> [12] Update Inspector Price Test'
    echo '>> [13] Hire Inspector & Inspect Product Test'

    echo ''
    echo '>> [14] Logistic Price Update Test'
    echo '>> [15] Logistic Truck Capacity Update Test'
    echo '>> [16] Hire Logistic Test'
    echo '>> [17] Transport Product Test'
    echo ''

    echo ''
    echo '>> [-1] Exit'
    echo ''
    echo ''
    echo '##############################################################'
    echo '##############################################################'
}


help
echo '>> :'
read choice
while [ ${choice} != '-1' ]
do
    
    if [ ${choice} == '1' ]
    then
        tests/prerequists.sh
    elif [ ${choice} == '2' ]
    then
        tests/createWallets.sh
    elif [ ${choice} == '3' ]
    then
        tests/createUsers.sh
    elif [ ${choice} == '4' ]
    then
        tests/productCreationTest.sh
    elif [ ${choice} == '5' ]
    then
        tests/readAssetTest.sh
    elif [ ${choice} == '6' ]
    then
        tests/deleteAssetTest.sh
    elif [ ${choice} == '7' ]
    then
        tests/getAllAssetTest.sh
    elif [ ${choice} == '8' ]
    then
        tests/getHistoryTest.sh
    elif [ ${choice} == '9' ]
    then
        tests/filterAssetsTest.sh
    elif [ ${choice} == '10' ]
    then
        tests/updatePriceTest.sh
    elif [ ${choice} == '11' ]
    then
        tests/transferOwnershipTest.sh
    elif [ ${choice} == '12' ]
    then
        tests/updateInspectorPriceTest.sh
    elif [ ${choice} == '13' ]
    then
        tests/inspectProductTest.sh
    elif [ ${choice} == '14' ]
    then
        tests/updateLogisticPriceTest.sh
    elif [ ${choice} == '15' ]
    then
        tests/updateLogisticTruckCapTest.sh
    elif [ ${choice} == '16' ]
    then
        tests/hireLogisticTest.sh
    elif [ ${choice} == '17' ]
    then
        tests/transportProductTest.sh
    fi


    help
    echo '>> :'
    read choice
done
