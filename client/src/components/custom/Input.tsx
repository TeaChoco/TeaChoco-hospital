//-Path: "TeaChoco-Hospital/client/src/components/custom/Input.tsx"
import { useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    description?: string;
    icon?: React.ReactNode;
    button?: React.ReactNode;
    labelClassName?: string;
    containerClassName?: string;
}

export default function Input({
    id,
    icon,
    label,
    button,
    required,
    disabled,
    className,
    description,
    labelClassName,
    containerClassName,
    ...props
}: InputProps) {
    const generatedId = useId();
    const inputId = id || generatedId;
    const labelClass = `flex gap-2 text-sm font-bold tracking-tight ${
        disabled ? 'text-text-muted-light' : 'text-text-light'
    } dark:${disabled ? 'text-text-muted-dark' : 'text-text-dark'} mb-1 ml-1`;
    const inputClass = `w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-bg-card-light dark:bg-bg-card-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all duration-200 shadow-sm placeholder:text-text-muted-light/50 dark:placeholder:text-text-muted-dark/50 ${
        disabled ? 'text-text-muted-light' : 'text-text-light'
    } dark:${disabled ? 'text-text-muted-dark' : 'text-text-dark'}`;

    return (
        <div className={`flex flex-col gap-1.5 ${containerClassName || ''}`}>
            {label && (
                <label htmlFor={inputId} className={`${labelClass} ${labelClassName || ''}`}>
                    {icon}
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                <input
                    id={inputId}
                    required={required}
                    disabled={disabled}
                    placeholder={label}
                    className={`${inputClass} ${button ? 'pr-12' : ''} ${className || ''}`}
                    {...props}
                />
                {button && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors">
                        {button}
                    </div>
                )}
            </div>
            {description && (
                <div className="text-[11px] leading-tight text-text-muted-light dark:text-text-muted-dark ml-1 opacity-70">
                    {description}
                </div>
            )}
        </div>
    );
}
