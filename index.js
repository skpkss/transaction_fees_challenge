const { Connection, PublicKey, clusterApiUrl, Keypair, LAMPORTS_PER_SOL, Transaction, SystemProgram, sendAndConfirmTransaction } = require("@solana/web3.js");
const DEMO_FROM_SECRET_KEY = new Uint8Array(
    // paste your secret key inside this empty array
    // then uncomment transferSol() at the bottom
    [
        45,  30, 134,  46, 176, 104, 115, 172, 251, 104, 114,
  184, 102,  99,  73,   0,  43,   3, 219,  56,  24, 176,
   54, 234, 241, 255, 209,  24, 205, 118,  70, 254, 103,
  113, 143, 125,  89,  45,  98, 126,  42,  79, 159, 144,
  170, 193, 253, 142,  82, 241, 236, 138,  85, 143, 246,
   84, 246, 165, 200, 176, 248,  46,  73, 157 
    ]            
);
const transferSol = async () => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    // Get Keypair from Secret Key
    const from = Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);

    // Generate another Keypair (account we'll be sending to)
    const to = Keypair.generate();

    // Get sender wallet balance
    const senderBalance = await connection.getBalance(from.publicKey);
    console.log(`From Wallet balance: ${senderBalance / LAMPORTS_PER_SOL} SOL`);

    // Calculate amount to transfer (50% of balance)
    const amountToSend = senderBalance / 2;

    // Airdrop amountToSend to Sender wallet
    console.log(`Airdropping ${amountToSend / LAMPORTS_PER_SOL} SOL to Sender wallet!`);
    const fromAirDropSignature = await connection.requestAirdrop(
        new PublicKey(from.publicKey),
        amountToSend
    );

    console.log("Waiting for airdrop confirmation...");
    await connection.confirmTransaction(fromAirDropSignature);

    console.log("Airdrop completed for the Sender account");

    // Send money from "from" wallet to "to" wallet
    var transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to.publicKey,
            lamports: amountToSend
        })
    );

    // Sign transaction
    console.log("Signing and sending the transaction...");
    var signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [from]
    );
    
    // Get sender's updated balance after transaction
    const updatedSenderBalance = await connection.getBalance(from.publicKey);
    const receiverBalance = await connection.getBalance(to.publicKey);

    console.log(`Transaction confirmed. Signature: ${signature}`);
    console.log(`From Wallet balance: ${updatedSenderBalance / LAMPORTS_PER_SOL} SOL`);
    console.log(`To Wallet balance: ${receiverBalance / LAMPORTS_PER_SOL} SOL`);
};

transferSol();
