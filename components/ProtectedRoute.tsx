import { useWallet } from '@solana/wallet-adapter-react';
import { FC, ReactNode } from 'react';
import useTokenAccountVerification from '../hooks/useTokenAccountVerification';

const ProtectedRoute: FC<{ children: ReactNode; tokenMint: string }> = ({ children, tokenMint }) => {
    const { connected } = useWallet();
    const hasTokenAccount = useTokenAccountVerification(tokenMint);

    if (!connected) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <p className="text-xl text-center text-red-500">Please connect your wallet</p>
                </div>
            </div>
        );
    }

    if (!hasTokenAccount) {
        return (
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <p className="text-xl text-center text-red-500">You need the required token to access this page</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;