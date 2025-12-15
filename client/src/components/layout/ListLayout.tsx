//-Path: "TeaChoco-Hospital/client/src/components/layout/ListLayout.tsx"
import Header from '../custom/Header';
import { useMemo, useState } from 'react';
import { FaPlus, FaSearch } from 'react-icons/fa';
import Search, { type FilterOption } from '../custom/Search';

export default function ListLayout<Data>({
    datas,
    header,
    filter,
    newData,
    children,
    description,
    placeholder,
    filterOptions,
}: {
    datas?: Data[];
    header: string;
    newData: string;
    description: string;
    placeholder?: string;
    filterOptions?: FilterOption[];
    children?: ((filteredDatas: Data[]) => React.ReactNode) | React.ReactNode;
    filter?: (data: Data, search: string, filters: Record<string, string[]>) => boolean | undefined;
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

    const handleFilterChange = (key: string, value: string) => {
        setActiveFilters((prev) => {
            const current = prev[key] || [];
            const next = current.includes(value)
                ? current.filter((v) => v !== value)
                : [...current, value];
            return { ...prev, [key]: next };
        });
    };

    const filteredDatas = useMemo(
        () => datas?.filter((data) => filter?.(data, searchTerm, activeFilters)) || [],
        [searchTerm, activeFilters],
    );

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <Header header={header} description={description} />
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 btn btn-secondary">
                        <FaPlus size={14} />
                        <span>{newData}</span>
                    </button>
                </div>
            </div>

            {placeholder && (
                <Search
                    value={searchTerm}
                    setValue={setSearchTerm}
                    placeholder={placeholder}
                    filterOptions={filterOptions}
                    activeFilters={activeFilters}
                    onFilterChange={handleFilterChange}
                />
            )}
            {typeof children !== 'function' ? (
                children
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {children(filteredDatas)}
                    </div>
                    {filteredDatas.length === 0 && (
                        <div className="text-center py-12">
                            <div className="bg-slate-50 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaSearch className="text-slate-300 dark:text-slate-600 text-xl" />
                            </div>
                            <h3 className="text-text-light dark:text-text-dark font-medium mb-1">
                                No found "{searchTerm}"
                            </h3>
                            <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                                Try adjusting your search terms
                            </p>
                        </div>
                    )}
                </>
            )}
        </>
    );
}
