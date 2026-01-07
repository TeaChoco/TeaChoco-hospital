//-Path: "TeaChoco-Hospital/client/src/layout/Footer.tsx"
import { useTranslation } from 'react-i18next';
import { FaGithub, FaHeart } from 'react-icons/fa';
import { HiCode, HiSparkles } from 'react-icons/hi';
import { SiReact, SiNestjs, SiMongodb, SiTailwindcss } from 'react-icons/si';

export default function Footer() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    const techIcons = [
        { Icon: SiReact, label: 'React', color: 'hover:text-[#61DAFB]' },
        { Icon: SiNestjs, label: 'NestJS', color: 'hover:text-[#E0234E]' },
        { Icon: SiMongodb, label: 'MongoDB', color: 'hover:text-[#47A248]' },
        { Icon: SiTailwindcss, label: 'Tailwind', color: 'hover:text-[#06B6D4]' },
    ];

    return (
        <footer className="relative mt-auto border-t border-border-light/30 dark:border-border-dark/30 bg-bg-paper-light-50/50 dark:bg-bg-paper-dark-50/50 backdrop-blur-xl hidden md:block overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-6 py-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Left: Brand & Description */}
                    <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                <HiSparkles className="text-xl" />
                            </div>
                            <span className="text-xl font-black tracking-tight text-text-light dark:text-text-dark">
                                {t('navbar.appName')}
                            </span>
                        </div>
                        <p className="text-sm text-text-light/50 dark:text-text-dark/50 max-w-xs leading-relaxed">
                            {t(
                                'footer.projectDescription',
                                'Personal project for learning and exploration. Not an official product.',
                            )}
                        </p>
                    </div>

                    {/* Center: Tech Stack Icons */}
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-widest text-text-light/30 dark:text-text-dark/30">
                            {t('footer.builtWith', 'Built with')}
                        </span>
                        <div className="flex items-center gap-4">
                            {techIcons.map(({ Icon, label, color }) => (
                                <div
                                    key={label}
                                    title={label}
                                    className={`text-2xl text-text-light/40 dark:text-text-dark/40 ${color} transition-all duration-300 hover:scale-125 cursor-default`}>
                                    <Icon />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Links & Credits */}
                    <div className="flex flex-col items-center md:items-end gap-3">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/TeaChoco"
                            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-bg-paper-light-100 dark:bg-bg-paper-dark-100 border border-border-light/50 dark:border-border-dark/50 hover:border-primary/50 hover:bg-primary/10 transition-all">
                            <FaGithub className="text-lg group-hover:text-primary transition-colors" />
                            <span className="text-sm font-bold text-text-light/70 dark:text-text-dark/70 group-hover:text-primary transition-colors">
                                GitHub
                            </span>
                        </a>
                        <div className="flex items-center gap-1.5 text-xs text-text-light/40 dark:text-text-dark/40">
                            <HiCode className="text-sm" />
                            <span>{t('footer.madeBy', 'Made with')}</span>
                            <FaHeart className="text-red-500 animate-pulse text-[10px]" />
                            <span>{t('footer.byDeveloper', 'by TeaChoco')}</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="mt-8 pt-6 border-t border-border-light/20 dark:border-border-dark/20 text-center">
                    <p className="text-xs text-text-light/30 dark:text-text-dark/30 tracking-wide">
                        © {currentYear} {t('navbar.appName')} •{' '}
                        {t(
                            'footer.disclaimer',
                            'Personal Learning Project - Not for commercial use',
                        )}
                    </p>
                </div>
            </div>
        </footer>
    );
}
