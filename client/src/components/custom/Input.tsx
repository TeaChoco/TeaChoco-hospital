//-Path: "TeaChoco-Hospital/client/src/components/custom/Input.tsx"
import { useId } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelClassName?: string;
    containerClassName?: string;
}

export default function Input({
    id,
    label,
    className,
    labelClassName,
    containerClassName,
    ...props
}: InputProps) {
    const generatedId = useId();
    const inputId = id || generatedId;
    const labelClass = 'block text-sm font-medium text-text-light dark:text-text-dark mb-1';
    const inputClass =
        'w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-bg-card-light dark:bg-bg-card-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark';

    return (
        <div className={containerClassName}>
            {label && (
                <label htmlFor={inputId} className={`${labelClass} ${labelClassName || ''}`}>
                    {label}
                </label>
            )}
            <input id={inputId} className={`${inputClass} ${className || ''}`} {...props} />
        </div>
    );
}
