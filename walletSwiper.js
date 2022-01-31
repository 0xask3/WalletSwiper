require("dotenv").config();
const Web3 = require("web3");
const IERC20 = require("./abi/IERC20.json");
const Provider = require("@truffle/hdwallet-provider");

const RPC = process.env.BSCTESTNET;
const web3 = new Web3(RPC);
const receiverWallet = "0x5C0E8981c2Ab6C57D6aCf037cFeE1E6619cEE5d5"; //Change main wallet here
const json = require("./privkeys.json");

const transferHash = web3.utils.sha3("Transfer(address,address,uint256)");

const test = async () => {
  let subscription = web3.eth
    .subscribe("logs", { topics: [transferHash] }, function(error, result) {})
    .on("data", async function(log) {
      let fromAddress = web3.utils.toChecksumAddress(
        web3.utils.toHex(log.topics[1].slice(26))
      );
      let toAddress = web3.utils.toChecksumAddress(
        web3.utils.toHex(log.topics[2].slice(26))
      );

      if (Object.keys(json).includes(toAddress)) {
        console.log("New transaction detected!! \n");
        let provider = new Provider(json[toAddress], RPC);
        let web3Wallet = new Web3(provider);

        let tokenInstance = new web3Wallet.eth.Contract(
          IERC20.abi,
          log.address
        );
        let bal = await tokenInstance.methods.balanceOf(toAddress).call();

        console.log("Current block  : " + log.blockNumber);
        console.log("Hash           : " + log.transactionHash);
        console.log("Token Contract : " + log.address);
        console.log("From           : " + fromAddress);
        console.log("To             : " + toAddress + "\n");

        console.log("Sending to main wallet: " + receiverWallet + "\n");

        try {
          let receipt = await tokenInstance.methods
            .transfer(receiverWallet, bal)
            .send({ from: toAddress });
          console.log("Transferred to main wallet!!");
          console.log("Hash           : " + receipt.transactionHash);
          console.log("Amount         : " + bal);
          console.log("Current block  : " + receipt.blockNumber);
        } catch {}
      }
    });
};
test();
