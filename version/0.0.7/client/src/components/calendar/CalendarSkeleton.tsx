//-Path: "TeaChoco-Hospital/client/src/components/calendar/CalendarSkeleton.tsx"
import Skeleton from '../custom/Skeleton';

export function CalendarSkeleton() {
    return (
        <div className="bg-bg-card-light dark:bg-bg-card-dark p-4 rounded-xl shadow-sm border border-border-light dark:border-border-dark flex flex-col gap-4 animate-pulse">
            <div className="flex items-center justify-between mb-2">
                <div className="flex gap-2">
                    <Skeleton variant="rounded" width={80} height={36} className="opacity-40" />
                    <Skeleton variant="rounded" width={80} height={36} className="opacity-40" />
                </div>
                <Skeleton variant="text" width={200} height={24} className="mx-auto" />
                <div className="flex gap-2">
                    <Skeleton variant="rounded" width={60} height={36} className="opacity-40" />
                    <Skeleton variant="rounded" width={60} height={36} className="opacity-40" />
                    <Skeleton variant="rounded" width={60} height={36} className="opacity-40" />
                </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-border-light dark:bg-border-dark rounded-lg overflow-hidden border border-border-light dark:border-border-dark">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div key={`header-${i}`} className="bg-slate-50 dark:bg-slate-800/50 p-2 text-center">
                        <Skeleton variant="text" width="60%" height={14} className="mx-auto opacity-30" />
                    </div>
                ))}
                {Array.from({ length: 35 }).map((_, i) => (
                    <div key={`cell-${i}`} className="bg-bg-card-light dark:bg-bg-card-dark h-32 p-2 flex flex-col gap-1 border-t border-l border-border-light dark:border-border-dark">
                        <Skeleton variant="text" width={16} height={16} className="opacity-20" />
                        {i % 5 === 0 && <Skeleton variant="rounded" width="90%" height={20} className="mt-1 bg-primary/10" />}
                        {i % 7 === 2 && <Skeleton variant="rounded" width="80%" height={20} className="mt-1 bg-emerald-500/10" />}
                    </div>
                ))}
            </div>
        </div>
    );
}
