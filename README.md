# Install the truffle with npm with following command
     npm install truffle -g

# Installation of Required NPM Packages Packages
     npm install
 This will download the required npm packages.

# Now you required some tools to start a blockchain network
     1. Geth Client Node
     2. Mist Browser

# Start the Ropsten testing network by using following command 
    geth --testnet --fast --bootnodes "enode://20c9ad97c081d63397d7b685a412227a40e23c8bdc6688c6f37e97cfbc22d2b4d1db1510d8f61e6a8866ad7f0e17c02b14182d37ea7c3c8b9c2683aeb6b733a1@52.169.14.227:30303,enode://6ce05930c72abc632c58e2e4324f7c7ea478cec0ed4fa2528982cf34483094e9cbc9216e7aa349691242576d552a2a56aaeae426c5303ded677ce455ba1acd9d@13.84.180.240:30303" --rpc --rpccorsdomain "*" 8545 --networkid 3

Have some patience this will download the current Ropsten blockchain to your System which is around 2GB.

# Start a geth console using following command
    geth attach

   This will provide the facility to mine a transaction and unlock the base Account.To unlock a account type follwoing         command
   personal.unlockAccount("Hash key of Account" ," password", duration)

and to start a miner type the follwing command
   miner.start(3);

## Building and the frontend

1. First run `truffle compile --network ropsten`, then run `truffle migrate --network ropsten` to deploy the contracts onto your network of choice (default "development").
1. Then run `npm run dev` to build the app and serve it on http://localhost:8080

## Common Errors 
     1. Do not have Enough fund in account to deploy Contract- 
        You can use the following Link:  "http://faucet.ropsten.be:3001/" or start miner again.

     2. Account is Locked - Run the following command to unlock account
      
             personal.unlockAccount("Hash key of Account" ," password", duration)

## This Kit uses external database also to store the info of claimer. You can find the database here:

