// import { Contract, ethers } from "ethers";
// import "dotenv/config";
// import * as pinkJson from "../artifacts/contracts/PinkSlip.sol/PinkSlip.json";
// // eslint-disable-next-line node/no-missing-import
// import { PinkSlip } from "../typechain/PinkSlip";


// async function main() {
//   const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);
//   console.log(`Using address ${wallet.address}`);
//   const provider = ethers.providers.getDefaultProvider("goerli");
//   const signer = wallet.connect(provider);
//   const balanceBN = await signer.getBalance();
//   const balance = Number(ethers.utils.formatEther(balanceBN));
//   console.log(`Wallet balance ${balance}`);
//   if (balance < 0.01) {
//     throw new Error("Not enough ether");
//   }
//   if (process.argv.length < 3) throw new Error("pink address missing");
//   const pinkAddress = process.argv[2];

//   const pinkContract: PinkSlip = new Contract(
//     pinkAddress,
//     pinkJson.abi,
//     signer
//   ) as PinkSlip;

//   const data = process.env.fill;
//   const tx = await pinkContract.addFill(
//       data.fillId,
//       data.makerAddress,
//       data.takerAddress, 
//       data.makerWager,
//       data.takerWager, 
//       data.payout, 
//       data.timestamp, 
//       data.makerTeamToWin, 
//       data.takerTeamToWin,
//       data.matchId,
//       data.winner
//     );
//   await tx.wait();
//   console.log(`Transaction completed. Hash: ${tx.hash}`);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });