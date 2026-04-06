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
            className="bg-bg-card-light dark:bg-bg-card-dark rounded-2xl shadow-xs border border-border-light dark:border-border-dark overflow-hidden hover:shadow-xl hover:shadow-primary/10 hover:border-primary/50 transition-all duration-500 cursor-pointer group flex flex-row sm:flex-col h-full min-h-[160px] sm:min-h-0">
            {/* Image Section: Horizontal on mobile (w-32), Vertical on desktop (h-48) */}
            <div className="relative w-32 sm:w-full h-auto sm:h-48 overflow-hidden bg-slate-50 dark:bg-slate-800/40 shrink-0">
                {medicine.imageUrl && medicine.imageUrl.length > 0 ? (
                    <img
                        src={medicine.imageUrl[0]}
                        alt={medicine.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 dark:text-slate-600 bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
                        <FaPills
                            size={30}
                            className="mb-1 opacity-40 group-hover:scale-110 transition-transform sm:size-40"
                        />
                        <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest opacity-40 italic">
                            No Image
                        </span>
                    </div>
                )}

                {/* Status Badges - Repositioned for mobile friendliness */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 sm:gap-2">
                    <span
                        className={`text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg uppercase tracking-widest border shadow-sm backdrop-blur-md transition-colors ${
                            medicine.isActive
                                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                                : 'bg-slate-500/10 text-slate-600 border-slate-500/20'
                        }`}>
                        {medicine.isActive ? 'Active' : 'Inactive'}
                    </span>
                    {isExpiringSoon() && (
                        <span className="bg-amber-500/10 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400 text-[8px] sm:text-[9px] px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg font-black uppercase tracking-widest border border-amber-500/20 flex items-center gap-1 shadow-sm backdrop-blur-md">
                            <FaExclamationTriangle size={8} className="sm:size-10" />
                            <span className="hidden xs:inline">Expiring</span>
                        </span>
                    )}
                </div>
            </div>

            {/* Content Section: Flex-1 ensures it takes remaining space */}
            <div className="p-3 sm:p-5 flex flex-col flex-1 min-w-0">
                <div className="mb-2 sm:mb-4">
                    <h3 className="font-black text-sm sm:text-lg text-text-light dark:text-text-dark line-clamp-1 tracking-tight group-hover:text-primary transition-colors">
                        {medicine.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs font-bold text-text-muted-light dark:text-text-muted-dark line-clamp-1 italic opacity-70">
                        {medicine.genericName || medicine.brand || '-'}
                    </p>
                </div>

                <div className="space-y-2 sm:space-y-3 flex-1 overflow-hidden">
                    <div className="flex items-center text-[10px] sm:text-xs text-text-secondary-light dark:text-text-secondary-dark gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-primary/5 dark:bg-primary/20 flex items-center justify-center text-primary shrink-0">
                            <FaPills size={12} className="sm:size-14" />
                        </div>
                        <span className="font-bold tracking-tight line-clamp-1">
                            {medicine.dosage.quantity} {medicine.dosage.unit} •{' '}
                            {medicine.dosage.frequencyPerDay} {t('medicines.timesPerDay')}
                        </span>
                    </div>

                    {medicine.takeInstructions && medicine.takeInstructions.length > 0 && (
                        <div className="flex items-start text-[10px] sm:text-xs text-text-secondary-light dark:text-text-secondary-dark gap-2 sm:gap-3">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-accent/5 dark:bg-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
                                <FaClock size={12} className="sm:size-14" />
                            </div>
                            <span className="line-clamp-2 font-bold tracking-tight py-0.5 sm:py-1">
                                {t(`medicines.enums.MealTime.${medicine.takeInstructions[0].mealTime}`)} •{' '}
                                {medicine.takeInstructions[0].relation?.replace('_', ' ')}
                            </span>
                        </div>
                    )}
                </div>

                {/* Footer Section: Units Left */}
                <div className="mt-3 sm:mt-5 pt-2 sm:pt-4 border-t border-border-light dark:border-border-dark flex justify-between items-center bg-linear-to-r from-transparent to-primary/5 -mx-3 sm:-mx-5 px-3 sm:px-5 -mb-3 sm:-mb-5 pb-3 sm:pb-5">
                    <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-text-muted-light dark:text-text-muted-dark flex items-center gap-1 sm:gap-2">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary/40" />
                        {t('medicines.unitsLeft')}:{' '}
                        <span className="text-text-light dark:text-text-dark font-black ml-0.5 sm:ml-1">
                            {medicine.package?.tabletsPerStrip || '-'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
