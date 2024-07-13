'use client'
import React, { useState, useEffect } from 'react';
import abi from '../abis/contractAbi.json';
import Web3 from 'web3';

const SetTransaction = ({matchId, team}) => {

  async function sendTx(matchId, team) {
	  
		const contractAddress = '0x2edB266fd1BDd569459115b257aE75C252b7aCE0';

        const web3 = new Web3(window.ethereum);

        // Get the connected user's Ethereum address
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        const userAddress = accounts[0];

		const contract = new web3.eth.Contract(abi, contractAddress);

		const result = await contract.methods.setBet(matchId, team).send({
			from: userAddress,
			value: web3.utils.toWei('0.0001', 'ether')  // Send 0.0001 ether (1e14 wei)
		});

        console.log('Transaction successful:', result);
    
}
  return (
    <div>
          <button onClick={() => sendTx(matchId, team)}>Send Transaction</button>
        </div>
  );
};

export default SetTransaction;