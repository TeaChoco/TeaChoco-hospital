//-Path: "TeaChoco-Hospital/client/src/pages/profile/AllowPage.tsx"
import env from '../../configs/env';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { PermissionRow } from './PermissionRow';
import Input from '../../components/custom/Input';
import Paper from '../../components/custom/Paper';
import Modal from '../../components/custom/Modal';
import { useSocket } from '../../hooks/useSocket';
import Switch from '../../components/custom/Switch';
import QRScanner from '../../components/auth/code/QRScanner';
import { useSigninQrStore } from '../../store/useSigninQrStore';
import QRGenerator from '../../components/auth/code/QRGenerator';
import { SiginQrData, SiginQrType } from '../../types/signin-qr';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePermissionsStore } from '../../store/usePermissionsStore';
import { type Allow, Resource, type SigninResult } from '../../types/auth';
import { FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaShieldAlt } from 'react-icons/fa';

export type PermissionMatrix = Record<Resource, Allow>;

export default function AllowPage() {
    const {
        expiresAt,
        isExpiresAt,
        qrExpiresAt,
        responseData,
        resetToken,
        setExpiresAt,
        setIsExpiresAt,
        newRequestData,
        newResponseData,
        checkAuthScanUnauth,
    } = useSigninQrStore();
    const { user } = useAuth();
    const { t } = useTranslation();
    const { id, emit, useEvent } = useSocket();
    const [isScanner, setIsScanner] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { permissions, updatePermission } = usePermissionsStore();
    const [scanResult, setScanResult] = useState<SigninResult | null>(null);

    useEffect(() => {
        if (error) {
            console.error(error);
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const newValue = useCallback(() => {
        resetToken();
        newRequestData({ id });
        newResponseData({ id, user, permissions });
    }, [id, user, permissions, resetToken, newRequestData, newResponseData]);

    useEffect(() => {
        newValue();
    }, [newValue]);

    const value = useMemo(() => {
        const url = env.clientUrl;
        if (!responseData) return '';
        const { socketId, token } = responseData;
        return `${url}/signin?socketId=${socketId}&token=${token}&expiresAt=${qrExpiresAt.toISOString()}`;
    }, [responseData]);

    const handleSigninQr = useCallback(
        (data: SiginQrData) => {
            const incomingData = SiginQrData.getData(data);
            try {
                // Found a matching request! Send the response back to the requester.
                const responseToSend = SiginQrData.getData({
                    type: SiginQrType.AuthScanUnauth,
                    request: incomingData.request,
                    response: responseData,
                    senderSocketId: incomingData.senderSocketId,
                });
                if (!(responseToSend instanceof SiginQrData))
                    throw new Error('Response data is not SiginQrData');
                console.log('responseToSend: ', responseToSend);
                emit('signin-qr', responseToSend);
            } catch (error) {
                console.error(error);
                setError(error instanceof Error ? error.message : 'Authentication failed');
            }
        },
        [responseData],
    );

    // Handle incoming Remote Access Requests
    useEvent('signin-qr', (data: SiginQrData) => handleSigninQr(data), [handleSigninQr]);

    useEvent(
        'signin-qr-result',
        (data: SigninResult) => {
            setScanResult(data);
        },
        [],
    );

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-4 md:p-0">
            <div className="flex-1 flex flex-col gap-6">
                <Paper className="p-6 md:p-8 overflow-hidden space-y-6 border-l-4 border-l-primary">
                    <div className="flex items-center gap-4 mb-8">
                        <Link
                            to="/profile"
                            className="btn-icon bg-secondary/10 hover:bg-secondary/20 transition-colors">
                            <FaArrowLeft />
                        </Link>
                        <div>
                            <h2 className="text-3xl font-black text-text-light dark:text-text-dark tracking-tight">
                                {t('accessControl.header')}
                            </h2>
                            <p className="text-sm text-text-light/60 dark:text-text-dark/60 font-medium">
                                {t('accessControl.description')}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <Paper
                            variant="200"
                            className="p-5 flex flex-col gap-3 border border-border-light/50">
                            <h3 className="font-bold flex items-center gap-2 text-primary">
                                <FaShieldAlt className="text-sm" />{' '}
                                {t('accessControl.expirationSetting')}
                            </h3>
                            <div className="flex items-center gap-4">
                                <Switch checked={isExpiresAt} onCheckedChange={setIsExpiresAt} />
                                <Input
                                    type="datetime-local"
                                    disabled={!isExpiresAt}
                                    containerClassName="w-full flex-1"
                                    className="bg-transparent border-0 focus:ring-1 ring-primary/30"
                                    value={new Date(
                                        expiresAt.getTime() - expiresAt.getTimezoneOffset() * 60000,
                                    )
                                        .toISOString()
                                        .slice(0, 16)}
                                    onChange={(e) => setExpiresAt(new Date(e.target.value))}
                                />
                            </div>
                        </Paper>
                    </div>

                    <div className="overflow-x-auto rounded-3xl border border-border-light/50 dark:border-border-dark/50">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-background-light2/80 dark:bg-background-dark2/80 backdrop-blur-sm">
                                <tr className="text-text-light/50 dark:text-text-dark/50 uppercase text-[11px] font-black tracking-widest border-b border-border-light/50">
                                    <th className="py-3 px-6 font-black">
                                        {t('accessControl.resource')}
                                    </th>
                                    <th className="py-3 text-center font-black">
                                        {t('accessControl.read')}
                                    </th>
                                    <th className="py-3 text-center font-black">
                                        {t('accessControl.edit')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.values(Resource).map((res) => (
                                    <PermissionRow
                                        key={res}
                                        label={t(`accessControl.resources.${res}`)}
                                        value={permissions[res]}
                                        onChange={(val) => updatePermission(res, val)}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Paper>
            </div>

            <div className="w-full lg:w-[400px] flex flex-col gap-4">
                <div className="flex p-1 bg-background-light2 dark:bg-background-dark2 rounded-2xl border border-border-light/50">
                    <button
                        onClick={() => setIsScanner(false)}
                        className={`btn flex-1 ${!isScanner ? 'btn-primary' : ''}`}>
                        {t('accessControl.generateQR')}
                    </button>
                    <button
                        onClick={() => setIsScanner(true)}
                        className={`btn flex-1 ${isScanner ? 'btn-primary' : ''}`}>
                        {t('accessControl.scanQR')}
                    </button>
                </div>

                <Paper
                    variant="200"
                    className="p-6 min-h-[450px] flex flex-col justify-center border border-border-light/50 relative">
                    {/* Dynamic Error notification */}
                    {error && (
                        <div className="absolute top-8 left-8 right-8 z-20 animate-in fade-in slide-in-from-top-4 duration-300">
                            <div className="bg-red-500 text-white p-4 rounded-2xl flex items-center gap-4 shadow-xl shadow-red-500/30 border border-white/20">
                                <div className="bg-white/20 p-2 rounded-xl">
                                    <FaExclamationTriangle className="text-white" />
                                </div>
                                <p className="text-sm font-bold truncate">{error}</p>
                            </div>
                        </div>
                    )}
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <FaShieldAlt className="text-8xl" />
                    </div>
                    {isScanner ? (
                        <QRScanner
                            header={t('accessControl.scanHeader')}
                            onScan={(result) => {
                                const data = SiginQrData.getData(result);
                                try {
                                    checkAuthScanUnauth(data);
                                    console.log('onScan: ', { data, responseData });
                                    data.response = responseData;
                                    console.log('after onScan: ', data);
                                    emit('signin-qr', data);
                                } catch (error) {
                                    return setError(
                                        error instanceof Error ? error.message : 'Unknown error',
                                    );
                                }
                            }}
                        />
                    ) : (
                        <QRGenerator
                            value={value}
                            newValue={newValue}
                            header={t('accessControl.remoteAccessQR')}
                        />
                    )}
                </Paper>
            </div>
            {scanResult && (
                <Modal
                    isOpen={!!scanResult}
                    onClose={() => setScanResult(null)}
                    className="max-w-sm"
                    title={t('accessControl.resultTitle', 'Authentication Result')}>
                    <div className="flex flex-col items-center text-center space-y-6 pt-2">
                        <div className="relative">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center animate-pulse">
                                <FaCheckCircle className="text-4xl text-green-500" />
                            </div>
                            <div className="absolute -inset-2 bg-green-500/5 rounded-full -z-10 animate-ping duration-1000" />
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xl font-black text-text-light dark:text-text-dark">
                                {t('accessControl.authSuccess', 'Access Granted!')}
                            </h4>
                            <p className="text-sm text-text-light/60 dark:text-text-dark/60 leading-relaxed px-4">
                                {scanResult.message ||
                                    t('accessControl.defaultSuccess', 'Device linked successfully')}
                            </p>
                        </div>

                        {scanResult.user && (
                            <Paper
                                variant="200"
                                className="w-full p-4 flex items-center gap-4 bg-primary/5 border border-primary/10">
                                {scanResult.user.picture && (
                                    <img
                                        src={scanResult.user.picture}
                                        alt=""
                                        className="w-10 h-10 rounded-full border-2 border-primary/20"
                                    />
                                )}
                                <div className="text-left">
                                    <p className="text-xs font-black text-primary uppercase tracking-widest">
                                        {t('common.user', 'User')}
                                    </p>
                                    <p className="text-sm font-bold truncate max-w-[180px]">
                                        {scanResult.user.name}
                                    </p>
                                </div>
                            </Paper>
                        )}

                        <button
                            onClick={() => setScanResult(null)}
                            className="btn btn-primary w-full py-4 rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                            {t('common.done', 'Done')}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}
