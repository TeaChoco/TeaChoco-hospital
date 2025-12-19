//-Path: "TeaChoco-Hospital/client/src/components/auth/QRGenerator.tsx"
import Paper from '../custom/Paper';
import { QRCodeSVG } from 'qrcode.react';
import { useTheme } from '../../hooks/useTheme';
import { useSocket } from '../../hooks/useSocket';

export default function QRGenerator() {
    const { id } = useSocket();
    const { theme } = useTheme();

    return (
        <Paper variant="200" className="w-full max-w-sm mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
                Scan to Login
            </h3>

            <div className="flex justify-center mb-4">
                {id ? (
                    <Paper
                        variant="50"
                        className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                        <QRCodeSVG
                            level="H"
                            size={250}
                            value={id}
                            bgColor="transparent"
                            fgColor={theme === 'dark' ? 'white' : 'black'}
                        />
                    </Paper>
                ) : (
                    <div className="w-52 h-52 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400">Generating QR...</span>
                    </div>
                )}
            </div>

            <div className="mt-4 p-3 bg-primary rounded-lg">
                <p className="text-sm text-white text-center">
                    Use your mobile app to scan this QR code for quick login
                </p>
            </div>

            <div className="mt-3 text-xs text-gray-500 text-center">
                <p>Socket ID: {id}</p>
            </div>
        </Paper>
    );
}
