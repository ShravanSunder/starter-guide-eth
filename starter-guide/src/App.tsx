import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';

import './__global';

import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import Token from './artifacts/contracts/token.sol/Token.json';

const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const tokenAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

const App = () => {
   const [greeting, setGreeting] = useState<string>('');
   const [userAccount, setUserAccount] = useState<string>('');
   const [amount, setAmount] = useState<string>('');

   // request access to the user's MetaMask account
   async function requestAccount() {
      if (window.ethereum.request)
         await window.ethereum.request({ method: 'eth_requestAccounts' });
   }

   const fetchGreeting = async () => {
      if (typeof window.ethereum !== 'undefined') {
         const provider = new ethers.providers.Web3Provider(window.ethereum);
         const contract = new ethers.Contract(
            greeterAddress,
            Greeter.abi,
            provider
         );
         try {
            const data = await contract.greet();
            console.log('data: ', data);
         } catch (err) {
            console.log('Error: ', err);
         }
      }
   };

   const updateGreeting = async () => {
      if (!greeting) return;
      if (typeof window.ethereum !== 'undefined') {
         await requestAccount();
         const provider = new ethers.providers.Web3Provider(window.ethereum);
         const signer = provider.getSigner();
         const contract = new ethers.Contract(
            greeterAddress,
            Greeter.abi,
            signer
         );
         const transaction = await contract.setGreeting(greeting);
         await transaction.wait();
         fetchGreeting();
      }
   };

   async function getBalance() {
      if (typeof window.ethereum.request !== 'undefined') {
         const [account] = await window.ethereum.request({
            method: 'eth_requestAccounts',
         });
         const provider = new ethers.providers.Web3Provider(window.ethereum);
         const contract = new ethers.Contract(
            tokenAddress,
            Token.abi,
            provider
         );
         const balance = await contract.balanceOf(account);
         console.log(account, 'Balance: ', balance.toString());
      }
   }

   async function sendCoins() {
      if (typeof window.ethereum !== 'undefined') {
         await requestAccount();
         const provider = new ethers.providers.Web3Provider(window.ethereum);
         const signer = provider.getSigner();
         const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
         const transation = await contract.transfer(userAccount, amount);
         await transation.wait();
         console.log(`${amount} Coins successfully sent to ${userAccount}`);
      }
   }

   return (
      <div className="App">
         <header className="App-header">
            <button onClick={fetchGreeting}>Fetch Greeting</button>
            <button onClick={() => updateGreeting()}>Set Greeting</button>
            <input
               onChange={(e) => setGreeting(e.target.value as string)}
               placeholder="Set greeting"
            />

            <br />
            <button onClick={getBalance}>Get Balance</button>
            <button onClick={sendCoins}>Send Coins</button>
            <input
               onChange={(e) => setUserAccount(e.target.value)}
               placeholder="Account ID"
            />
            <input
               onChange={(e) => setAmount(e.target.value)}
               placeholder="Amount"
            />
         </header>
      </div>
   );
};

export default App;
