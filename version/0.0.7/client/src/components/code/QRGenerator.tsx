//-Path: "TeaChoco-Hospital/client/src/components/code/QRGenerator.tsx"
import Select from '../custom/Select';
import { QRCodeSVG } from 'qrcode.react';
import Activity from '../custom/Activity';
import { useEffect, useRef, useState } from 'react';
import { FaClock, FaRedo, FaExclamationTriangle } from 'react-icons/fa';

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
    expiresAt,
    expiresMax,
    description,
}: {
    value?: string;
    header: string;
    isDev?: boolean;
    expiresAt?: Date;
    expiresMax?: number;
    refresh?: () => void;
    description?: string;
}) {
    const [level, setLevel] = useState<Level>(Level.M);
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

    const initialTimeRef = useRef<number | null>(expiresMax ?? null);

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
            initialTimeRef.current = null;
            setExpiresTime(null);
        }
    }, [expiresAt, expiresMax]);

    return (
        <>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
                {header}
            </h3>

            <div className="flex justify-center mb-4">
                {value ? (
                    <div className="p-4 border-2 border-dashed bg-white border-gray-300 dark:border-gray-700 rounded-lg">
                        <QRCodeSVG size={250} value={value} level={level} />
                    </div>
                ) : (
                    <div className="w-52 h-52 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400">Generating QR...</span>
                    </div>
                )}
            </div>

            <Activity visible={expiresAt !== undefined}>
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
                                    {!expiresTime || expiresTime <= 0
                                        ? 'หมดอายุแล้ว'
                                        : 'จะหมดอายุใน'}
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

                        <Activity visible={Boolean(refresh)}>
                            <button
                                onClick={refresh}
                                className={`p-2 rounded-lg transition-all hover:scale-110 active:scale-95 ${
                                    !expiresTime || expiresTime <= 0
                                        ? 'bg-red-500/20 hover:bg-red-500 hover:text-white'
                                        : 'bg-primary/20 hover:bg-primary hover:text-white'
                                }`}
                                title="Refresh Token">
                                <FaRedo className={!value ? 'animate-spin' : ''} />
                            </button>
                        </Activity>
                    </div>
                </div>
            </Activity>

            <div className="space-y-4">
                <Activity visible={refresh && expiresAt === undefined}>
                    <button className="btn w-full btn-warning" onClick={refresh}>
                        Refresh
                    </button>
                </Activity>

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
        </>
    );
}
