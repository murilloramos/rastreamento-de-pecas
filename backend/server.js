require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const provider = new ethers.JsonRpcProvider(process.env.INFURA_API_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI = require("./contractABI.json").abi;

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

app.get("/", (req, res) => {
    res.send("API funcionando! 🚀");
});

app.get("/contract", async (req, res) => {
    try {
        res.json({ contractAddress });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
