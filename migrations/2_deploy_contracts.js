// var ConvertLib = artifacts.require("./ConvertLib.sol");
var claimContract = artifacts.require("./ClaimContract.sol");

module.exports = function(deployer) {
  deployer.deploy(claimContract);
};
