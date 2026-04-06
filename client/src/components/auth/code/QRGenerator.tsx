//-Path: "TeaChoco-Hospital/client/src/components/code/QRGenerator.tsx"
import Select from '../../custom/Select';
import { QRCodeSVG } from 'qrcode.react';
import Activity from '../../custom/Activity';
import { isDev } from '../../../configs/env';
import { useCallback, useEffect, useRef, useState } from 'react';
import { expiresMaxQrCode, useSigninQrStore } from '../../../store/useSigninQrStore';
import { FaClock, FaRedo, FaExclamationTriangle, FaLock, FaEyeSlash, FaEye } from 'react-icons/fa';

export enum Level {
    L = 'L',
    M = 'M',
    Q = 'Q',
    H = 'H',
}

export default function QRGenerator({
    value,
    header,
    newValue,
    description,
}: {
    value?: string;
    header: string;
    newValue: () => void;
    description?: string;
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [level, setLevel] = useState<Level>(Level.M);
    const initialTimeRef = useRef<number>(expiresMaxQrCode);
    const { qrExpiresAt, resetQrExpiresAt } = useSigninQrStore();
    const [expiresTime, setExpiresTime] = useState<number | null>(null);

    const getLabel = (level: Level) => {
        switch (level) {
            case Level.L:
                return 'Low';
            case Level.M:
                return 'Medium';
            case Level.Q:
                return 'Quality';
            case Level.H:
                return 'High';
        }
    };

    useEffect(() => {
        if (qrExpiresAt) {
            const setTime = () => {
                const timeLeft = qrExpiresAt.getTime() - Date.now();
                if (initialTimeRef.current === null || timeLeft > initialTimeRef.current)
                    initialTimeRef.current = timeLeft;
                setExpiresTime(timeLeft);
            };
            setTime();
            const interval = setInterval(setTime, 1000);
            return () => clearInterval(interval);
        } else {
            initialTimeRef.current = expiresMaxQrCode;
            setExpiresTime(expiresMaxQrCode);
        }
    }, [qrExpiresAt]);

    const refresh = useCallback(() => {
        newValue();
        resetQrExpiresAt();
    }, [newValue]);

    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-black text-text-light dark:text-text-dark text-center tracking-tight">
                {header}
            </h3>

            <div className="flex justify-center mb-6">
                {value ? (
                    <div className="relative group p-4 border-2 border-dashed bg-white backdrop-blur-sm border-primary/20 rounded-lg transition-all duration-500 hover:border-primary/40 shadow-xl shadow-primary/5">
                        {/* QR Code with Dynamic Visibility */}
                        <div
                            className={`transition-all duration-700 ease-in-out ${
                                !isVisible
                                    ? 'blur-3xl scale-90 opacity-10'
                                    : 'blur-0 scale-100 opacity-100'
                            }`}>
                            <QRCodeSVG size={220} value={value} level={level} />
                        </div>

                        {/* Hidden State Overlay */}
                        {!isVisible && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in duration-500">
                                <div className="bg-primary/20 p-5 rounded-full text-primary animate-pulse">
                                    <FaLock className="text-3xl" />
                                </div>
                                <p className="text-[10px] uppercase font-black tracking-widest text-primary/60">
                                    QR Code Hidden
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-[280px] h-[300px] bg-background-light2 dark:bg-background-dark2 rounded-lg flex flex-col items-center justify-center gap-4 border-2 border-dashed border-border-light shadow-inner">
                        <p className="text-sm font-bold text-text-light/30 dark:text-text-dark/30 animate-pulse">
                            Initializing Secure QR...
                        </p>
                    </div>
                )}
            </div>

            <div
                className={`relative overflow-hidden mb-6 p-4 rounded-xl border transition-all duration-300 ${
                    !expiresTime || expiresTime <= 0
                        ? 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400'
                        : expiresTime < 30000
                          ? 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400 animate-pulse'
                          : 'bg-primary/10 border-primary/20 text-primary-dark dark:text-primary-light'
                }`}>
                {/* Progress Bar Background */}
                <div className="absolute bottom-0 left-0 h-1 bg-current opacity-20 w-full" />
                {/* Progress Bar Fill */}
                <div
                    className="absolute bottom-0 left-0 h-1 bg-current transition-all duration-200 ease-linear"
                    style={{
                        width: `${Math.max(
                            0,
                            Math.min(
                                100,
                                expiresTime && initialTimeRef.current
                                    ? (expiresTime / initialTimeRef.current) * 100
                                    : 0,
                            ),
                        )}%`,
                    }}
                />

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div
                            className={`p-2 rounded-lg ${
                                !expiresTime || expiresTime <= 0
                                    ? 'bg-red-500 text-white'
                                    : expiresTime < 30000
                                      ? 'bg-amber-500 text-white'
                                      : 'bg-primary text-white'
                            }`}>
                            {!expiresTime || expiresTime <= 0 ? (
                                <FaExclamationTriangle />
                            ) : (
                                <FaClock
                                    className={expiresTime < 30000 ? 'animate-spin-slow' : ''}
                                />
                            )}
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider opacity-70">
                                {!expiresTime || expiresTime <= 0 ? 'หมดอายุแล้ว' : 'จะหมดอายุใน'}
                            </p>
                            <p className="text-xl font-bold font-mono">
                                {(() => {
                                    if (!expiresTime || expiresTime <= 0) return '00:00';
                                    const totalSeconds = Math.floor(expiresTime / 1000);
                                    const minutes = Math.floor(totalSeconds / 60);
                                    const seconds = totalSeconds % 60;
                                    return `${minutes.toString().padStart(2, '0')}:${seconds
                                        .toString()
                                        .padStart(2, '0')}`;
                                })()}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Visibility Toggle Button */}
                        <button
                            onClick={() => setIsVisible(!isVisible)}
                            className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 shadow-xl ${
                                isVisible
                                    ? 'bg-secondary/10 text-secondary hover:bg-secondary hover:text-white'
                                    : 'bg-primary text-white scale-105'
                            }`}
                            title={isVisible ? 'Hide QR Code' : 'Show QR Code'}>
                            {isVisible ? (
                                <FaEyeSlash className="text-xl" />
                            ) : (
                                <FaEye className="text-xl" />
                            )}
                        </button>
                        <button
                            onClick={refresh}
                            className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 shadow-xl ${
                                !expiresTime || expiresTime <= 0
                                    ? 'bg-red-500/20 hover:bg-red-500 hover:text-white'
                                    : 'bg-primary/20 hover:bg-primary hover:text-white'
                            }`}
                            title="Refresh Token">
                            <FaRedo className={!value ? 'animate-spin' : ''} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <Select
                    value={level}
                    onChange={(event) => setLevel(event.target.value as Level)}
                    options={Object.values(Level).map((level) => ({
                        value: level,
                        label: getLabel(level),
                    }))}
                />
            </div>

            <Activity visible={description}>
                <div className="mt-4 p-3 bg-primary rounded-lg">
                    <p className="text-sm text-white text-center">{description}</p>
                </div>
            </Activity>

            <Activity visible={isDev}>
                <div className="mt-3 text-xs text-gray-500 text-center">{value}</div>
            </Activity>
        </div>
    );
}
