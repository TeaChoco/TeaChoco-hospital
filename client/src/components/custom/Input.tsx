//-Path: "TeaChoco-Hospital/client/src/components/custom/Input.tsx"
import { useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    description?: string;
    labelClassName?: string;
    containerClassName?: string;
}

export default function Input({
    id,
    label,
    className,
    description,
    labelClassName,
    containerClassName,
    ...props
}: InputProps) {
    const generatedId = useId();
    const inputId = id || generatedId;
    const labelClass =
        'block text-sm font-bold tracking-tight text-text-light dark:text-text-dark mb-1 ml-1';
    const inputClass =
        'w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-bg-card-light dark:bg-bg-card-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm placeholder:text-text-muted-light/50 dark:placeholder:text-text-muted-dark/50';

    return (
        <div className={`flex flex-col gap-1.5 ${containerClassName || ''}`}>
            {label && (
                <label htmlFor={inputId} className={`${labelClass} ${labelClassName || ''}`}>
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    id={inputId}
                    placeholder={label}
                    className={`${inputClass} ${className || ''}`}
                    {...props}
                />
            </div>
            {description && (
                <div className="text-[11px] leading-tight text-text-muted-light dark:text-text-muted-dark ml-1 opacity-70">
                    {description}
                </div>
            )}
        </div>
    );
}
