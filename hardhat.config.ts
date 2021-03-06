import '@nomiclabs/hardhat-waffle';
import { ethers } from 'hardhat';
import { HardhatUserConfig, task } from 'hardhat/config';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (args, hre) => {
   const accounts = await hre.ethers.getSigners();

   for (const account of accounts) {
      console.log(account.address);
   }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const config: HardhatUserConfig = {
   solidity: '0.8.3',
   paths: {
      artifacts: './src/artifacts',
   },
   networks: {
      hardhat: { chainId: 1337 },
      ropsten: {
         url: 'https://ropsten.infura.io/v3/5dfa36d18c644b03899ed28b35749d56',
         accounts: [
            '0x31e842079698b120ae4e30753160324e198ee6d0648f268ac8fb2ec9b6a616c2',
         ],
      },
   },
};

export default config;
