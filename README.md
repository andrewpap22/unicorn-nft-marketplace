# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

### Compile, Run, Deploy Smart Contract in case MetaMask lags.

Most important step: 
---
 1. Keep the local blockchain running in a separate terminal by hitting: 

```bash
npx hardhat node
```

2. Deploy / Re-Deploy the smart contract by hitting:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

3. Get the contract address from the terminal and paste it in the `constants.js` file.

4. Run the frontend by hitting:

```bash
npm run dev || yarn dev
```