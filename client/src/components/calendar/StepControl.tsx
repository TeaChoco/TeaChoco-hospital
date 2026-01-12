//-Path: "TeaChoco-Hospital/client/src/components/calendar/StepControl.tsx"
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

interface StepControlProps {
    min?: number;
    max?: number;
    step: number;
    unit?: string;
    title?: string;
    handleIn: () => void;
    handleOut: () => void;
    icon?: React.ReactNode;
    setStep?: (step: number) => void;
}

export const StepControl = ({
    min = 1,
    max = 1000000,
    icon,
    unit,
    step,
    title,
    setStep,
    handleIn,
    handleOut,
}: StepControlProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(step.toString());
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInputValue(step.toString());
    }, [step]);

    useEffect(() => {
        if (isEditing && inputRef.current) inputRef.current.focus();
    }, [isEditing]);

    const handleSubmit = () => {
        setIsEditing(false);
        const newValue = Number(inputValue);
        if (!isNaN(newValue) && newValue >= min && setStep) setStep(newValue);
        else setInputValue(step.toString());
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSubmit();
        else if (e.key === 'Escape') {
            setIsEditing(false);
            setInputValue(step.toString());
        }
    };

    return (
        <div
            title={title}
            className="flex items-center bg-bg-light dark:bg-bg-dark rounded-lg border border-border-light dark:border-border-dark overflow-hidden transition-colors duration-200">
            <button
                onClick={handleOut}
                disabled={step <= min}
                className={`btn p-2 ${step <= min ? 'btn-dis' : ''}`}>
                <FaMinus size={12} />
            </button>
            <div
                onClick={() => setStep && setIsEditing(true)}
                className={`px-3 py-1 border-x border-border-light dark:border-border-dark min-w-20 max-w-40 text-center bg-bg-card-light dark:bg-bg-card-dark flex items-center justify-center gap-2 transition-colors duration-200 ${
                    setStep ? 'cursor-text hover:bg-bg-light dark:hover:bg-bg-dark' : ''
                }`}>
                {icon}
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="number"
                        min={min}
                        max={max}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={handleSubmit}
                        onKeyDown={handleKeyDown}
                        className="w-12 bg-transparent text-center text-sm font-medium text-text-light dark:text-text-dark outline-none p-0 m-0 border-none no-arrow"
                    />
                ) : (
                    <span className="text-sm font-medium text-text-light dark:text-text-dark transition-colors duration-200">
                        {step}
                        {unit}
                    </span>
                )}
            </div>
            <button onClick={handleIn} className="btn p-2">
                <FaPlus size={12} />
            </button>
        </div>
    );
};
