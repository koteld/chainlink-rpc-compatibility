// main.js

import { ethers } from "ethers";
import 'dotenv/config'

// Replace with your node's HTTP URL
const HTTP_NODE_URL = process.env.HTTP_NODE_URL;

// Replace with your node's WebSocket URL
const WS_NODE_URL = process.env.WS_NODE_URL;

// Create HTTP and WebSocket providers
const httpProvider = new ethers.JsonRpcProvider(HTTP_NODE_URL);
const wsProvider = new ethers.WebSocketProvider(WS_NODE_URL);

async function testChainId() {
  const chainId = await httpProvider.send('eth_chainId', []);
  console.log('Chain ID:', parseInt(chainId, 16));
}

try {
  await testChainId();
} catch (e) {
  console.error("Error occurred [testChainId]: " + e);
}

async function testBlockHash() {
  const { hash, number } = await httpProvider.send('eth_getBlockByNumber', [17439603, false]);
  console.log('Block Hash:', hash);
  console.log('Block Number:', parseInt(number, 16));
}

try {
  await testBlockHash();
} catch (e) {
  console.error("Error occurred [testBlockHash]: " + e);
}

async function testGetCode() {
  // Replace with a known contract address on your network
  const contractAddress = '0x4323492e474d47bbdbf3E5Dadf935C29D7f8ADae';
  
  const code = await httpProvider.getCode(contractAddress);
  console.log('Contract Code:', code);
}

try {
  await testGetCode();
} catch (e) {
  console.error("Error occurred [testGetCode]: " + e);
}

async function testSendTransaction() {
  const privateKey = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(privateKey, httpProvider);
  
  const tx = {
    // Replace with a known address
    to: '',
    value: ethers.parseEther('0.000000001'),
    gasLimit: 21000, // Standard gas limit for ETH transfer
  };
  
  // Sign and send the transaction
  const transactionResponse = await wallet.sendTransaction(tx);
  console.log('Transaction Hash:', transactionResponse.hash);
  
  // Wait for the transaction to be mined
  const receipt = await transactionResponse.wait();
  console.log('Transaction Receipt:', receipt);
  
  const txReceived = await httpProvider.getTransaction(transactionResponse.hash);
  console.log('Transaction Details:', txReceived);
  
  const receiptReceived = await httpProvider.getTransactionReceipt(transactionResponse.hash);
  console.log('Transaction Receipt:', receiptReceived);
}

try {
  await testSendTransaction();
} catch (e) {
  console.error("Error occurred [testSendTransaction]: " + e);
}

async function testGetTransactionCount() {
  // Replace with your account address
  const accountAddress = '';
  
  const nonce = await httpProvider.getTransactionCount(accountAddress);
  console.log('Transaction Count (Nonce):', nonce);
}

try {
  await testGetTransactionCount();
} catch (e) {
  console.error("Error occurred [testGetTransactionCount]: " + e);
}
