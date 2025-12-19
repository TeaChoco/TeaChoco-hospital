//-Path: "TeaChoco-Hospital/client/src/components/MedicineCard.tsx"
import type { Medicine } from '../../types/medicine';
import { FaPills, FaClock, FaExclamationTriangle } from 'react-icons/fa';

interface MedicineCardProps {
    medicine: Medicine;
    onClick?: () => void;
}

export function MedicineCard({ medicine, onClick }: MedicineCardProps) {
    const isExpiringSoon = () => {
        const today = new Date();
        const expiry = new Date(medicine.expiryDate);
        const diffTime = Math.abs(expiry.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30; // Warn if expiring within 30 days
    };

    return (
        <div
            onClick={onClick}
            className="bg-bg-card-light dark:bg-bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden hover:shadow-md hover:border-primary transition-all duration-300 cursor-pointer group">
            <div className="relative h-48 overflow-hidden bg-slate-50 dark:bg-slate-800">
                {medicine.imageUrl ? (
                    <img
                        src={medicine.imageUrl}
                        alt={medicine.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600">
                        <FaPills size={48} />
                    </div>
                )}

                {/* Status Badges */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                    {isExpiringSoon() && (
                        <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1 shadow-sm border border-amber-200 dark:border-amber-800">
                            <FaExclamationTriangle size={10} />
                            Expiring Soon
                        </span>
                    )}
                    <span
                        className={`text-xs px-2 py-1 rounded-full font-medium shadow-sm border ${
                            medicine.isActive
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                        }`}>
                        {medicine.isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>
            </div>

            <div className="p-4">
                <div className="mb-2">
                    <h3 className="font-bold text-lg text-text-light dark:text-text-dark line-clamp-1">
                        {medicine.name}
                    </h3>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark line-clamp-1">
                        {medicine.genericName}
                    </p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center text-sm text-text-secondary-light dark:text-text-secondary-dark gap-2">
                        <span className="w-5 flex justify-center">
                            <FaPills className="text-primary" />
                        </span>
                        <span>
                            {medicine.dosage.quantity} {medicine.dosage.unit} •{' '}
                            {medicine.dosage.frequencyPerDay} times/day
                        </span>
                    </div>

                    {medicine.takeInstructions.length > 0 && (
                        <div className="flex items-start text-sm text-text-secondary-light dark:text-text-secondary-dark gap-2">
                            <span className="w-5 flex justify-center mt-0.5">
                                <FaClock className="text-accent-secondary" />
                            </span>
                            <span className="line-clamp-2">
                                {medicine.takeInstructions[0].mealTime} •{' '}
                                {medicine.takeInstructions[0].relation}
                            </span>
                        </div>
                    )}
                </div>

                <div className="mt-4 pt-3 border-t border-border-light dark:border-border-dark flex justify-between items-center">
                    <div className="text-xs text-text-muted-light dark:text-text-muted-dark">
                        Tablet left:{' '}
                        {medicine.package?.tabletsPerStrip ? medicine.package.tabletsPerStrip : '-'}
                    </div>
                </div>
            </div>
        </div>
    );
}
