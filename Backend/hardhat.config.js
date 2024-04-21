require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ganache");
require("@nomicfoundation/hardhat-ignition-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  },
  solidity: "0.8.24",
};
