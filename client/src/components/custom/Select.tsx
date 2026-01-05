//-Path: "TeaChoco-Hospital/client/src/components/custom/Select.tsx"
import { useId } from 'react';
import { FaChevronDown } from 'react-icons/fa6';

interface SelectOptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
    icon?: React.ReactNode;
}

function SelectOption({ icon, className, ...props }: SelectOptionProps) {
    return (
        <option
            className={`${
                className || ''
            } text-text-light dark:text-text-dark bg-bg-card-light dark:bg-bg-card-dark rounded-xl flex gap-2`}
            {...props}>
            {icon}
            {props.children}
        </option>
    );
}

export interface SelectProps
    extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
    label?: string;
    icon?: React.ReactNode;
    labelClassName?: string;
    containerClassName?: string;
    options?: { value: string | number; label: string }[];
    children?: (
        option: typeof SelectOption,
        options?: { value: string | number; label: string }[],
    ) => React.ReactNode;
}

export default function Select({
    id,
    icon,
    label,
    options,
    required,
    children,
    className,
    labelClassName,
    containerClassName,
    ...props
}: SelectProps) {
    const generatedId = useId();
    const selectId = id || generatedId;
    const labelClass = 'flex gap-2 text-sm font-medium text-text-light dark:text-text-dark mb-1';
    const inputClass =
        'w-full px-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-bg-card-light dark:bg-bg-card-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm appearance-none cursor-pointer';

    return (
        <div className={containerClassName}>
            {label && (
                <label htmlFor={selectId} className={`${labelClass} ${labelClassName || ''}`}>
                    {icon}
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                <select
                    id={selectId}
                    required={required}
                    className={`${inputClass} ${className || ''}`}
                    {...props}>
                    {children?.(SelectOption, options) ||
                        options?.map((option) => <SelectOption key={option.value} {...option} />)}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-text-muted-light dark:text-text-muted-dark">
                    <FaChevronDown className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
}
