//-Path: "TeaChoco-Hospital/client/src/components/content/DoctorCardSkeleton.tsx"
import Skeleton from '../custom/Skeleton';

export function DoctorCardSkeleton() {
    return (
        <div className="bg-bg-card-light dark:bg-bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-4 flex flex-col items-center text-center">
            <Skeleton
                variant="circular"
                width={96}
                height={96}
                className="mb-4 shadow-sm ring-4 ring-slate-50 dark:ring-slate-800"
            />
            <Skeleton variant="text" width="60%" height={24} className="mb-2" />
            <Skeleton variant="text" width="40%" height={16} className="mb-2 opacity-50" />
            <div className="mt-2 inline-block px-3 py-1 bg-primary/5 rounded-full">
                <Skeleton variant="text" width={80} height={12} />
            </div>
            <div className="mt-4 flex items-center gap-2">
                <Skeleton variant="circular" width={12} height={12} className="opacity-30" />
                <Skeleton variant="text" width={100} height={14} className="opacity-30" />
            </div>
        </div>
    );
}
