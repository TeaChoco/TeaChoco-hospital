//-Path: "TeaChoco-Hospital/client/src/components/custom/Editor.tsx"
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import MonacoEditor from '@monaco-editor/react';
import { darkModeAtom } from '../../context/themeAtom';
import { FaTriangleExclamation, FaXmark } from 'react-icons/fa6';

export default function Editor<Data>({
    data,
    setData,
    onError,
    readOnly,
}: {
    data: Data;
    readOnly?: boolean;
    setData?: (data: Data) => void;
    onError?: (error: Error) => void;
}) {
    const darkMode = useAtomValue(darkModeAtom);
    const [syntaxError, setSyntaxError] = useState<string | null>(null);

    return (
        <div className="relative border border-border-light dark:border-border-dark rounded-xl h-[70vh] overflow-hidden group">
            <MonacoEditor
                height="100%"
                defaultLanguage="json"
                theme={darkMode ? 'vs-dark' : 'light'}
                value={JSON.stringify(data, null, 4)}
                onChange={(value) => {
                    try {
                        const parsed = JSON.parse(value || '{}');
                        setData?.(parsed);
                        setSyntaxError(null);
                    } catch (error) {
                        if (error instanceof Error) {
                            setSyntaxError(error.message);
                            onError?.(error);
                        }
                    }
                }}
                options={{
                    readOnly,
                    fontSize: 14,
                    automaticLayout: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    padding: { top: 16, bottom: 16 },
                }}
            />

            {/* Premium Syntax Error Indicator */}
            {syntaxError && (
                <div className="absolute bottom-0 left-0 right-0 animate-in slide-in-from-bottom-full duration-300">
                    <div className="mx-4 mb-4 p-3 bg-red-500/10 backdrop-blur-md border border-red-500/30 rounded-xl flex items-center gap-3 shadow-lg shadow-red-500/10">
                        <div className="shrink-0 text-red-500 animate-pulse">
                            <FaTriangleExclamation size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-black text-red-600 dark:text-red-400 uppercase tracking-widest mb-0.5">
                                Syntax Configuration Error
                            </p>
                            <p className="text-xs font-medium text-red-500/80 truncate italic">
                                {syntaxError}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setSyntaxError(null)}
                            className="p-2 hover:bg-red-500/10 rounded-xl transition-colors text-red-500/50 hover:text-red-500">
                            <FaXmark size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
