import logo from './logo.svg';
import './App.css';
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';
import { useState } from 'react';
import { ethers } from 'ethers';

declare global {
   interface Window {
      ethereum: any;
   }
}

const greeterAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';

const App = () => {
   const [greeting, setGreeting] = useState<string>('');

   // request access to the user's MetaMask account
   async function requestAccount() {
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

   return (
      <div className="App">
         <header className="App-header">
            <button onClick={fetchGreeting}>Fetch Greeting</button>
            <button onClick={() => updateGreeting()}>Set Greeting</button>
            <input
               onChange={(e) => setGreeting(e.target.value as string)}
               placeholder="Set greeting"
            />
         </header>
      </div>
   );
};

export default App;
