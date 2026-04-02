//-Path: "TeaChoco-Hospital/client/src/components/content/AppointmentCardSkeleton.tsx"
import Skeleton from '../custom/Skeleton';

export function AppointmentCardSkeleton() {
    return (
        <div className="bg-bg-card-light dark:bg-bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-4 flex flex-col gap-3 group relative overflow-hidden h-full">
            <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <Skeleton variant="text" width={100} height={16} className="opacity-40" />
                    <Skeleton variant="text" width={160} height={26} className="mb-1" />
                </div>
                <Skeleton variant="rectangular" width={60} height={24} className="rounded-full opacity-30" />
            </div>

            <div className="mt-2 flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-3">
                    <Skeleton variant="circular" width={40} height={40} className="shrink-0 opacity-20" />
                    <div className="flex-1">
                        <Skeleton variant="text" width="60%" height={18} className="mb-1" />
                        <Skeleton variant="text" width="40%" height={14} className="opacity-40" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="flex flex-col gap-1">
                        <Skeleton variant="text" width="50%" height={12} className="opacity-30" />
                        <div className="flex items-center gap-1">
                            <Skeleton variant="circular" width={12} height={12} className="opacity-20" />
                            <Skeleton variant="text" width="70%" height={14} className="opacity-40" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Skeleton variant="text" width="50%" height={12} className="opacity-30" />
                        <div className="flex items-center gap-1">
                            <Skeleton variant="circular" width={12} height={12} className="opacity-20" />
                            <Skeleton variant="text" width="70%" height={14} className="opacity-40" />
                        </div>
                    </div>
                </div>

                <div className="mt-2 flex flex-col gap-1">
                    <Skeleton variant="text" width="30%" height={12} className="opacity-30" />
                    <div className="flex items-center gap-1">
                        <Skeleton variant="circular" width={12} height={12} className="opacity-20" />
                        <Skeleton variant="text" width="85%" height={14} className="opacity-40" />
                    </div>
                </div>
            </div>

            <div className="mt-2 flex items-center justify-between pt-4 border-t border-border-light dark:border-border-dark opacity-30">
                <Skeleton variant="text" width={120} height={14} />
                <Skeleton variant="circular" width={24} height={24} />
            </div>
        </div>
    );
}
