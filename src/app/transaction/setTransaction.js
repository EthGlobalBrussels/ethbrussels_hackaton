'use client'
import React, { useState, useEffect } from 'react';
import abi from '../abis/contractAbi.json';
import Web3 from 'web3';

const SetTransaction = (matchId, team) => {

  async function sendTx(matchId, team) {
	  
	  
	  // Example usage:
	  const key = 'exampleKey';
	  const value = 100; // Example value to set
		const contractAddress = '0x502fFa5763d1ba297B9224e444917eA1aa0Df0b1';
        const web3 = new Web3(window.ethereum);

        // Get the connected user's Ethereum address
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const userAddress = accounts[0]; // Assuming MetaMask is connected and unlocked
		const contract = new web3.eth.Contract(abi, contractAddress);
        // Call the setBet function on the smart contract
        const result = await contract.methods.setBet(matchId, team).send({ from: userAddress });
        console.log('Transaction successful:', result);
        // Handle success, e.g., show a success message to the user
    
}
  return (
    <div>
          <button onClick={sendTx}>Send Transaction</button>
        </div>
  );
};

export default SetTransaction;