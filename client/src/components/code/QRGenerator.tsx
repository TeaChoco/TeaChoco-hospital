//-Path: "TeaChoco-Hospital/client/src/components/auth/QRGenerator.tsx"
import Select from '../custom/Select';
import { QRCodeSVG } from 'qrcode.react';
import Activity from '../custom/Activity';
import { useEffect, useState } from 'react';

export enum Level {
    L = 'L',
    M = 'M',
    Q = 'Q',
    H = 'H',
}

export default function QRGenerator({
    value,
    header,
    refresh,
    expiresAt,
    description,
}: {
    value?: string;
    header: string;
    expiresAt?: Date;
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

    useEffect(() => {
        if (expiresAt) {
            const setTime = () => {
                const timeLeft = expiresAt.getTime() - Date.now();
                setExpiresTime(timeLeft);
            };
            setTime();
            const interval = setInterval(setTime, 1000);
            return () => clearInterval(interval);
        }
    }, [expiresAt]);

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
                <div className="flex items-center gap-2 justify-center mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        หมดอายุใน:
                    </p>
                    <p className="text-green-700 dark:text-green-300 font-mono text-sm break-all">
                        {(() => {
                            if (!expiresTime || expiresTime <= 0) return '--:--';
                            const totalSeconds = Math.floor(expiresTime / 1000);
                            const minutes = Math.floor(totalSeconds / 60);
                            const seconds = totalSeconds % 60;
                            return `${minutes.toString().padStart(2, '0')}:${seconds
                                .toString()
                                .padStart(2, '0')}`;
                        })()}
                    </p>
                </div>
            </Activity>

            <Select
                value={level}
                onChange={(event) => setLevel(event.target.value as Level)}
                options={Object.values(Level).map((level) => ({
                    value: level,
                    label: getLabel(level),
                }))}
            />

            <Activity visible={Boolean(refresh)}>
                <button className="btn btn-warning" onClick={refresh}>
                    Refresh
                </button>
            </Activity>

            <Activity visible={description}>
                <div className="mt-4 p-3 bg-primary rounded-lg">
                    <p className="text-sm text-white text-center">{description}</p>
                </div>
            </Activity>

            <div className="mt-3 text-xs text-gray-500 text-center">
                <p>Value: {value}</p>
            </div>
        </>
    );
}
