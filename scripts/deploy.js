const hre = require("hardhat");

async function main() {
    const RastrearPecas = await hre.ethers.getContractFactory("RastrearPecas");
    const rastrearPecas = await RastrearPecas.deploy();

    await rastrearPecas.waitForDeployment();

    console.log("Contrato implantado em: ", await rastrearPecas.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
