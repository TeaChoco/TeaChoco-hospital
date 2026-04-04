//-Path: "TeaChoco-Hospital/client/src/pages/NotFoundPage.tsx"
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaHouse, FaHeartPulse } from 'react-icons/fa6';

export default function NotFoundPage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center p-6 overflow-hidden relative">
            {/* Background Aesthetic Blobs */}
            <div className="fixed top-0 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="fixed bottom-0 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />

            <div className="relative z-10 text-center max-w-2xl w-full">
                {/* 404 Graphic */}
                <div className="relative inline-block mb-12">
                    <h1 className="text-[180px] font-black italic tracking-tighter leading-none text-primary/10 select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            <FaHeartPulse className="text-8xl text-primary animate-[bounce_3s_infinite]" />
                            <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full scale-150 opacity-50" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <h2 className="text-4xl md:text-5xl font-black text-text-light dark:text-text-dark mb-4 tracking-tight drop-shadow-sm">
                    {t('errors.pageNotFound', { defaultValue: 'Patient Record Not Found' })}
                </h2>
                <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-12 max-w-md mx-auto font-medium">
                    {t('errors.pageNotFoundSub', {
                        defaultValue:
                            "It seems the ward you're looking for was relocated or never existed. Let's get you back to safety.",
                    })}
                </p>

                {/* Interactive Backdoor */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="group flex items-center gap-3 px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl font-black transition-all shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 active:scale-95">
                        <FaHouse className="transition-transform group-hover:-translate-y-0.5" />
                        <span>
                            {t('errors.backHome', { defaultValue: 'Back to Medical Center' })}
                        </span>
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="px-8 py-4 bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark text-text-light dark:text-text-dark rounded-2xl font-black transition-all hover:bg-slate-50 dark:hover:bg-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-none active:scale-95">
                        {t('errors.goBack', { defaultValue: 'Previous Ward' })}
                    </button>
                </div>

                {/* Aesthetic Heartbeat Line (SVG) */}
                <div className="mt-20 opacity-20 dark:opacity-10 pointer-events-none">
                    <svg
                        className="w-full h-16 text-primary"
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none">
                        <path
                            d="M0 10 L10 10 L12 5 L16 15 L20 10 L30 10 L32 2 L38 18 L42 10 L60 10 L62 0 L68 20 L72 10 L100 10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            strokeDasharray="1000"
                            strokeDashoffset="1000">
                            <animate
                                attributeName="stroke-dashoffset"
                                from="1000"
                                to="0"
                                dur="4s"
                                repeatCount="indefinite"
                            />
                        </path>
                    </svg>
                </div>
            </div>

            {/* Subtle Footer Info */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-[10px] text-text-muted-light dark:text-text-muted-dark font-black tracking-widest uppercase opacity-40">
                    Hospital Information System © {new Date().getFullYear()} TeaChoco Medical Ward
                </p>
            </div>
        </div>
    );
}
