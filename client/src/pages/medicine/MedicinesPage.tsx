//-Path: "TeaChoco-Hospital/client/src/pages/medicine/MedicinesPage.tsx"
import { Resource } from '../../types/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ListLayout from '../../components/layout/ListLayout';
import { useMedicines } from '../../store/useMedicineStore';
import { MedicineCard } from '../../components/content/MedicineCard';
import { FaTable, FaThLarge, FaPills, FaChevronRight } from 'react-icons/fa';
import { MedicineCardSkeleton } from '../../components/content/MedicineCardSkeleton';
import { useState } from 'react';

type ViewType = 'grid' | 'table';

export default function MedicinesPage() {
    const { t } = useTranslation();
    const navigator = useNavigate();
    const { medicines } = useMedicines();
    const [viewType, setViewType] = useState<ViewType>('grid');

    return (
        <ListLayout
            resource={Resource.MEDICINES}
            datas={medicines}
            Skeleton={MedicineCardSkeleton}
            newData={t('medicines.new')}
            header={t('medicines.header')}
            placeholder={t('medicines.placeholder')}
            description={t('medicines.description')}
            isGrid={viewType === 'grid'}
            buttons={() => (
                <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl border border-border-light dark:border-border-dark shadow-xs">
                    <button
                        onClick={() => setViewType('grid')}
                        className={`p-2 rounded-lg transition-all ${
                            viewType === 'grid'
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-text-muted-light hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}>
                        <FaThLarge size={14} />
                    </button>
                    <button
                        onClick={() => setViewType('table')}
                        className={`p-2 rounded-lg transition-all ${
                            viewType === 'table'
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-text-muted-light hover:bg-slate-50 dark:hover:bg-slate-700'
                        }`}>
                        <FaTable size={14} />
                    </button>
                </div>
            )}
            filter={(med, search) =>
                med.name.toLowerCase().includes(search.toLowerCase()) ||
                med.genericName?.toLowerCase().includes(search.toLowerCase())
            }>
            {(filteredDatas) =>
                viewType === 'grid' ? (
                    filteredDatas.map((med) => (
                        <MedicineCard
                            key={med._id}
                            medicine={med}
                            onClick={() => navigator(`/medicines/${med._id}`)}
                        />
                    ))
                ) : (
                    <div className="col-span-full overflow-hidden rounded-3xl border border-border-light dark:border-border-dark bg-white dark:bg-slate-900 shadow-xl shadow-primary/5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-border-light dark:border-border-dark">
                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted-light">
                                            {t('medicines.tableName')}
                                        </th>
                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted-light">
                                            {t('medicines.tableBrand')}
                                        </th>
                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted-light">
                                            {t('medicines.tableDosage')}
                                        </th>
                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted-light">
                                            {t('medicines.tableFrequency')}
                                        </th>
                                        <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted-light text-center">
                                            {t('medicines.tableStatus')}
                                        </th>
                                        <th className="px-6 py-5 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                                    {filteredDatas.map((med) => (
                                        <tr
                                            key={med._id}
                                            onClick={() => navigator(`/medicines/${med._id}`)}
                                            className="group hover:bg-primary/2 dark:hover:bg-primary/5 cursor-pointer transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-primary/5 dark:bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                                                        <FaPills size={16} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-text-light dark:text-text-dark tracking-tight">
                                                            {med.name}
                                                        </p>
                                                        <p className="text-[10px] text-text-muted-light italic">
                                                            {med.genericName}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-text-muted-light">
                                                    {med.brand || '-'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-baseline gap-1">
                                                    <span className="font-black text-text-light dark:text-text-dark">
                                                        {med.dosage.quantity}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-text-muted-light uppercase">
                                                        {med.dosage.unit}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-text-light dark:text-text-dark">
                                                {med.dosage.frequencyPerDay}x{' '}
                                                {t('medicines.dosesDaily')}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span
                                                    className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                        med.isActive
                                                            ? 'bg-emerald-500/10 text-emerald-600'
                                                            : 'bg-slate-500/10 text-slate-500'
                                                    }`}>
                                                    {med.isActive
                                                        ? t('medicines.active')
                                                        : t('medicines.inactive')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <FaChevronRight
                                                    className="text-text-muted-light opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                                                    size={12}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
        </ListLayout>
    );
}
