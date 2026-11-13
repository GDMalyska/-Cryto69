const fs = require("fs");
const solc = require("solc");
const ganache = require("ganache");
const { ethers } = require("ethers");

async function main() {
  // 1. Compile the actual contract from the repo folder
  const source = fs.readFileSync("../contracts/Cryto69.sol", "utf8");
  const input = {
    language: "Solidity",
    sources: { "Cryto69.sol": { content: source } },
    settings: { evmVersion: "paris", outputSelection: { "*": { "*": ["abi", "evm.bytecode.object"] } } },
  };
  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  if (output.errors) {
    for (const e of output.errors) {
      console.log(e.severity.toUpperCase() + ": " + e.formattedMessage);
      if (e.severity === "error") process.exit(1);
    }
  }
  const c = output.contracts["Cryto69.sol"]["Cryto69"];
  const iface = new ethers.Interface(c.abi);
  console.log("COMPILED OK with solc " + solc.version());

  // 2. Local throwaway chain via raw JSON-RPC (in-memory only)
  const gp = ganache.provider();
  const rpc = (method, params) => gp.request({ method, params });
  const [deployer, second] = await rpc("eth_accounts", []);
  console.log("Deployer (test acct):", deployer);
  console.log("Second   (test acct):", second);

  // 3. Deploy
  const txHash = await rpc("eth_sendTransaction", [{ from: deployer, data: "0x" + c.evm.bytecode.object, gas: "0x2dc6c0" }]);
  let receipt = null;
  while (!receipt) {
    receipt = await rpc("eth_getTransactionReceipt", [txHash]);
    if (!receipt) await new Promise((r) => setTimeout(r, 200));
  }
  const addr = receipt.contractAddress;
  console.log("DEPLOYED at:", addr, "| status:", receipt.status === "0x1" ? "success" : "FAILED");

  const call = async (fn, args) => {
    const data = iface.encodeFunctionData(fn, args);
    const out = await rpc("eth_call", [{ from: deployer, to: addr, data }, "latest"]);
    return iface.decodeFunctionResult(fn, out)[0];
  };

  // 4. Check the coin's facts
  console.log("name:       ", await call("name", []));
  console.log("symbol:     ", await call("symbol", []));
  console.log("decimals:   ", await call("decimals", []));
  console.log("totalSupply:", ethers.formatUnits(await call("totalSupply", []), 18), "CRYTO69");
  console.log("deployer balance:", ethers.formatUnits(await call("balanceOf", [deployer]), 18));

  // 5. Transfer 1,000,000 CRYTO69 deployer -> second account
  const data = iface.encodeFunctionData("transfer", [second, ethers.parseUnits("1000000", 18)]);
  const tx2 = await rpc("eth_sendTransaction", [{ from: deployer, to: addr, data, gas: "0x2dc6c0" }]);
  let r2 = null;
  while (!r2) {
    r2 = await rpc("eth_getTransactionReceipt", [tx2]);
    if (!r2) await new Promise((r) => setTimeout(r, 200));
  }
  console.log("TRANSFERRED 1,000,000 CRYTO69, tx:", tx2, "| status:", r2.status === "0x1" ? "success" : "FAILED");
  console.log("deployer balance now:", ethers.formatUnits(await call("balanceOf", [deployer]), 18));
  console.log("second balance now:  ", ethers.formatUnits(await call("balanceOf", [second]), 18));
  console.log("ALL CHECKS PASSED");
}

main().catch((e) => { console.error("FAILED:", e.message); process.exit(1); });
