import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ConnectWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log('Found an authorized account:', account);
      setWalletAddress(account);
    } else {
      console.log('No authorized account found');
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
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
    }
  };

  const logoutHandler = () => {
    setWalletAddress(null);
    setErrorMessage(null);
  };

  return (
    <div>
      {walletAddress ? (
        <div>
          <p>Connected with address: {walletAddress}</p>
          <button onClick={logoutHandler}>Log Out</button>
        </div>
      ) : (
        <button onClick={connectWalletHandler}>Connect Wallet</button>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default ConnectWallet;
