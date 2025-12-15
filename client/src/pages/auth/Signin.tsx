//-Path: "TeaChoco-Hospital/client/src/pages/auth/Signin.tsx"
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Background from '../../layout/Background';
import QRScanner from '../../components/auth/QRScanner';
import { IoCloseCircle, IoHome } from 'react-icons/io5';
import SelectLang from '../../components/layout/SelectLang';
import QRGenerator from '../../components/auth/QRGenerator';
import ThemeToggle from '../../components/layout/ThemeToggle';
import GoogleSignin from '../../components/auth/GoogleSignin';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Signin() {
    const navigate = useNavigate();
    const { loading, error } = useAuth();
    const [searchParams] = useSearchParams();
    const [queryError, setQueryError] = useState<string | null>(null);
    const [querySource, setQuerySource] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'google' | 'scan' | 'generate'>('google');

    // ดึงค่า error จาก query parameters
    useEffect(() => {
        const errorParam = searchParams.get('error');
        const sourceParam = searchParams.get('source');

        if (errorParam) {
            // Decode URI component
            const decodedError = decodeURIComponent(errorParam);
            setQueryError(decodedError);
            setQuerySource(sourceParam);

            // ลบ error query parameters จาก URL
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.delete('error');
            newSearchParams.delete('source');

            // อัพเดท URL โดยไม่ reload page
            navigate(
                {
                    search: newSearchParams.toString(),
                },
                { replace: true },
            );
        }
    }, [searchParams, navigate]);

    // แปลง error message เป็นภาษาไทย
    const getLocalizedErrorMessage = (error: string): string => {
        const errorMap: Record<string, string> = {
            'No user data received from Google': 'ไม่ได้รับข้อมูลผู้ใช้จาก Google',
            'Authentication failed': 'การยืนยันตัวตนล้มเหลว',
            invalid_client: 'ข้อมูลการยืนยันตัวตนไม่ถูกต้อง',
            invalid_grant: 'การอนุญาตไม่ถูกต้อง',
            access_denied: 'ถูกปฏิเสธการเข้าถึง',
            unauthorized_client: 'ไคลเอ็นต์ไม่ได้รับอนุญาต',
            unsupported_response_type: 'ประเภทการตอบสนองไม่รองรับ',
            invalid_scope: 'ขอบเขตไม่ถูกต้อง',
            server_error: 'ข้อผิดพลาดเซิร์ฟเวอร์',
            temporarily_unavailable: 'บริการไม่พร้อมใช้งานชั่วคราว',
        };
        return errorMap[error] || error;
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Background />
            <div className="absolute top-4 right-4 z-50 flex gap-4">
                <ThemeToggle />
                <SelectLang />
            </div>

            <div className="max-w-lg w-full card overflow-hidden p-0">
                <div className="bg-linear-to-r relative from-primary to-primary-dark p-8 text-center text-white">
                    <div className="flex absolute top-4 left-4">
                        <button
                            title="Go to Home"
                            aria-label="Go to Home"
                            onClick={() => navigate('/')}
                            className="btn-icon">
                            <IoHome />
                        </button>
                    </div>

                    <h1 className="text-3xl font-bold mb-2">TeaChoco Hospital</h1>
                    <p className="text-white/80">Please sign in to continue</p>
                </div>

                {/* Tabs */}
                <div className="border-b border-border-light dark:border-border-dark transition-colors duration-200">
                    <nav className="flex">
                        <button
                            onClick={() => {
                                setActiveTab('google');
                            }}
                            className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                                activeTab === 'google'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'
                            }`}>
                            Google Login
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('scan');
                            }}
                            className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                                activeTab === 'scan'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'
                            }`}>
                            Scan QR
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('generate');
                            }}
                            className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                                activeTab === 'generate'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'
                            }`}>
                            Generate QR
                        </button>
                    </nav>
                </div>

                {/* Content */}
                <div className="p-8 bg-bg-card-light dark:bg-bg-card-dark transition-colors duration-200">
                    {/* Loading State */}
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

                    {/* Error State จาก useAuth hook */}
                    {(error || queryError) && (
                        <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 transition-colors duration-200">
                            <div className="flex items-start">
                                <IoCloseCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2 shrink-0" />
                                <div>
                                    <p className="text-red-600 dark:text-red-400 font-medium">
                                        {error ? getLocalizedErrorMessage(error) : queryError}
                                    </p>
                                    <p className="text-red-500 dark:text-red-300 text-sm mt-1">
                                        Please try again or use another sign-in method.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-6">
                        {activeTab === 'google' && (
                            <div>
                                <h3 className="text-lg font-semibold text-center mb-4 text-text-light dark:text-text-dark transition-colors duration-200">
                                    Sign in with Google
                                </h3>
                                <GoogleSignin />

                                {/* Debug Information (สำหรับ development) */}
                                {import.meta.env.NODE_ENV === 'development' && queryError && (
                                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                                        <p className="font-mono text-gray-600 dark:text-gray-400">
                                            Debug: {queryError}
                                        </p>
                                        <p className="font-mono text-gray-500 dark:text-gray-500 mt-1">
                                            Source: {querySource}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'scan' && (
                            <div>
                                <h3 className="text-lg font-semibold text-center mb-4 text-text-light dark:text-text-dark">
                                    Scan QR Code
                                </h3>
                                <QRScanner
                                    onScanSuccess={(data) => {
                                        console.log('QR scan successful:', data);
                                        // Handle successful QR scan
                                    }}
                                    onScanError={(error) => {
                                        console.error('QR scan error:', error);
                                        // คุณสามารถแสดง error จากการสแกน QR ได้ที่นี่
                                    }}
                                />
                            </div>
                        )}

                        {activeTab === 'generate' && (
                            <div>
                                <h3 className="text-lg font-semibold text-center mb-4 text-text-light dark:text-text-dark">
                                    Generate QR Code
                                </h3>
                                <QRGenerator
                                    onGenerate={(qrData) => console.log('QR generated:', qrData)}
                                    onError={(error) =>
                                        console.error('QR generation error:', error)
                                    }
                                />
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-border-light dark:border-border-dark">
                        <p className="text-center text-sm text-text-muted-light dark:text-text-muted-dark">
                            {queryError
                                ? 'Please try another sign-in method or contact support'
                                : 'Choose your preferred login method above'}
                        </p>

                        {/* Support Links */}
                        {queryError && (
                            <div className="mt-4 flex justify-center space-x-4">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="text-sm text-primary hover:text-primary-dark transition-colors">
                                    Refresh Page
                                </button>
                                <button
                                    onClick={() => navigate('/help')}
                                    className="text-sm text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors">
                                    Get Help
                                </button>
                                <button
                                    onClick={() => navigate('/contact')}
                                    className="text-sm text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors">
                                    Contact Support
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
