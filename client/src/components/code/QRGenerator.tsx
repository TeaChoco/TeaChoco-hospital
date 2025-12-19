//-Path: "TeaChoco-Hospital/client/src/components/auth/QRGenerator.tsx"
import { useState } from 'react';
import Select from '../custom/Select';
import { QRCodeSVG } from 'qrcode.react';
import Activity from '../custom/Activity';

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
    description,
}: {
    value?: string;
    header: string;
    refresh?: () => void;
    description?: string;
}) {
    const [level, setLevel] = useState<Level>(Level.M);

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
