import { useWallet } from '@solana/wallet-adapter-react';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';

const useTokenAccountVerification = (tokenMint: string) => {
    const { publicKey } = useWallet();
    const [hasTokenAccount, setHasTokenAccount] = useState(false);

    useEffect(() => {
        const verifyTokenAccount = async () => {
            if (!publicKey) return;

            const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_URL;
            if (!endpoint) {
                throw new Error('NEXT_PUBLIC_SOLANA_RPC_URL is not set');
            }

            // Create Umi instance with custom RPC URL
            const umi = createUmi(endpoint);
            
            try {
                // Get the associated token address
                const associatedTokenAddress = await getAssociatedTokenAddress(
                    new PublicKey(tokenMint),
                    new PublicKey(publicKey)
                );

                // Fetch the account info
                const accountInfo = await umi.rpc.getAccount(associatedTokenAddress.toBase58());

                if (accountInfo.exists) {
                    // Extract the balance from the account data
                    const balance = new DataView(accountInfo.data.buffer).getBigUint64(64, true);
                    setHasTokenAccount(balance > 0n);
                } else {
                    setHasTokenAccount(false);
                }
            } catch (error) {
                console.error('Error verifying token account:', error);
                setHasTokenAccount(false);
            }
        };

        verifyTokenAccount();
    }, [publicKey, tokenMint]);

    return hasTokenAccount;
};

export default useTokenAccountVerification;