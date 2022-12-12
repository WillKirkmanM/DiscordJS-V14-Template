if [[ $1 == "-d" ]];
then
    echo "The Database flag has been specified. Would you like to install Pocketbase? (https://pocketbase.io/) (Y/n)"
    read response
    if [ $response = 'Y' ] || [ $response = 'y' ];
        if [ -e "Database/pocketbase_linux" ] || [ -e "Database/pocketbase_win32.exe" ] || [ -e "Database/pocketbase_macos" ];
            then
                echo "The Database is already installed! Exiting..."
                exit 1
            else
                case $OSTYPE in
                    linux-gnu)
                        echo "Linux"
                    ;;
                    win32)
                        echo "Windows 32"
                    ;;
                esac
                echo "Your OS has not been found... Please contact the developer." 
                exit 0
        fi
    else 
        echo "Rejected database download script, exiting..." 
        exit 1
    fi
then
    if [ -d "./node_modules" ];
        then
            node index.js
        else
	        echo "Dependencies Not Found, Installing..."
	        npm install
	        node index.js
	fi
fi
