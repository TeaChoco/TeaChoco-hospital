//-Path: "TeaChoco-Hospital/client/src/pages/home/HomeComponents.tsx"
import { FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Paper from '../../components/custom/Paper';

/**
 * @description FeatureCard - สำหรับแสดง feature พร้อม link ไปหน้านั้น
 */
export function FeatureCard({
    icon: Icon,
    title,
    path,
    description,
    colorClass = 'bg-primary',
}: {
    icon: React.ElementType;
    path: string;
    title: string;
    colorClass?: string;
    description: string;
}) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Paper
            variant="200"
            className="group p-8 flex flex-col gap-6 border border-border-light/50 dark:border-border-dark/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer relative overflow-hidden h-full rounded-[32px]"
            onClick={() => navigate(path)}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-primary/10 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${colorClass} text-white shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                <Icon className="text-3xl" />
            </div>

            <div className="space-y-3 relative">
                <h3 className="text-2xl font-black text-text-light dark:text-text-dark tracking-tight leading-tight group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-base text-text-light/60 dark:text-text-dark/60 leading-relaxed font-medium line-clamp-3">
                    {description}
                </p>
            </div>

            <div className="flex items-center gap-3 text-primary mt-auto pt-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="text-sm font-black uppercase tracking-wider">
                    {t('home.explore' as any) || 'Explore'}
                </span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <FaChevronRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
                </div>
            </div>
        </Paper>
    );
}

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
