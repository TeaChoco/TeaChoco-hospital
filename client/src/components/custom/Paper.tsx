//-Path: "TeaChoco-Hospital/src/components/custom/Paper.tsx"
import { useMemo } from 'react';

export default function Paper({
    variant,
    children,
    className,
}: {
    variant?: '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950';
    className?: string;
    children?: React.ReactNode;
}) {
    const variantClass = useMemo(() => {
        switch (variant) {
            case '50':
                return `bg-bg-paper-light-50 dark:bg-bg-paper-dark-50`;
            case '100':
                return 'bg-bg-paper-light-100 dark:bg-bg-paper-dark-100';
            case '200':
                return 'bg-bg-paper-light-200 dark:bg-bg-paper-dark-200';
            case '300':
                return 'bg-bg-paper-light-300 dark:bg-bg-paper-dark-300';
            case '400':
                return 'bg-bg-paper-light-400 dark:bg-bg-paper-dark-400';
            case '500':
                return 'bg-bg-paper-light-500 dark:bg-bg-paper-dark-500';
            case '600':
                return 'bg-bg-paper-light-600 dark:bg-bg-paper-dark-600';
            case '700':
                return 'bg-bg-paper-light-700 dark:bg-bg-paper-dark-700';
            case '800':
                return 'bg-bg-paper-light-800 dark:bg-bg-paper-dark-800';
            case '900':
                return 'bg-bg-paper-light-900 dark:bg-bg-paper-dark-900';
            case '950':
                return 'bg-bg-paper-light-950 dark:bg-bg-paper-dark-950';
            default:
                return 'bg-bg-paper-light-50 dark:bg-bg-paper-dark-50';
        }
    }, [variant]);

    return (
        <div
            className={`p-4 transition-all duration-200 ${variantClass} rounded-lg ${
                className || ''
            }`}>
            {children}
        </div>
    );
}
