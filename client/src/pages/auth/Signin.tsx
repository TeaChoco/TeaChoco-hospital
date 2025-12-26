//-Path: "TeaChoco-Hospital/client/src/pages/auth/Signin.tsx"
import SigninGoogle from './SigninGoogle';
import { useAuth } from '../../hooks/useAuth';
import { authAPI } from '../../services/auth';
import Background from '../../layout/Background';
import { useSocket } from '../../hooks/useSocket';
import { useEffect, useMemo, useState } from 'react';
import Activity from '../../components/custom/Activity';
import { IoCloseCircle, IoHome } from 'react-icons/io5';
import SelectLang from '../../components/layout/SelectLang';
import QRScannerPage from '../../components/auth/QRScanner';
import ThemeToggle from '../../components/layout/ThemeToggle';
import QRGeneratorPage from '../../components/auth/QRGenerator';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { SiginQrData } from '../../types/signin-qr.dto';

export default function Signin() {
    const navigate = useNavigate();
    const { emit, useEvent } = useSocket();
    const [searchParams] = useSearchParams();
    const { isAuthenticated, loading, error } = useAuth();
    const [queryError, setQueryError] = useState<string | null>(null);
    const [querySource, setQuerySource] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'google' | 'scan' | 'generate'>('google');

    const { socketId, token } = useMemo(() => {
        const params = new URLSearchParams(window.location.search);
        const socketId = params.get('socketId');
        const token = params.get('token');
        return { socketId, token };
    }, [window.location.search]);

    const signinQr = (socketId: string, token: string) => {
        const data: SiginQrData = { request: { socketId, token } };
        console.log(data);
        if (
            typeof data === 'object' &&
            data.request &&
            typeof data.request.token === 'string' &&
            typeof data.request.socketId === 'string'
        )
            emit('signin-qr', data);
        else console.log(data, 'is not RequestSocketData');
    };

    useEffect(() => {
        if (socketId && token) signinQr(socketId, token);
    }, [socketId, token]);

    useEvent('signin-qr', (data: SiginQrData) => {
        if (
            typeof data === 'object' &&
            data.request &&
            typeof data.request.token === 'string' &&
            typeof data.request.socketId === 'string'
        )
            authAPI.signinQr(data);
        console.log(data);
    });

    if (isAuthenticated && !(socketId && token)) navigate('/');

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
            <div className="absolute top-4 right-4 z-50 flex gap-4 items-center">
                <ThemeToggle />
                <SelectLang />
            </div>

            <div className="max-w-lg w-full card overflow-hidden p-0">
                <div className="bg-linear-to-r relative from-primary to-primary-dark p-8 text-center text-white">
                    <div className="flex absolute top-4 left-4">
                        <button
                            title="Go to Home"
                            className="btn-icon"
                            aria-label="Go to Home"
                            onClick={() => navigate('/')}>
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
                            onClick={() => setActiveTab('google')}
                            className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                                activeTab === 'google'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'
                            }`}>
                            Google Login
                        </button>
                        <button
                            onClick={() => setActiveTab('scan')}
                            className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                                activeTab === 'scan'
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'
                            }`}>
                            Scan QR
                        </button>
                        <button
                            onClick={() => setActiveTab('generate')}
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
                    <Activity visible={loading}>
                        <div className="mb-6 bg-primary/10 border border-primary/20 rounded-lg p-4">
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                                <span className="ml-3 text-primary-dark font-medium">
                                    Signing in...
                                </span>
                            </div>
                        </div>
                    </Activity>

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
                        <Activity visible={activeTab === 'google'}>
                            <SigninGoogle queryError={queryError} querySource={querySource} />
                        </Activity>

                        <Activity visible={activeTab === 'scan'}>
                            <QRScannerPage />
                        </Activity>

                        <Activity visible={activeTab === 'generate'}>
                            <QRGeneratorPage />
                        </Activity>
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
