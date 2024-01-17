# Foundry Template

## Instructions.
Assuming you already have Rust and Foundry installed.

See the [Book of Foundry](https://book.getfoundry.sh/projects/working-on-an-existing-project.html) to learn more.

1. 
```bash
forge install
```
2. Compile the project
```bash
forge build
``` 
3. Run test suite
```bash
forge test
```

### Generate docs based on Natspec on files

```bash
forge doc
```

### Check test coverage 
```bash
forge coverage
```

### Run Foundry formater
```bash
forge fmt
``` 

## Get all functions selectors from a contract
```bash
forge inspect <YourContractName> methods
```

## Run Locally

Open Anvil local node
```bash
anvil
```
## Safely store your private keys
Encryption using ERC2335

In the forge console:
1. Open the interactive console to import your private key
```bash
cast wallet import <KEYNAME> --interactive
```
2. Paste your private key in the prompt
3. Input a password for that key (remember, a safe and brand-new one. REMEMBER it)

See all stored keys
```bash
cast wallet list
```

Use it in your scripts like I do on the following scripts

View the [full video from Patrick Collins](https://www.youtube.com/watch?v=VQe7cIpaE54) for Cyfrin if it's not clear 

## Load .env variables (Use for everything BUT your private keys)
Load .env variables 
in .env file->NO spaces between variable name and value, value with quotes. ETHERSCAN_KEY="blablabla"

```bash
source .env
```
Run on local node
Note `--sender` is the public address of your private key
```bash
forge script script/DeployLocal.s.sol:Deploy --fork-url http://localhost:8545 --account <PRIVATE_KEY_NAME> --sender <ACCOUNT_ADDRESS> --broadcast -vvvv
```

**Deploy to Sepolia**

Deploy to Sepolia and verify.
Note `--sender` is the public address of your private key
```bash
forge script script/DeployTestnet.s.sol:Deploy --rpc-url $SEPOLIA_KEY  --account <PRIVATE_KEY_NAME> --sender <ACCOUNT_ADDRESS> --broadcast --verify --etherscan-api-key $ETHERSCAN_KEY -vvvv
```

GHO token 0xc4bF5CbDaBE595361438F8c6a187bDc330539c60
deposit gho, use gho
deposit anything, use gho

