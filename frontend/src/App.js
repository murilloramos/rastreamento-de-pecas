import React, { useState } from "react";
import { BrowserProvider, Contract } from "ethers";

const contractAddress = "0x3C6c4AE9F8f27C0f54061cCA0a71Ffe44843e2A5"; // Substitua pelo endereço real do contrato
const contractABI = require("./contractABI.json").abi; // ABI atualizado do contrato

function App() {
  const [partId, setPartId] = useState("");
  const [status, setStatus] = useState("");
  const [partsList, setPartsList] = useState([]);
  const [loading, setLoading] = useState(false);

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

  async function registerNewPart() {
    if (!window.ethereum) {
      alert("Metamask não encontrada!");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      const tx = await contract.registerPart("Freio ABS", "Fabricante Y");
      await tx.wait();

      alert("Peça registrada com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar peça: ", error)
    }
  }

  async function fetchAllParts() {
    if (!window.ethereum) {
      alert("Metamask não encontrada!");
      return;
    }

    setLoading(true);
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, contractABI, signer);

      const totalParts = await contract.nextId(); // Obtendo o próximo ID (total de peças registradas)
      let parts = [];
      for (let i = 0; i < totalParts; i++) {
        const part = await contract.getPart(i); // Pegando cada peça registrada
        parts.push(part);
      }

      setPartsList(parts); // Atualizando o estado com a lista de peças
    } catch (error) {
      console.error("Erro ao buscar a peça: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Rastreamento de Peças</h1>

      {/* Buscar Status de uma Peça */}
      <input
        type="number"
        placeholder="Digite o ID da Peça"
        value={partId}
        onChange={(e) => setPartId(e.target.value)}
      />
      <button onClick={getPartStatus}>Buscar Status</button>
      <button onClick={registerNewPart}>Registrar Peça</button>

      {status && <p>Status da Peça: {status}</p>}

      {/* Buscar todas as Peças */}
      <button onClick={fetchAllParts}>Buscar Todas as Peças</button>

      {/* Exibir lista de peças */}
      {loading ? (
        <p>Carregando peças...</p>
      ) : (
        <div>
          <h2>Lista de Peças Registradas:</h2>
          <ul>
            {partsList.map((part, index) => (
              <li key={index}>
                <p>ID: {part.id.toString()}</p>
                <p>Nome: {part.name}</p>
                <p>Fabricante: {part.manufacturer}</p>
                <p>Status: {part.status}</p>
                <p>Proprietário: {part.owner}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
