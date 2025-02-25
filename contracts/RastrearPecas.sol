// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract RastrearPecas {
    struct Part {
        uint256 id;
        string name;
        string manufacturer;
        string status; // Ex: "Produzida", "Em Transporte", "Entregue"
        address owner;
        uint256 timestamp;
    }

    mapping(uint256 => Part) public parts;
    uint256 public nextId;

    event PartRegistered(uint256 id, string name, string manufacturer, address owner);
    event PartUpdated(uint256 id, string status, address newOwner);

    function registerPart(string memory _name, string memory _manufacturer) public {
        parts[nextId] = Part(nextId, _name, _manufacturer, "Produzida", msg.sender, block.timestamp);
        emit PartRegistered(nextId, _name, _manufacturer, msg.sender);
        nextId++;
    }

    function updatePartStatus(uint256 _id, string memory _status, address _newOwner) public {
        require(parts[_id].id == _id, "Peca nao encontrada");
        require(msg.sender == parts[_id].owner, "Apenas o dono pode atualizar o status");

        parts[_id].status = _status;
        parts[_id].owner = _newOwner;
        parts[_id].timestamp = block.timestamp;

        emit PartUpdated(_id, _status, _newOwner);
    }

    function getPart(uint256 _id) public view returns (Part memory) {
        require(parts[_id].id == _id, "Peca nao encontrada");
        return parts[_id];
    }
}
