# Cryto69

A basic ERC-20 token built as a learning project.

- **Name:** Cryto69
- **Symbol:** CRYTO69
- **Supply:** 69,000,000 — fixed. Created once when the contract is
  deployed, all of it to the deploying wallet. No more can ever be made.
- **Contract:** [`contracts/Cryto69.sol`](contracts/Cryto69.sol) — the
  standard ERC-20 interface (transfer, approve, transferFrom), written
  from scratch with no external dependencies. Solidity ^0.8.20.

## Run it locally (proof it works)

The `test/` folder compiles the contract and runs it on a throwaway
chain that exists only in your computer's memory — deploys it, checks
the supply, and makes a real transfer between two test accounts:

```bash
cd test
npm install
npm test
```

Expected result: supply of 69,000,000 CRYTO69 to the deployer, then a
1,000,000 transfer leaving balances of 68,000,000 / 1,000,000, ending
with "ALL CHECKS PASSED". Verified working 2026-11-13.

## Try it

See [DEPLOY-TESTNET.md](DEPLOY-TESTNET.md) for step-by-step instructions
to deploy it on the Sepolia **test** network using Remix and MetaMask.
Testnet tokens and testnet ETH are play money — they have no real-world
value and can't be sold.

## Straight talk

A token contract is just code. Deploying one does not make it worth
anything — a token only has a price if other people choose to buy it.
This project exists to learn how tokens actually work under the hood.
