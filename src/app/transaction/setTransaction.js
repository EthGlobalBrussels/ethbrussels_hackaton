'use client'
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const IntegratedComponent = () => {
  // Define the contract ABI and address
  const contractABI = [
    // Your smart contract ABI array here
    {
      "constant": true,
      "inputs": [],
      "name": "someFunction",
      "outputs": [],
      "payable": false,
      "stateMutability": "pure",
      "type": "function"
    }
  ];

  const contractAddress = '0x...'; // Replace with your smart contract address

  const [walletAddress, setWalletAddress] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState(null);

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have MetaMask installed!');
      setErrorMessage('Make sure you have MetaMask installed!');
      return;
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log('Found an authorized account:', account);
        setWalletAddress(account);
        setErrorMessage(null); // Clear any previous error messages
      } else {
        console.log('No authorized account found');
        setWalletAddress(null);
      }
    } catch (err) {
      console.error('Error connecting to MetaMask:', err);
      setErrorMessage(err.message);
    }
  };

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have MetaMask installed!');
      setErrorMessage('Make sure you have MetaMask installed!');
      return;
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Found an account! Address:', accounts[0]);
      setWalletAddress(accounts[0]);
      setErrorMessage(null); // Clear any previous error messages
    } catch (err) {
      console.error('Error connecting to MetaMask:', err);
      setErrorMessage(err.message);
    }
  };

  const logoutHandler = () => {
    setWalletAddress(null);
    setErrorMessage(null);
    setTransactionStatus(null); // Clear transaction status on logout
  };

  const sendTransactionToContract = async () => {
    try {
      if (!walletAddress) {
        throw new Error('Wallet address not available');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Initialize the contract instance with ABI and address
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Example: Call a function on your smart contract
      const txResponse = await contract.someFunction();

      // Wait for the transaction to be mined
      await txResponse.wait();

      console.log('Transaction successful:', txResponse);
      setTransactionStatus('Transaction successful');
    } catch (error) {
      console.error('Error sending transaction:', error);
      setTransactionStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      {walletAddress ? (
        <div>
          <p>Connected with address: {walletAddress}</p>
          <button onClick={sendTransactionToContract}>Send Transaction</button>
          {transactionStatus && <p>{transactionStatus}</p>}
          <button onClick={logoutHandler}>Log Out</button>
        </div>
      ) : (
        <div>
          <button onClick={connectWalletHandler}>Connect Wallet</button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default IntegratedComponent;
