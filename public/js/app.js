let wallet = null;
const FEE_PERCENTAGE = 0.22;
const FEE_WALLET = window.FEE_WALLET || "EPqPP8mSk4bFNfk5cAg9hGR6XPLwh9Rp3Lo4wDiLEdrZ";

// Elementi UI
const connectButton = document.getElementById('wallet-connect');
const fromAmount = document.getElementById('from-amount');
const toAmount = document.getElementById('to-amount');
const fromToken = document.getElementById('from-token');
const toToken = document.getElementById('to-token');
const swapButton = document.getElementById('swap-button');
const priceImpact = document.getElementById('price-impact');
const feeAmount = document.getElementById('fee-amount');

// Inizializzazione
async function initialize() {
    if (!window.solana || !window.solana.isPhantom) {
        alert('Phantom wallet non trovato! Per favore installa Phantom.');
        return;
    }

    connectButton.addEventListener('click', connectWallet);
    fromAmount.addEventListener('input', updateSwapDetails);
    swapButton.addEventListener('click', executeSwap);
}

// Connessione al wallet
async function connectWallet() {
    try {
        const resp = await window.solana.connect();
        wallet = resp.publicKey;
        connectButton.textContent = wallet.toString().slice(0, 4) + '...' + wallet.toString().slice(-4);
        await updateBalances();
    } catch (err) {
        console.error('Errore nella connessione al wallet:', err);
    }
}

// Aggiornamento dei dettagli dello swap
async function updateSwapDetails() {
    if (!fromAmount.value || !wallet) return;

    const amount = parseFloat(fromAmount.value);
    const fee = amount * (FEE_PERCENTAGE / 100);
    
    // Simulazione del prezzo (da sostituire con chiamata API reale)
    const estimatedOutput = amount * 1.5; // Esempio
    
    toAmount.value = (estimatedOutput - fee).toFixed(6);
    feeAmount.textContent = fee.toFixed(6) + ' ' + fromToken.value;
    priceImpact.textContent = '0.5%'; // Esempio
}

// Esecuzione dello swap
async function executeSwap() {
    if (!wallet || !fromAmount.value) return;

    try {
        swapButton.disabled = true;
        swapButton.textContent = 'Swapping...';

        // Qui andrebbe implementata la logica di swap reale
        const transaction = new solanaWeb3.Transaction();
        
        // Aggiungi istruzioni per il trasferimento delle fee
        const feeInstruction = solanaWeb3.SystemProgram.transfer({
            fromPubkey: wallet,
            toPubkey: new solanaWeb3.PublicKey(FEE_WALLET),
            lamports: solanaWeb3.LAMPORTS_PER_SOL * parseFloat(fromAmount.value) * (FEE_PERCENTAGE / 100)
        });
        
        transaction.add(feeInstruction);
        
        // Firma e invia la transazione
        const signature = await window.solana.signAndSendTransaction(transaction);
        
        alert('Swap completato con successo!');
        await updateBalances();
    } catch (err) {
        console.error('Errore durante lo swap:', err);
        alert('Errore durante lo swap. Controlla la console per i dettagli.');
    } finally {
        swapButton.disabled = false;
        swapButton.textContent = 'Swap';
    }
}

// Aggiornamento dei saldi
async function updateBalances() {
    if (!wallet) return;
    
    try {
        const connection = new solanaWeb3.Connection('https://api.mainnet-beta.solana.com');
        const balance = await connection.getBalance(wallet);
        document.getElementById('from-balance').textContent = (balance / solanaWeb3.LAMPORTS_PER_SOL).toFixed(4);
    } catch (err) {
        console.error('Errore nel caricamento dei saldi:', err);
    }
}

// Inizializza l'app
document.addEventListener('DOMContentLoaded', initialize); 