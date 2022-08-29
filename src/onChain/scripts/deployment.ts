// import { ethers } from "ethers";
// import "dotenv/config";
// import * as pinkJson from "../artifacts/contracts/PinkSlip.sol/PinkSlip.json";

// async function main() {
//   const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);
//   console.log(`Using address ${wallet.address}`);
//   const provider = ethers.providers.getDefaultProvider("goerli");
//   const signer = wallet.connect(provider);
//   const balanceBN = await signer.getBalance();
//   const balance = parseFloat(ethers.utils.formatEther(balanceBN));
//   console.log(`Wallet balance ${balance}`);
//   if (balance < 0.01) {
//     throw new Error("Not enough ether");
//   }
//   console.log("Deploying pink contract");

//   const contractFactory = new ethers.ContractFactory(
//     pinkJson.abi,
//     pinkJson.bytecode,
//     signer
//   );
//   const contract = await contractFactory.deploy();
//   await contract.deployed();
//   console.log("Completed");
//   console.log(`Contract deployed at ${contract.address}`);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
