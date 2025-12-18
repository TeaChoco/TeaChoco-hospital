//-Path: "TeaChoco-Hospital/client/src/components/custom/Select.tsx"
import { useId } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    labelClassName?: string;
    containerClassName?: string;
    options?: { value: string | number; label: string }[];
}

export default function Select({
    id,
    label,
    children,
    className,
    labelClassName,
    containerClassName,
    ...props
}: SelectProps) {
    const generatedId = useId();
    const selectId = id || generatedId;
    const labelClass = 'block text-sm font-medium text-text-light dark:text-text-dark mb-1';
    const inputClass =
        'w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-bg-card-light dark:bg-bg-card-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm appearance-none cursor-pointer';

    return (
        <div className={containerClassName}>
            {label && (
                <label htmlFor={selectId} className={`${labelClass} ${labelClassName || ''}`}>
                    {label}
                </label>
            )}
            <div className="relative">
                <select id={selectId} className={`${inputClass} ${className || ''}`} {...props}>
                    {children}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-text-muted-light dark:text-text-muted-dark">
                    <FaChevronDown className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
}
