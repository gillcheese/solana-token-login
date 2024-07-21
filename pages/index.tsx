import type { NextPage } from 'next'
import { useWallet } from '@solana/wallet-adapter-react'
import Link from 'next/link'
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

const ClientOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

const Home: NextPage = () => {
  const { connected } = useWallet()

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <main className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Welcome to Protected Dashboard
        </h1>

        <p className="text-xl mb-6 text-center text-gray-600">
          Connect your wallet to access the dashboard
        </p>

        <ClientOnly>
          <div className="flex justify-center mb-6">
            <WalletMultiButtonDynamic />
          </div>

          {connected && (
            <div className="text-center">
              <Link href="/dashboard" 
                    className="text-blue-500 hover:text-blue-700 transition duration-300">
                Go to Dashboard
              </Link>
            </div>
          )}
        </ClientOnly>
      </main>
    </div>
  )
}

export default Home