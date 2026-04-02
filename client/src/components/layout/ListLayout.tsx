// -Path: "TeaChoco-Hospital/client/src/components/layout/ListLayout.tsx"
import Header from '../custom/Header';
import Search from '../custom/Search';
import Activity from '../custom/Activity';
import { useMemo, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import type { Resource } from '../../types/auth';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import type { FilterOption } from '../custom/Search';

const NewButton = ({
    to,
    visible,
    children,
}: {
    to: string;
    visible?: boolean;
    children: React.ReactNode;
}) => (
    <Activity visible={visible}>
        <Link to={to} className="flex items-center gap-2 btn btn-secondary">
            <FaPlus size={14} />
            <span>{children}</span>
        </Link>
    </Activity>
);

export default function ListLayout<Data>({
    datas,
    header,
    filter,
    buttons,
    newData,
    resource,
    children,
    Skeleton,
    description,
    placeholder,
    isGrid = true,
    filterOptions,
    skeletonCount = 8,
}: {
    datas?: Data[];
    header: string;
    isGrid?: boolean;
    newData?: string;
    resource: Resource;
    description: string;
    placeholder?: string;
    skeletonCount?: number;
    Skeleton: () => React.JSX.Element;
    filterOptions?: FilterOption[];
    buttons?: (Button: typeof NewButton) => React.ReactNode;
    children?: ((filteredDatas: Data[]) => React.ReactNode) | React.ReactNode;
    filter?: (data: Data, search: string, filters: Record<string, string[]>) => boolean | undefined;
}) {
    const { user } = useAuth();
    const { t } = useTranslation();
    const location = useLocation();
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
        [datas, searchTerm, activeFilters],
    );

    const canAdd = user?.allows?.some((allow) => allow[resource as Resource]?.edit);

    const skeletons = Array.from({ length: skeletonCount }).map((_, index) => (
        <Skeleton key={index} />
    ));

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300">
                <Header header={header} description={description} />
                <div className="flex gap-2 flex-wrap">
                    <NewButton
                        to={`${location.pathname}/edit/new`}
                        visible={canAdd && Boolean(newData)}>
                        {newData}
                    </NewButton>
                    {buttons?.(NewButton)}
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

            {!datas ? (
                <div
                    className={
                        isGrid
                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                            : ''
                    }>
                    {skeletons}
                </div>
            ) : (
                <>
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
                                        {t('listLayout.noResultsFound', { searchTerm })}
                                    </h3>
                                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                                        {t('listLayout.tryAdjustingSearch')}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
}
