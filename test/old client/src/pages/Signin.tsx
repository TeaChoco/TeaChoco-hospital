//-Path: "TeaChoco-Hospital/client/src/pages/Signin.tsx"
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import QRScanner from '../components/QRScanner';
import QRGenerator from '../components/QRGenerator';
import ThemeToggle from '../components/ThemeToggle';
import GoogleSignin from '../components/GoogleSignin';
import Background from '../layout/Background';

export default function Signin() {
    const navigate = useNavigate();
    const { isAuthenticated, user, loading, error, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<'google' | 'scan' | 'generate'>(
        'google',
    );

    const handleGoBack = () => navigate(-1); // ย้อนกลับ 1 หน้า

    if (isAuthenticated && user) {
        return (
            <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center p-4">
                <div className="absolute top-4 right-4 z-50">
                    <ThemeToggle />
                </div>
                <div className="max-w-md w-full card">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent mb-2">
                            Welcome back!
                        </h1>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark">
                            You are logged in successfully
                        </p>
                    </div>

                    <div className="bg-bg-card-hover-light dark:bg-bg-card-hover-dark rounded-lg p-4 mb-6">
                        <div className="flex items-center space-x-3">
                            {user.avatar && (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full border-2 border-primary"
                                />
                            )}
                            <div>
                                <h3 className="font-semibold text-text-light dark:text-text-dark">
                                    {user.name}
                                </h3>
                                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={logout}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-colors font-medium shadow-lg shadow-red-500/20"
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Background />
            <div className="absolute top-4 right-4 z-50">
                <ThemeToggle />
            </div>
            <div className="max-w-lg w-full card overflow-hidden p-0">
                {/* Header */}
                <div className="bg-linear-to-r relative from-primary to-primary-dark p-8 text-center text-white">
                    <button
                        title="Go back"
                        aria-label="Go back"
                        onClick={handleGoBack}
                        className="btn btn-secondary absolute top-4 left-4 hover:bg-white/20"
                    >
                        <IoArrowBack />
                    </button>

                    <h1 className="text-3xl font-bold mb-2">
                        TeaChoco Hospital
                    </h1>
                    <p className="text-white/80">Please sign in to continue</p>
                </div>

                {/* Tabs */}
                <div className="border-b border-border-light dark:border-border-dark transition-colors duration-200">
                    <nav className="flex">
                        <button
                            onClick={() => setActiveTab('google')}
                            className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                                activeTab === 'google'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'
                            }`}
                        >
                            Google Login
                        </button>
                        <button
                            onClick={() => setActiveTab('scan')}
                            className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                                activeTab === 'scan'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'
                            }`}
                        >
                            Scan QR
                        </button>
                        <button
                            onClick={() => setActiveTab('generate')}
                            className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                                activeTab === 'generate'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'
                            }`}
                        >
                            Generate QR
                        </button>
                    </nav>
                </div>

                {/* Content */}
                <div className="p-8 bg-bg-card-light dark:bg-bg-card-dark transition-colors duration-200">
                    {loading && (
                        <div className="mb-6 bg-primary/10 border border-primary/20 rounded-lg p-4">
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                                <span className="ml-3 text-primary-dark font-medium">
                                    Signing in...
                                </span>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 transition-colors duration-200">
                            <p className="text-red-600 dark:text-red-400 font-medium">
                                {error}
                            </p>
                        </div>
                    )}

                    <div className="space-y-6">
                        {activeTab === 'google' && (
                            <div>
                                <h3 className="text-lg font-semibold text-center mb-4 text-text-light dark:text-text-dark transition-colors duration-200">
                                    Sign in with Google
                                </h3>
                                <GoogleSignin
                                    onSuccess={() =>
                                        console.log('Google login successful')
                                    }
                                    onError={(error) =>
                                        console.error(
                                            'Google login error:',
                                            error,
                                        )
                                    }
                                />
                            </div>
                        )}

                        {activeTab === 'scan' && (
                            <div>
                                <h3 className="text-lg font-semibold text-center mb-4 text-text-light dark:text-text-dark">
                                    Scan QR Code
                                </h3>
                                <QRScanner
                                    onScanSuccess={(data) =>
                                        console.log('QR scan successful:', data)
                                    }
                                    onScanError={(error) =>
                                        console.error('QR scan error:', error)
                                    }
                                />
                            </div>
                        )}

                        {activeTab === 'generate' && (
                            <div>
                                <h3 className="text-lg font-semibold text-center mb-4 text-text-light dark:text-text-dark">
                                    Generate QR Code
                                </h3>
                                <QRGenerator
                                    onGenerate={(qrData) =>
                                        console.log('QR generated:', qrData)
                                    }
                                    onError={(error) =>
                                        console.error(
                                            'QR generation error:',
                                            error,
                                        )
                                    }
                                />
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-border-light dark:border-border-dark">
                        <p className="text-center text-sm text-text-muted-light dark:text-text-muted-dark">
                            Choose your preferred login method above
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
