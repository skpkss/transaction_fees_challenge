# Solana Transaction Example
The code calculates the balance of a sender wallet, transfers 50% of the balance to another wallet, and then displays the updated balances of both wallets.

 Install dependencies:

```bash
npm install
```

## Usage

1. Replace the `DEMO_FROM_SECRET_KEY` placeholder in `index.js` with the actual secret key bytes of your sender wallet.

2. Run the code:

```bash
node index.js
```

The code will perform the following steps:

1. Calculate the balance of the sender wallet.
2. Airdrop an amount equal to 50% of the sender's balance to the sender wallet.
3. Transfer the airdropped amount to another randomly generated wallet.
4. Display the transaction details, including sender and receiver wallet balances.

//this code is contributed by Saurabh Kaplas.
