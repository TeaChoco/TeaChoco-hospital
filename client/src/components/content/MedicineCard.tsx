//-Path: "TeaChoco-Hospital/client/src/components/content/MedicineCard.tsx"
import { useTranslation } from 'react-i18next';
import type { Medicine } from '../../types/medicine';
import { FaPills, FaClock, FaExclamationTriangle } from 'react-icons/fa';

interface MedicineCardProps {
    medicine: Medicine;
    onClick?: () => void;
}

export function MedicineCard({ medicine, onClick }: MedicineCardProps) {
    const { t } = useTranslation();
    const isExpiringSoon = () => {
        if (!medicine.expiryDate) return false;
        const today = new Date();
        const expiry = new Date(medicine.expiryDate);
        if (isNaN(expiry.getTime())) return false;
        const diffTime = Math.abs(expiry.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30; // Warn if expiring within 30 days
    };

    return (
        <div
            onClick={onClick}
            className="bg-bg-card-light dark:bg-bg-card-dark rounded-2xl shadow-xs border border-border-light dark:border-border-dark overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-500 cursor-pointer group flex flex-col h-full">
            <div className="relative h-48 overflow-hidden bg-slate-50 dark:bg-slate-800/40 shrink-0">
                {medicine.imageUrl && medicine.imageUrl.length > 0 ? (
                    <img
                        src={medicine.imageUrl[0]}
                        alt={medicine.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 dark:text-slate-600 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                        <FaPills
                            size={40}
                            className="mb-2 opacity-40 group-hover:scale-110 transition-transform"
                        />
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">
                            No Image
                        </span>
                    </div>
                )}

                {/* Status Badges - More Minimalist & Modern */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span
                        className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest border shadow-sm backdrop-blur-md transition-colors ${
                            medicine.isActive
                                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                                : 'bg-slate-500/10 text-slate-600 border-slate-500/20'
                        }`}>
                        {medicine.isActive ? 'Active' : 'Inactive'}
                    </span>
                    {isExpiringSoon() && (
                        <span className="bg-amber-500/10 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400 text-[9px] px-2 py-1 rounded-lg font-black uppercase tracking-widest border border-amber-500/20 flex items-center gap-1 shadow-sm backdrop-blur-md">
                            <FaExclamationTriangle size={10} />
                            Expiring
                        </span>
                    )}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="mb-4">
                    <h3 className="font-black text-lg text-text-light dark:text-text-dark line-clamp-1 tracking-tight group-hover:text-primary transition-colors">
                        {medicine.name}
                    </h3>
                    <p className="text-xs font-bold text-text-muted-light dark:text-text-muted-dark line-clamp-1 italic opacity-70">
                        {medicine.genericName}
                    </p>
                </div>

                <div className="space-y-3 flex-1">
                    <div className="flex items-center text-xs text-text-secondary-light dark:text-text-secondary-dark gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/5 dark:bg-primary/20 flex items-center justify-center text-primary shrink-0">
                            <FaPills size={14} />
                        </div>
                        <span className="font-bold tracking-tight">
                            {medicine.dosage.quantity} {medicine.dosage.unit} •{' '}
                            {medicine.dosage.frequencyPerDay} {t('medicines.timesPerDay')}
                        </span>
                    </div>

                    {medicine.takeInstructions && medicine.takeInstructions.length > 0 && (
                        <div className="flex items-start text-xs text-text-secondary-light dark:text-text-secondary-dark gap-3">
                            <div className="w-8 h-8 rounded-lg bg-accent/5 dark:bg-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                                <FaClock size={14} />
                            </div>
                            <span className="line-clamp-2 font-bold tracking-tight py-1">
                                {medicine.takeInstructions[0].mealTime} •{' '}
                                {medicine.takeInstructions[0].relation?.replace('_', ' ')}
                            </span>
                        </div>
                    )}
                </div>

                <div className="mt-5 pt-4 border-t border-border-light dark:border-border-dark flex justify-between items-center bg-linear-to-r from-transparent to-primary/5 -mx-5 px-5 -mb-5 pb-5">
                    <div className="text-[10px] font-black uppercase tracking-widest text-text-muted-light dark:text-text-muted-dark flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                        Units left:{' '}
                        <span className="text-text-light dark:text-text-dark font-black ml-1">
                            {medicine.package?.tabletsPerStrip
                                ? medicine.package.tabletsPerStrip
                                : '-'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
