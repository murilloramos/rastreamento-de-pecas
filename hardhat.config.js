require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {},
    sepolia: {
      url: process.env.INFURA_API_URL, // URL da API da Infura
      accounts: [process.env.PRIVATE_KEY],
    },
  },
}
