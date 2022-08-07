// require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/L_f94t8I6WblGT6kXhwfDk6Y5XtTdKtU",
      accounts: ['e07ca40509d0fd4e558b90ccf26a95b11831e0d1c1334753ee17e959fddd933f']
    }
  }
};
