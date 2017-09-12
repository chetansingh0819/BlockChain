pragma solidity ^0.4.15;

contract ClaimContract  {
   event ClaimRequested(string _creationDate, string _insurerName,string _periodCover, string _zipCode, string _claimerName,bool _isClaimed);
   event unClaimed(string _claimerName,bool _isClaimed);
   event transferMoney(address _to ,uint256 _amount);
   event unTransfer(address _to ,uint256 _amount);
   uint256 rainLevel=12;
   struct Information{
       string _creationDate;
       string _insurerName;
       string _periodCover;
       string _zipCode;
       string _claimerName;
       bool _claimStatus;
   }
   uint _counter;
   mapping(uint =>Information) c_information;
   
   function getClaim(string _creationDate,string _insurerName,string _periodCover,string _zipCode, string _claimerName,uint256 _rainAmount) returns (uint256){
           _counter++;
           if(_rainAmount > rainLevel ){
                c_information[_counter]=Information(_creationDate, _insurerName, _periodCover, _zipCode,_claimerName,true);
                ClaimRequested(_creationDate, _insurerName, _periodCover, _zipCode,_claimerName,true);
                return _counter;
           }
           else{
               c_information[_counter]=Information(_creationDate, _insurerName, _periodCover, _zipCode,_claimerName,false);
               unClaimed(_claimerName,false);
               return _counter;
           }
       
   }
    
}