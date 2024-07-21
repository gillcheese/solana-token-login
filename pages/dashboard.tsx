import { NextPage } from 'next';
import ProtectedRoute from '../components/ProtectedRoute';
import { REQUIRED_TOKEN_MINT } from '../constants/tokens';

const Dashboard: NextPage = () => {
    return (
        <ProtectedRoute tokenMint={REQUIRED_TOKEN_MINT}>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
                <main className="p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-4xl font-bold mb-4 text-center">Protected Dashboard</h1>
                    <p className="text-xl text-center text-gray-600">Welcome to your protected dashboard!</p>
                    <p className="mt-4 text-center text-gray-500">
                        You have successfully verified ownership of the required token.
                    </p>
                </main>
            </div>
        </ProtectedRoute>
    );
};

export default Dashboard;