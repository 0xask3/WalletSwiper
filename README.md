# WalletSwiper

Walletswiper detects an incoming token transaction and immedaitely forwards it to another wallet

# Usage

## PreRequesties : Have nodejs installed

Step 1 : Open up terminal and do ``` git clone https://github.com/grimreaper619/WalletSwiper.git ```

Step 2 : Remove .example from .env.example and privkeys.json.example

  Step 2.1 : Insert API keys and private keys as shown in example
  
  Step 2.2 : Save the files as .env and privkeys.json
  
Step 3 : Run ``` yarn install ```

Step 4 : Open walletSwiper.js and change 
  
  Step 4.1 : Change receiverWallet to the wallet you want to forward funds to 
  
  Step 4.2 (optional) : Change rpc to the network you desire
  
Step 5 : Run ``` yarn start ``` to start the script

*Note : Make sure wallets where we do swiping have sufficient amount of BNB/ETH for gas fee
