import "../stylesheets/app.css";
import "bootstrap/dist/css/bootstrap.css";
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'
import ClaimContract_artifacts from '../../build/contracts/ClaimContract.json'
import ClaimContract_artifacts from '../../build/contracts/ClaimContract.json'

var angular = require('angular');
var ClaimContract = contract(ClaimContract_artifacts);
var requestify = require('requestify');
var accounts;
var account;
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));
console.log("Ethereum Node is running at: http://127.0.0.1:8545 ");

//-------------Angular Component-------------------------------------------------------------------

var app = angular.module('myModule', [])

  .controller("MyController", function ($scope, $http) {
    $scope.rainHistory = {
      '122001': 15,
      '122005': 10,
      '122089': 5

    }
    $scope.claimedStatus = {
      '122001': false,
      '122005': false,
      '122089': false
    }
    $scope.policyList = { data: [] }
    ClaimContract.setProvider(web3.currentProvider);
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      console.log(accounts)
      account = accounts[0];
      ClaimContract.defaults({
        from: account,
        gas: 4712388,
        gasPrice: 100000000000
      })
    });

    $http({
      method: 'GET',
      url: 'http://172.18.3.253:9000/dashBoard'
    }).then(function successCallback(response) {
      $scope.policyList.data = response.data.data;
      console.log($scope.policyList);
    }, function errorCallback(err) {
      console.log(err);
    });

    $scope.claim = function (list, userName) {
     
        ClaimContract.deployed().then(function (instance) {
        console.log("Mining Started");
        return instance.getClaim(list.creationDate, list.insurerName, list.periodCover, list.zipCode, "Chetan Singh", $scope.rainHistory[list.zipCode], { from: accounts[0] });
      }).then(function (result) {

        console.log('created transaction: ', result);
        ClaimContract.deployed().then(function (instance) {

          instance.ClaimRequested().watch(function (err, event) {
            $scope.claimedStatus[event.args._zipCode] = event.args.isClaimed;
            $scope.$apply();
            requestify.post('http://172.18.3.253:9000/transactionDetail', {
              accountAddress: account,
              blockHash: result.receipt.blockHash,
              transactionHash: event.transactionHash,
              claimerName: "Chetan Singh",
              creationDate: event.args._creationDate,
              insurerName: event.args._insurerName,
              periodCover: event.args._periodCover,
              zipCode: event.args._zipCode,
              isGratnted: true
            }, { mode: 'no-cors' })
              .then(function (response) {
                // console.log("Node Response: ", response);

              });
          })
          instance.unClaimed().watch(function (err, event) {
            requestify.post('http://172.18.3.253:9000/transactionDetail', {
              accountAddress: account,
              blockHash: result.receipt.blockHash,
              transactionHash: event.transactionHash,
              claimerName: "Chetan Singh",
              creationDate: '',
              insurerName: '',
              periodCover: '',
              zipCode: '',
              isGratnted: false
            }, { mode: 'no-cors' })
              .then(function (response) {
                // console.log("Node Response: ", response);

              });
            // document.getElementById("claimedRequested").innerHTML +=JSON.stringify(event);
          })
        })


      }).catch(function (err) {
        console.error(err);
      })
    }
  })
  .directive('ngClick', function () {
    return function (scope, element, attrs) {
      scope.$eval(attrs.ngClick)
    }

  })

//------------------------- Handling Window Onload Event----------------------------------------------------------

window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
});
