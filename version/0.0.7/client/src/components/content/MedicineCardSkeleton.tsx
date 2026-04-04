//-Path: "TeaChoco-Hospital/client/src/components/content/MedicineCardSkeleton.tsx"
import Skeleton from '../custom/Skeleton';

export function MedicineCardSkeleton() {
    return (
        <div className="bg-bg-card-light dark:bg-bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-4 flex flex-col gap-3 group relative overflow-hidden h-full">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <Skeleton variant="text" width="85%" height={26} className="mb-2" />
                    <Skeleton variant="text" width="65%" height={16} className="opacity-50" />
                </div>
                <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                    <Skeleton variant="rectangular" width="100%" height="100%" className="opacity-20" />
                </div>
            </div>

            <div className="mt-2 flex flex-col gap-3 flex-1">
                <div className="flex flex-wrap gap-2">
                    <Skeleton variant="text" width={70} height={20} className="rounded-full opacity-30" />
                    <Skeleton variant="text" width={90} height={20} className="rounded-full opacity-30" />
                </div>
                
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Skeleton variant="circular" width={16} height={16} className="opacity-20" />
                        <Skeleton variant="text" width="75%" height={14} className="opacity-40" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton variant="circular" width={16} height={16} className="opacity-20" />
                        <Skeleton variant="text" width="40%" height={14} className="opacity-40" />
                    </div>
                </div>
            </div>

            <div className="mt-2 flex items-center justify-between pt-4 border-t border-border-light dark:border-border-dark">
                <div className="flex -space-x-2">
                    <Skeleton variant="circular" width={24} height={24} className="ring-2 ring-white dark:ring-slate-800 opacity-20" />
                    <Skeleton variant="circular" width={24} height={24} className="ring-2 ring-white dark:ring-slate-800 opacity-20" />
                </div>
                <Skeleton variant="text" width={60} height={14} className="opacity-30" />
            </div>
        </div>
    );
}
