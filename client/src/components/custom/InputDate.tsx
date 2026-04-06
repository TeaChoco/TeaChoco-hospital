// -Path: "TeaChoco-Hospital/client/src/components/custom/InputDate.tsx"
import Input, { type InputProps } from './Input';

export type InputDateProps = Omit<InputProps, 'type' | 'value'> & {
    value?: Date;
    setValue?: (value?: Date) => void;
};

export default function InputDate(props: InputDateProps) {
    const { value, setValue, onChange, className, ...rest } = props;

    /**
     * @param {Date | undefined} date
     * @returns {string}
     */
    const formatDate = (date: Date | undefined) => {
        if (!date) return '';
        const d = new Date(date);
        return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
    };

    return (
        <Input
            type="date"
            value={formatDate(value)}
            className={`no-clear ${className || ''}`}
            onChange={(event) => {
                const { value } = event.target;
                const date = value ? new Date(value) : undefined;
                onChange?.(event);
                setValue?.(date);
            }}
            {...rest}
        />
    );
}
