const solanaWeb3 = require('@solana/web3.js');

async function main() {
    // Connect to the Solana Devnet
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');

    // Generate a new wallet keypair
    const wallet = solanaWeb3.Keypair.generate();
    console.log("New Wallet Public Key:", wallet.publicKey.toBase58());

    // Airdrop 1 SOL to the wallet
    const airdropSignature = await connection.requestAirdrop(wallet.publicKey, solanaWeb3.LAMPORTS_PER_SOL);
    await connection.confirmTransaction(airdropSignature);

    // Check the balance
    let balance = await connection.getBalance(wallet.publicKey);
    console.log('Wallet Balance:', balance / solanaWeb3.LAMPORTS_PER_SOL, 'SOL');
}

main().catch(err => {
    console.error(err);
});
