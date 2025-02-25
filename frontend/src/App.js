import React, { useState } from "react";
import { BrowserProvider, Contract } from "ethers";

const contractAddress = "0x3C6c4AE9F8f27C0f54061cCA0a71Ffe44843e2A5"; // Substitua pelo endereço real do contrato
const contractABI = require("./contractABI.json").abi; // ABI atualizado do contrato

function App() {
  const [partId, setPartId] = useState("");
  const [status, setStatus] = useState("");

  async function getPartStatus() {
    if (!window.ethereum) {
      alert("Metamask não encontrada!");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      // Chamando a função getPart() do smart contract
      const part = await contract.getPart(parseInt(partId));
      setStatus(part.status); // Atualizando o estado com o status da peça

    } catch (error) {
      console.error("Erro ao buscar status da peça:", error);
    }
  }

  return (
    <div>
      <h1>Rastreamento de Peças</h1>
      <input
        type="number"
        placeholder="Digite o ID da Peça"
        value={partId}
        onChange={(e) => setPartId(e.target.value)}
      />
      <button onClick={getPartStatus}>Buscar Status</button>
      {status && <p>Status da Peça: {status}</p>}
    </div>
  );
}

export default App;
