//-Path: "TeaChoco-Hospital/client/src/components/custom/ItemSkeleton.tsx"
import Skeleton from './Skeleton';

export default function ItemSkeleton() {
    return (
        <div className="flex flex-col gap-6 animate-pulse">
            <div className="flex items-center gap-2 relative">
                <Skeleton variant="circular" width={40} height={40} className="shrink-0" />
                <Skeleton variant="text" width={200} height={32} />
                <div className="absolute right-0 flex gap-2">
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="circular" width={40} height={40} />
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-bg-card-light dark:bg-bg-card-dark rounded-xl p-6 border border-border-light dark:border-border-dark space-y-6">
                    <div className="flex items-center gap-4">
                        <Skeleton variant="circular" width={80} height={80} />
                        <div className="flex-1 space-y-2">
                            <Skeleton variant="text" width="40%" height={24} />
                            <Skeleton
                                variant="text"
                                width="20%"
                                height={16}
                                className="opacity-50"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border-light dark:border-border-dark">
                        <div className="space-y-3">
                            <Skeleton
                                variant="text"
                                width="30%"
                                height={16}
                                className="opacity-30"
                            />
                            <Skeleton
                                variant="rounded"
                                width="100%"
                                height={40}
                                className="opacity-20"
                            />
                        </div>
                        <div className="space-y-3">
                            <Skeleton
                                variant="text"
                                width="30%"
                                height={16}
                                className="opacity-30"
                            />
                            <Skeleton
                                variant="rounded"
                                width="100%"
                                height={40}
                                className="opacity-20"
                            />
                        </div>
                        <div className="space-y-3">
                            <Skeleton
                                variant="text"
                                width="30%"
                                height={16}
                                className="opacity-30"
                            />
                            <Skeleton
                                variant="rounded"
                                width="100%"
                                height={40}
                                className="opacity-20"
                            />
                        </div>
                        <div className="space-y-3">
                            <Skeleton
                                variant="text"
                                width="30%"
                                height={16}
                                className="opacity-30"
                            />
                            <Skeleton
                                variant="rounded"
                                width="100%"
                                height={40}
                                className="opacity-20"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-bg-card-light dark:bg-bg-card-dark rounded-xl p-6 border border-border-light dark:border-border-dark space-y-4">
                    <Skeleton variant="text" width="20%" height={20} className="mb-4" />
                    <Skeleton variant="rounded" width="100%" height={120} className="opacity-20" />
                </div>
            </div>

            <div className="flex gap-4">
                <Skeleton
                    variant="rounded"
                    width="100%"
                    height={48}
                    className="rounded-xl opacity-30"
                />
            </div>
        </div>
    );
}
