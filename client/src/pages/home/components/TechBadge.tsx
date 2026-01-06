//-Path: "TeaChoco-Hospital/client/src/pages/home/components/TechBadge.tsx"

/**
 * @description TechBadge - แสดง technology ที่ใช้
 */
export function TechBadge({ name, icon: Icon, color }: { name: string; icon: any; color: string }) {
    return (
        <div className="flex flex-col items-center gap-4 p-6 rounded-[32px] bg-bg-paper-light-100 dark:bg-bg-paper-dark-100 border border-border-light/30 dark:border-border-dark/30 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group min-w-[140px]">
            <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                <Icon className="text-3xl" />
            </div>
            <span className="text-sm font-black text-text-light/50 dark:text-text-dark/50 group-hover:text-primary transition-colors tracking-widest uppercase">
                {name}
            </span>
        </div>
    );
}
