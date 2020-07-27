const bre = require("@nomiclabs/buidler");
const ethers = bre.ethers;
const config = require('../config')

const DECIMALS_SUFFIX = "000000000000000000" // 18 decimals

async function main() {
  //await bre.run('compile');

  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying contracts with the account:",
    await deployer.getAddress()
  );
  
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // We get the contract to deploy
  const DSD = await ethers.getContractFactory("DSD");
  const dsd = await DSD.deploy(
    config.name,
    config.symbol,
    config.supply + DECIMALS_SUFFIX
  );

  await dsd.deployed();

  console.log("DSD Token deployed to:", dsd.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
