//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transaction {
    uint256 transactionCount;

    event Transfer(address from, address to, uint amount, string msg, uint256 timeStamp, string keyword);

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timeStamp;
        string keyword;
    }

    TransferStruct[] Transactions;

    function addToBC(address payable receiver, uint amount, string memory message, string memory keyword) public {
        transactionCount += 1;
        Transactions.push(TransferStruct(msg.sender,receiver,amount,message,block.timestamp,keyword));
        
        emit Transfer(msg.sender,receiver,amount,message,block.timestamp,keyword);
    }

    function getAllTransaction() public view returns (TransferStruct[] memory) {
        return Transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}