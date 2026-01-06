//-Path: "TeaChoco-Hospital/client/src/pages/home/components/UsageStep.tsx"

/**
 * @description UsageStep - แสดง step การใช้งาน
 */
export function UsageStep({
    title,
    number,
    description,
}: {
    title: string;
    number: string;
    description: string;
}) {
    return (
        <div className="flex gap-8 items-start group p-6 rounded-3xl hover:bg-primary/5 transition-colors duration-500">
            <div className="shrink-0 w-16 h-16 rounded-2xl bg-linear-to-br from-primary via-primary to-accent flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-primary/30 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                {number}
            </div>
            <div className="pt-1 space-y-2">
                <h4 className="text-xl font-black text-text-light dark:text-text-dark tracking-tight">
                    {title}
                </h4>
                <p className="text-base text-text-light/60 dark:text-text-dark/60 leading-relaxed font-medium">
                    {description}
                </p>
            </div>
        </div>
    );
}
