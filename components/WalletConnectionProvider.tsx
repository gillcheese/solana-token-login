import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { FC, ReactNode, useMemo } from 'react';

require('@solana/wallet-adapter-react-ui/styles.css');

const WalletConnectionProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const endpoint = process.env.NEXT_PUBLIC_SOLANA_RPC_URL;
    if (!endpoint) {
        throw new Error('NEXT_PUBLIC_SOLANA_RPC_URL is not set');
    }
    const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletConnectionProvider;