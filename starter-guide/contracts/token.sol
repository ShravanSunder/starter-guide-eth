pragma solidity ^0.8.3;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// SPDX-License-Identifier: MIT
contract Token is ERC20 {
//   string public name = "Sam Token";
//   string public symbol = "SAT";
//   uint public totalSupply = 1000000;
//   mapping(address => uint) balances;

  constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 100000 * (10 ** 18));
    }

//   function transfer(address to, uint amount) external {
//     require(balances[msg.sender] >= amount, "Not enough tokens");
//     balances[msg.sender] -= amount;
//     balances[to] += amount;
//   }

//   function balanceOf(address account) external view returns (uint) {
//     return balances[account];
//   }
}