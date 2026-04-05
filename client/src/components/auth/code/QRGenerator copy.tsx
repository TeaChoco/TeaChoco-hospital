//-Path: "TeaChoco-Hospital/client/src/components/code/QRGenerator.tsx"
import Select from '../../custom/Select';
import { QRCodeSVG } from 'qrcode.react';
import Activity from '../../custom/Activity';
import { useEffect, useRef, useState } from 'react';
import { expiresMaxQrCode } from '../../../store/useSigninQrStore';
import { FaClock, FaRedo, FaExclamationTriangle, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';

export enum Level {
    L = 'L',
    M = 'M',
    Q = 'Q',
    H = 'H',
}

export default function QRGenerator({
    isDev,
    value,
    header,
    refresh,
    description,
}: {
    value?: string;
    header: string;
    isDev?: boolean;
    refresh: () => void;
    description?: string;
}) {
    const [level, setLevel] = useState<Level>(Level.M);
    const [isVisible, setIsVisible] = useState(true);
    const [expiresAt, setExpiresAt] = useState<Date>(new Date());
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

    const initialTimeRef = useRef<number>(expiresMaxQrCode);

    useEffect(() => {
        if (expiresAt) {
            const setTime = () => {
                const timeLeft = expiresAt.getTime() - Date.now();
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
    }, [expiresAt]);

    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-black text-text-light dark:text-text-dark text-center tracking-tight">
                {header}
            </h3>

            <div className="flex justify-center my-6">
                {value ? (
                    <div className="relative group p-6 border-2 border-dashed bg-white/50 backdrop-blur-sm border-primary/20 rounded-[2.5rem] transition-all duration-500 hover:border-primary/40 shadow-xl shadow-primary/5">
                        {/* QR Code with Dynamic Visibility */}
                        <div
                            className={`transition-all duration-700 ease-in-out ${
                                !isVisible ? 'blur-3xl scale-90 opacity-10' : 'blur-0 scale-100 opacity-100'
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

                        {/* Visibility Toggle Button */}
                        <button
                            onClick={() => setIsVisible(!isVisible)}
                            className={`absolute bottom-4 right-4 p-4 rounded-3xl transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-2xl z-20 ${
                                isVisible
                                    ? 'bg-secondary text-white hover:bg-secondary-dark ring-4 ring-secondary/20'
                                    : 'bg-primary text-white hover:bg-primary-dark ring-4 ring-primary/20'
                            }`}
                            title={isVisible ? 'Hide QR Code' : 'Show QR Code'}>
                            {isVisible ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
                        </button>
                    </div>
                ) : (
                    <div className="w-[280px] h-[300px] bg-background-light2 dark:bg-background-dark2 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 border-2 border-dashed border-border-light shadow-inner">
                        <Activity visible={true}>
                            <p className="text-sm font-bold text-text-light/30 dark:text-text-dark/30 animate-pulse">
                                Initializing Secure QR...
                            </p>
                        </Activity>
                    </div>
                )}
            </div>

            <Activity visible={expiresAt !== undefined}>
                <div
                    className={`relative overflow-hidden mb-6 p-5 rounded-3xl border transition-all duration-500 shadow-lg ${
                        !expiresTime || expiresTime <= 0
                            ? 'bg-red-500/10 border-red-500/30 text-red-600'
                            : expiresTime < 30000
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 animate-pulse'
                              : 'bg-primary/10 border-primary/30 text-primary bg-gradient-to-r from-primary/5 to-transparent'
                    }`}>
                    {/* Progress Bar Background */}
                    <div className="absolute bottom-0 left-0 h-1.5 bg-current opacity-10 w-full" />
                    {/* Progress Bar Fill */}
                    <div
                        className="absolute bottom-0 left-0 h-1.5 bg-current transition-all duration-200 ease-linear rounded-full"
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
                        <div className="flex items-center gap-4">
                            <div
                                className={`p-3 rounded-2xl shadow-lg transition-transform duration-500 hover:rotate-12 ${
                                    !expiresTime || expiresTime <= 0
                                        ? 'bg-red-500 text-white shadow-red-500/30'
                                        : expiresTime < 30000
                                          ? 'bg-amber-500 text-white shadow-amber-500/30'
                                          : 'bg-primary text-white shadow-primary/30'
                                }`}>
                                {!expiresTime || expiresTime <= 0 ? (
                                    <FaExclamationTriangle className="text-lg" />
                                ) : (
                                    <FaClock
                                        className={`text-lg ${expiresTime < 30000 ? 'animate-spin-slow' : ''}`}
                                    />
                                )}
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                                    {!expiresTime || expiresTime <= 0
                                        ? 'Expired'
                                        : 'Time Remaining'}
                                </p>
                                <p className="text-2xl font-black font-mono tracking-tight">
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

                        <button
                            onClick={() => {
                                refresh();
                                setExpiresAt(new Date(Date.now() + expiresMaxQrCode));
                            }}
                            className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-300 hover:scale-110 active:scale-90 shadow-xl ${
                                !expiresTime || expiresTime <= 0
                                    ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white'
                                    : 'bg-primary/20 text-primary hover:bg-primary hover:text-white'
                            }`}
                            title="Refresh Token">
                            <FaRedo className={`text-xl ${!value ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>
            </Activity>

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
                <div className="mt-8 p-4 bg-gradient-to-br from-primary to-primary-dark rounded-[2rem] shadow-xl shadow-primary/20 transform hover:-translate-y-1 transition-transform">
                    <p className="text-sm font-bold text-white text-center leading-relaxed">
                        {description}
                    </p>
                </div>
            </Activity>

            <Activity visible={isDev}>
                <div className="mt-6 p-4 bg-background-light2 dark:bg-background-dark2 rounded-2xl border border-border-light border-dashed">
                    <p className="text-[10px] font-black uppercase text-text-light/30 dark:text-text-dark/30 mb-2 truncate">
                        Developer Value Reference
                    </p>
                    <div className="text-[10px] font-mono text-primary break-all line-clamp-2">
                        {value}
                    </div>
                </div>
            </Activity>
        </div>
    );
}
