//-Path: "TeaChoco-Hospital/client/src/components/custom/Search.tsx"
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { FaFilter, FaSearch, FaCheck } from 'react-icons/fa';

export interface FilterOption {
    key: string;
    label: string;
    options: { value: string; label: string }[];
}

export default function Search({
    value,
    setValue,
    placeholder,
    filterOptions,
    activeFilters = {},
    onFilterChange,
}: {
    value: string;
    placeholder?: string;
    filterOptions?: FilterOption[];
    activeFilters?: Record<string, string[]>;
    onFilterChange?: (key: string, value: string) => void;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node))
                setIsOpen(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const hasActiveFilters = Object.values(activeFilters).some((v) => v.length > 0);

    return (
        <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark" />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-bg-card-light dark:bg-bg-card-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                />
            </div>
            {filterOptions && filterOptions.length > 0 && (
                <div className="relative" ref={filterRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`h-full flex items-center gap-2 px-4 py-2 border rounded-xl transition-colors ${
                            isOpen || hasActiveFilters
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border-light dark:border-border-dark bg-bg-card-light dark:bg-bg-card-dark hover:bg-bg-card-hover-light dark:hover:bg-bg-card-hover-dark text-text-secondary-light dark:text-text-secondary-dark'
                        }`}>
                        <FaFilter size={14} />
                        <span>{t('common.filter')}</span>
                        {hasActiveFilters && (
                            <span className="ml-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {Object.values(activeFilters).flat().length}
                            </span>
                        )}
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 top-full mt-2 w-72 bg-bg-card-light dark:bg-bg-card-dark rounded-xl shadow-xl border border-border-light dark:border-border-dark z-50 overflow-hidden">
                            <div className="p-4 space-y-4">
                                {filterOptions.map((group) => (
                                    <div key={group.key}>
                                        <h4 className="font-semibold text-text-light dark:text-text-dark mb-2 text-sm">
                                            {group.label}
                                        </h4>
                                        <div className="space-y-1">
                                            {group.options.map((option) => {
                                                const isSelected = activeFilters[
                                                    group.key
                                                ]?.includes(option.value);
                                                return (
                                                    <button
                                                        key={option.value}
                                                        onClick={() =>
                                                            onFilterChange?.(
                                                                group.key,
                                                                option.value,
                                                            )
                                                        }
                                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                                                            isSelected
                                                                ? 'bg-primary/10 text-primary'
                                                                : 'text-text-muted-light dark:text-text-muted-dark hover:bg-slate-50 dark:hover:bg-slate-800'
                                                        }`}>
                                                        <span>{option.label}</span>
                                                        {isSelected && <FaCheck size={12} />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
