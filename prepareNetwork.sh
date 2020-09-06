export FABRIC_SAMPLES_FILE=$(pwd)/..

function get_fabric_dir() {
echo -e "\e[1;43mfabric-samples default directory:\e[0m" $FABRIC_SAMPLES_FILE
read -p "Type fabric-samples directory (enter for default):" user_input
}

if [[ $1 == "prepare" ]]
then
    get_fabric_dir

    if [[ $user_input != "" ]]
    then
    FABRIC_SAMPLES_FILE=$user_input
    fi

    if [ -d "$FABRIC_SAMPLES_FILE" ]; then
        # Directory exists, move files

        sudo /bin/rm -rf $FABRIC_SAMPLES_FILE/food-network
        /bin/cp -r src/food-network $FABRIC_SAMPLES_FILE/food-network
        echo "File 'food-network' copied to $FABRIC_SAMPLES_FILE"

        sudo /bin/rm -rf $FABRIC_SAMPLES_FILE/foodchain
        /bin/cp -r src/foodchain $FABRIC_SAMPLES_FILE/foodchain
        echo "File 'foodchain'    copied to $FABRIC_SAMPLES_FILE"

        sudo /bin/rm -rf $FABRIC_SAMPLES_FILE/chaincode/foodCC
        /bin/cp -r src/foodCC $FABRIC_SAMPLES_FILE/chaincode/foodCC
        echo "File 'foodCC'       copied to $FABRIC_SAMPLES_FILE/chaincode"

        sudo /bin/rm -rf $FABRIC_SAMPLES_FILE/web-app
        /bin/cp -r ./web-app $FABRIC_SAMPLES_FILE/web-app
        echo "File 'web-app'      copied to $FABRIC_SAMPLES_FILE"

        else
        echo "Path not found: " $FABRIC_SAMPLES_FILE
    fi

elif [[ $1 == 'pull' ]]
then
    get_fabric_dir
    if [ -d "$FABRIC_SAMPLES_FILE" ]; then
        # Directory exists, move files

        /bin/rm -rf src/food-network
        /bin/cp -r $FABRIC_SAMPLES_FILE/food-network src/
        echo "New 'food-network' copied to here."

        /bin/rm -rf src/foodchain
        /bin/cp -r $FABRIC_SAMPLES_FILE/foodchain src/
        echo "New 'foodchain'    copied to here."

        /bin/rm -rf src/foodCC
        /bin/cp -r $FABRIC_SAMPLES_FILE/chaincode/foodCC src/
        echo "New 'foodCC'       copied to here."

        /bin/rm -rf src/web-app
        /bin/cp -r $FABRIC_SAMPLES_FILE/web-app ./
        echo "New 'web-app'      copied to here."

        else
        echo "Path not found: " $FABRIC_SAMPLES_FILE
    fi
else 
    echo "Usage:"
    echo "./prepareNetwork prepare    : copies files from here to fabric-samples"
    echo "./prepareNetwork pull       : copies files from fabric-samples to here"
fi

