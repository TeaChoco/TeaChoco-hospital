// -Path: "TeaChoco-Hospital/client/src/components/custom/Loading.tsx"
import { useTranslation } from 'react-i18next';

export default function Loading() {
    const { t } = useTranslation();

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 py-10">
            <div className="relative flex h-10 w-10 items-center justify-center">
                <div className="absolute h-full w-full animate-spin rounded-full border-2 border-slate-200 border-t-primary dark:border-slate-700 dark:border-t-primary" />
            </div>

            <div className="flex items-center gap-1.5 font-medium tracking-tight text-slate-600 dark:text-slate-300">
                {t('common.loading')}
            </div>
        </div>
    );
}
