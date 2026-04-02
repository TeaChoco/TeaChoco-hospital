//-Path: "TeaChoco-Hospital/client/src/components/content/HospitalCardSkeleton.tsx"
import Skeleton from '../custom/Skeleton';

export function HospitalCardSkeleton() {
    return (
        <div className="bg-bg-card-light dark:bg-bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <Skeleton variant="text" width="80%" height={24} className="mb-2" />
                    <Skeleton variant="text" width="60%" height={16} className="opacity-50" />
                </div>
                <Skeleton variant="rounded" width={48} height={48} className="rounded-lg opacity-30" />
            </div>
            
            <div className="mt-2 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Skeleton variant="circular" width={16} height={16} className="opacity-20" />
                    <Skeleton variant="text" width="90%" height={14} className="opacity-40" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton variant="circular" width={16} height={16} className="opacity-20" />
                    <Skeleton variant="text" width="50%" height={14} className="opacity-40" />
                </div>
            </div>

            <div className="mt-2 pt-4 border-t border-border-light dark:border-border-dark flex justify-between items-center">
                <Skeleton variant="text" width={100} height={16} className="opacity-30" />
                <Skeleton variant="circular" width={32} height={32} className="opacity-20" />
            </div>
        </div>
    );
}
