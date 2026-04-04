//-Path: "TeaChoco-Hospital/client/src/pages/profile/AllowPage.tsx"
import env from '../../configs/env';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import Input from '../../components/custom/Input';
import Paper from '../../components/custom/Paper';
import { useSocket } from '../../hooks/useSocket';
import Switch from '../../components/custom/Switch';
import QRScanner from '../../components/code/QRScanner';
import { FaArrowLeft, FaShieldAlt } from 'react-icons/fa';
import QRGenerator from '../../components/code/QRGenerator';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ResponseData, SiginQrData } from '../../types/signin-qr';
import { type Allow, type Allows, Resource } from '../../types/auth';

/**
 * @description Permission Matrix row component
 */
function PermissionRow({
    label,
    value,
    onChange,
}: {
    label: string;
    value: Allow;
    onChange: (newValue: Allow) => void;
}) {
    return (
        <tr className="border-b border-border-light/50 dark:border-border-dark/50 last:border-0">
            <td className="py-4 font-medium text-text-light dark:text-text-dark">{label}</td>
            <td className="py-4 text-center">
                <Switch
                    checked={value.read}
                    onCheckedChange={(checked) => onChange({ ...value, read: checked })}
                />
            </td>
            <td className="py-4 text-center">
                <Switch
                    checked={value.edit}
                    onCheckedChange={(checked) => onChange({ ...value, edit: checked })}
                />
            </td>
        </tr>
    );
}

export default function AllowPage() {
    const { user } = useAuth();
    const { t } = useTranslation();
    const expiresMax = 5 * 60 * 1000;
    const { id, emit, useEvent } = useSocket();
    const activeTokenRef = useRef<string>(crypto.randomUUID());
    const [isScanner, setIsScanner] = useState(true);
    const [isExpiresAt, setIsExpiresAt] = useState(false);
    const [expiresAt, setExpiresAt] = useState<Date>(new Date());
    const [qrExpiresAt, setQrExpiresAt] = useState<Date>(new Date());
    const [responseData, setResponseData] = useState<SiginQrData | undefined>(undefined);
    const [permissions, setPermissions] = useState<Record<Resource, Allow>>({
        [Resource.AUTH]: { edit: true, read: true },
        [Resource.DOCTORS]: { edit: true, read: true },
        [Resource.HOSPITALS]: { edit: true, read: true },
        [Resource.MEDICINES]: { edit: true, read: true },
        [Resource.CALENDARS]: { edit: true, read: true },
        [Resource.APPOINTMENTS]: { edit: true, read: true },
    });

    const updatePermission = (resource: Resource, value: Allow) =>
        setPermissions((prev) => ({ ...prev, [resource]: value }));

    const getValue = useCallback(() => {
        if (!id || !user) return;
        setQrExpiresAt(new Date(Date.now() + expiresMax));
        const allowsData: Allows = {
            ...permissions,
            user_id: user.user_id,
            expiresAt: isExpiresAt ? expiresAt : undefined,
        };
        const data: SiginQrData = {
            response: {
                socketId: id,
                token: activeTokenRef.current,
                expiresAt: qrExpiresAt,
                user: { ...user, allows: [allowsData] },
            } as ResponseData,
        };
        setResponseData(data);
    }, [id, user, permissions, expiresAt, isExpiresAt]);

    useEffect(() => {
        getValue();
    }, [getValue]);

    const value = useMemo(() => {
        const url = env.clientUrl;
        if (!responseData?.response) return '';
        const { socketId, token } = responseData.response as any;
        return `${url}/signin?socketId=${socketId}&token=${token}`;
    }, [responseData]);

    // Handle incoming Remote Access Requests
    useEvent(
        'signin-qr',
        (incomingData: SiginQrData) => {
            console.log({ incomingData, responseData });
            if (!incomingData.request) return console.error('No incoming request');
            if (!responseData?.response) return console.error('No response data');
            if (!incomingData.request.token) return console.error('No incoming token');
            if (!responseData.response.token) return console.error('No response token');
            if (incomingData.request.token !== responseData.response.token)
                return console.error('Token mismatch');
            if (!incomingData.senderSocketId) return console.error('No sender socket id');

            // Found a matching request! Send the response back to the requester.
            const responseToSend: SiginQrData = {
                request: incomingData.request, // <--- ต้องส่ง Request กลับไปด้วย เพื่อให้สอดคล้องกับโครงสร้างข้อมูลใน cache ของ requester
                response: {
                    ...responseData.response,
                    socketId: incomingData.senderSocketId, // Reply to SENDER
                },
                senderSocketId: responseData.senderSocketId,
            };
            console.log('responseToSend: ', responseToSend);

            emit('signin-qr', responseToSend);
        },
        [responseData],
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

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-text-light/40 dark:text-text-dark/40 uppercase text-[10px] font-black tracking-widest border-b border-border-light/50">
                                    <th className="pb-4">{t('accessControl.resource')}</th>
                                    <th className="pb-4 px-4">{t('accessControl.read')}</th>
                                    <th className="pb-4 px-4">{t('accessControl.edit')}</th>
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
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <FaShieldAlt className="text-8xl" />
                    </div>
                    {isScanner ? (
                        <QRScanner
                            isDev
                            header={t('accessControl.scanHeader')}
                            onScan={(result) => {
                                const data = SiginQrData.getData(result);
                                if (data instanceof SiginQrData && user) {
                                    // Standard Scan Mode:
                                    // QR contains { request: { socketId: 'RequesterID', token: '...' } }
                                    // We send back { request: ..., response: ... }
                                    // Server forwards to data.request.socketId
                                    data.response = new ResponseData({
                                        socketId: id,
                                        token: crypto.randomUUID(),
                                        expiresAt: qrExpiresAt,
                                        user: {
                                            ...user,
                                            allows: [
                                                {
                                                    ...permissions,
                                                    user_id: user.user_id,
                                                    expiresAt: isExpiresAt ? expiresAt : undefined,
                                                },
                                            ],
                                        },
                                    });
                                    console.log(data);

                                    emit('signin-qr', data);
                                }
                            }}
                        />
                    ) : (
                        <QRGenerator
                            isDev
                            value={value}
                            refresh={getValue}
                            expiresAt={qrExpiresAt}
                            expiresMax={expiresMax}
                            header={t('accessControl.remoteAccessQR')}
                        />
                    )}
                </Paper>
            </div>
        </div>
    );
}
