// web3Utils.js
import Web3 from 'web3';
import abi from '../abis/contractAbi.json';

export async function GetWinners(_matchId, _team) {
  const contractAddress = '0x02a454Cc4068F0cc093c22544989a6a79BC27E54';

  const web3 = new Web3(window.ethereum);

  // Get the connected user's Ethereum address
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

  const userAddress = accounts[0];

  const contract = new web3.eth.Contract(abi, contractAddress);

  const result = await contract.methods.CountWinners(_matchId, _team).send({
	from: userAddress
  })

  console.log('Transaction successful:', result);
}
