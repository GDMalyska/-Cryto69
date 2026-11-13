# Deploy Cryto69 on a test network (free, play money)

This walks you through putting the Cryto69 contract on **Sepolia**, the
Ethereum test network, using only a browser. Everything on Sepolia is
fake money for practice — that's the point.

You need: the MetaMask browser extension (metamask.io) and about
10 minutes.

## 1. Set up MetaMask

1. Install MetaMask and create a wallet.
2. **Write your seed phrase on paper and keep it somewhere safe. Never
   type it into any website, and never give it to anyone — including
   Muse. Anyone with that phrase owns your wallet.**
3. In MetaMask, turn on test networks: Settings → Advanced →
   "Show test networks". Then switch the network to **Sepolia**.

## 2. Get free test ETH

Deploying costs a little "gas", paid in Sepolia ETH, which is free from
a faucet:

- Google Cloud's Sepolia faucet: cloud.google.com/application/web3/faucet/ethereum/sepolia
- or search "Sepolia faucet" and use a well-known one (Alchemy,
  Infura, Chainlink all run one).

Paste your MetaMask wallet address, request the drip, wait a minute.
This ETH is worthless — it's only for practice.

## 3. Compile the contract in Remix

1. Go to remix.ethereum.org.
2. Create a new file called `Cryto69.sol` and paste in the contents of
   `contracts/Cryto69.sol` from this repo.
3. Open the "Solidity Compiler" tab (left sidebar), set the compiler
   to 0.8.20 or higher, and click **Compile Cryto69.sol**.

## 4. Deploy

1. Open the "Deploy & Run Transactions" tab.
2. Set Environment to **Injected Provider – MetaMask**. MetaMask pops
   up — connect it, and make sure it's on Sepolia.
3. Select the **CRYTO69** contract and click **Deploy**. Confirm in
   MetaMask.
4. After it confirms, your contract appears under "Deployed Contracts"
   with its own address. Click `totalSupply` and `balanceOf` (paste in
   your wallet address) to see your 69,000,000 tokens.

Done — that contract address IS the coin, on the test network. You can
send tokens to any other Sepolia wallet with the `transfer` function.

## About the real network

Deploying the same contract on Ethereum mainnet (or another real chain)
costs real money in gas and needs a funded wallet — that part is entirely
yours to do from your own wallet; Muse can't and won't handle wallets,
keys, or real funds. And deploying does not create value: the token is
worth something only if buyers appear, which nobody can promise.
