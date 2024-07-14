// web3Utils.js
import Web3 from 'web3';
import abi from '../abis/contractAbi.json';

export async function GetWinners(matchId, team) {
  const contractAddress = '0x7B71D14085ef8f57e3C2AA4CabEA8d2087d05B85';

  const web3 = new Web3(window.ethereum);

  // Get the connected user's Ethereum address
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

  const userAddress = accounts[0];

  const contract = new web3.eth.Contract(abi, contractAddress);

  const result = await contract.methods.CountWinners(matchId, team);

  console.log('Transaction successful:', result);
}
