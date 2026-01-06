//-Path: "TeaChoco-Hospital/client/src/pages/home/Home.tsx"
import {
    FaPills,
    FaQrcode,
    FaUserMd,
    FaCheckCircle,
    FaCalendarAlt,
    FaHospitalAlt,
    FaChevronRight,
} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Paper from '../../components/custom/Paper';
import { FeatureCard, UsageStep, TechBadge } from './HomeComponents';
import { HiLightningBolt, HiShieldCheck, HiSparkles } from 'react-icons/hi';
import { SiReact, SiNestjs, SiMongodb, SiSocketdotio, SiTailwindcss } from 'react-icons/si';

export default function Home() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const features = [
        {
            icon: FaHospitalAlt,
            path: '/hospitals',
            title: t('navbar.hospitals'),
            colorClass: 'bg-primary',
            description: t('hospitals.description'),
        },
        {
            icon: FaUserMd,
            path: '/doctors',
            title: t('navbar.doctors'),
            colorClass: 'bg-accent',
            description: t('doctors.description'),
        },
        {
            icon: FaPills,
            path: '/medicines',
            title: t('navbar.medicines'),
            colorClass: 'bg-secondary',
            description: t('medicines.description'),
        },
        {
            icon: FaCalendarAlt,
            path: '/calendar',
            colorClass: 'bg-primary',
            title: t('navbar.calendar'),
            description: t('calendarPage.description'),
        },
        {
            icon: FaCalendarAlt,
            path: '/appointments',
            colorClass: 'bg-accent',
            title: t('navbar.appointments'),
            description: t('appointments.description'),
        },
        {
            icon: FaQrcode,
            colorClass: 'bg-secondary',
            path: '/profile/allow',
            title: t('accessControl.header'),
            description: t('accessControl.description'),
        },
    ];

    const techStack = [
        { name: 'React', icon: SiReact, color: 'bg-[#61DAFB]' },
        { name: 'NestJS', icon: SiNestjs, color: 'bg-[#E0234E]' },
        { name: 'MongoDB', icon: SiMongodb, color: 'bg-[#47A248]' },
        { name: 'Socket.IO', icon: SiSocketdotio, color: 'bg-[#010101]' },
        { name: 'Tailwind', icon: SiTailwindcss, color: 'bg-[#06B6D4]' },
    ];

    return (
        <div className="space-y-32 pb-32 overflow-x-hidden">
            {/* --- Hero Section --- */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-16 px-4">
                {/* Background Decorations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[140px] animate-pulse-slow" />
                    <div
                        className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[140px] animate-pulse-slow"
                        style={{ animationDelay: '2s' }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-bg-light)_70%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-bg-dark)_70%)] opacity-50" />
                </div>

                <div className="max-w-6xl mx-auto text-center space-y-12 relative z-10 animate-fadeIn">
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-black tracking-widest uppercase shadow-lg shadow-primary/5">
                        <HiSparkles className="text-xl animate-spin-slow" />
                        <span>Personal Health Evolution</span>
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-6xl md:text-9xl font-black tracking-tight leading-[0.9] text-text-light dark:text-text-dark">
                            <span className="opacity-90">{t('home.welcome')}</span>
                            <br />
                            <span className="linear-text drop-shadow-2xl">
                                {t('navbar.appName')}
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-text-light/50 dark:text-text-dark/50 max-w-3xl mx-auto font-medium leading-relaxed italic">
                            "{t('home.description')}"
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
                        <button
                            onClick={() => navigate(isAuthenticated ? '/profile' : '/signin')}
                            className="group relative px-12 py-6 bg-linear-to-r from-primary to-accent text-white rounded-[24px] font-black text-xl shadow-[0_20px_50px_rgba(34,197,94,0.3)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-4 overflow-hidden">
                            <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            {isAuthenticated ? t('navbar.profile') : t('home.getStarted')}
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-primary transition-all">
                                <FaChevronRight className="text-sm" />
                            </div>
                        </button>
                        <button
                            onClick={() => navigate('/hospitals')}
                            className="px-12 py-6 border-2 border-border-light dark:border-border-dark hover:border-primary/50 hover:bg-primary/5 rounded-[24px] font-black text-xl text-text-light dark:text-text-dark transition-all hover:scale-105 active:scale-95">
                            {t('home.learnMore')}
                        </button>
                    </div>
                </div>
            </section>

            {/* --- About Section --- */}
            <section className="max-w-7xl mx-auto px-4 relative">
                <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
                <Paper className="p-10 md:p-20 border border-border-light/50 dark:border-border-dark/50 rounded-[60px] relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary/5 to-transparent pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <h2 className="text-5xl md:text-6xl font-black text-text-light dark:text-text-dark tracking-tighter leading-tight">
                                    {t('home.aboutTitle')}
                                </h2>
                                <div className="w-24 h-2 bg-linear-to-r from-primary to-accent rounded-full" />
                            </div>
                            <p className="text-xl text-text-light/60 dark:text-text-dark/60 leading-relaxed font-medium">
                                {t('home.aboutDesc')}
                            </p>
                            <div className="flex gap-8 items-center pt-4">
                                <div className="text-center">
                                    <div className="text-4xl font-black text-primary">100%</div>
                                    <div className="text-xs font-black uppercase tracking-widest text-text-light/40 mt-1">
                                        Secure
                                    </div>
                                </div>
                                <div className="w-px h-12 bg-border-light dark:bg-border-dark" />
                                <div className="text-center">
                                    <div className="text-4xl font-black text-accent">24/7</div>
                                    <div className="text-xs font-black uppercase tracking-widest text-text-light/40 mt-1">
                                        Available
                                    </div>
                                </div>
                                <div className="w-px h-12 bg-border-light dark:bg-border-dark" />
                                <div className="text-center">
                                    <div className="text-4xl font-black text-secondary">Free</div>
                                    <div className="text-xs font-black uppercase tracking-widest text-text-light/40 mt-1">
                                        Access
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: FaHospitalAlt,
                                    text: t('home.aboutFeature1'),
                                    color: 'bg-primary',
                                },
                                {
                                    icon: FaPills,
                                    text: t('home.aboutFeature2'),
                                    color: 'bg-accent',
                                },
                                {
                                    icon: FaCalendarAlt,
                                    text: t('home.aboutFeature3'),
                                    color: 'bg-secondary',
                                },
                                {
                                    icon: FaQrcode,
                                    text: t('home.aboutFeature4'),
                                    color: 'bg-primary',
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="group/item flex flex-col gap-4 p-8 rounded-[32px] bg-bg-paper-light-100 dark:bg-bg-paper-dark-100 border border-transparent hover:border-primary/20 transition-all hover:scale-105 hover:shadow-xl">
                                    <div
                                        className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center text-white text-2xl shadow-lg shadow-black/5`}>
                                        <item.icon />
                                    </div>
                                    <span className="text-lg font-bold text-text-light/80 dark:text-text-dark/80 tracking-tight leading-snug">
                                        {item.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Paper>
            </section>

            {/* --- Features Grid --- */}
            <section className="max-w-7xl mx-auto px-4 space-y-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <div className="space-y-6 max-w-2xl">
                        <h2 className="text-5xl md:text-7xl font-black text-text-light dark:text-text-dark tracking-tighter leading-none">
                            {t('home.featuresTitle')}
                        </h2>
                        <p className="text-xl text-text-light/50 dark:text-text-dark/50 font-medium">
                            {t('home.featuresDesc')}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/hospitals')}
                        className="group flex items-center gap-3 px-8 py-4 bg-bg-paper-light-200 dark:bg-bg-paper-dark-200 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                        {t('home.explore')} All Services
                        <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="animate-fadeIn"
                            style={{ animationDelay: `${index * 100}ms` }}>
                            <FeatureCard
                                icon={feature.icon}
                                path={feature.path}
                                title={feature.title}
                                colorClass={feature.colorClass}
                                description={feature.description}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Usage Guide --- */}
            <section className="max-w-7xl mx-auto px-4">
                <div className="relative p-1 px-1 bg-linear-to-br from-primary via-accent to-secondary rounded-2xl shadow-2xl">
                    <Paper className="p-10 md:p-20 relative overflow-hidden bg-bg-paper-light-50/90 dark:bg-bg-paper-dark-50/90 backdrop-blur-xl rounded-2xl">
                        <div className="absolute top-0 right-0 p-20 opacity-5 scale-[2] rotate-12 pointer-events-none">
                            <HiLightningBolt className="text-9xl text-primary" />
                        </div>

                        <div className="space-y-20 relative">
                            <div className="text-center space-y-6">
                                <h2 className="text-5xl md:text-7xl font-black text-text-light dark:text-text-dark tracking-tighter">
                                    {t('home.howToUseTitle')}
                                </h2>
                                <div className="w-32 h-2 bg-primary rounded-full mx-auto" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                                <UsageStep
                                    number="1"
                                    title={t('home.step1Title')}
                                    description={t('home.step1Desc')}
                                />
                                <UsageStep
                                    number="2"
                                    title={t('home.step2Title')}
                                    description={t('home.step2Desc')}
                                />
                                <UsageStep
                                    number="3"
                                    title={t('home.step3Title')}
                                    description={t('home.step3Desc')}
                                />
                                <UsageStep
                                    number="4"
                                    title={t('home.step4Title')}
                                    description={t('home.step4Desc')}
                                />
                            </div>
                        </div>
                    </Paper>
                </div>
            </section>

            {/* --- Tech Stack --- */}
            <section className="max-w-5xl mx-auto px-4 space-y-16">
                <div className="text-center space-y-6">
                    <h2 className="text-4xl md:text-5xl font-black text-text-light dark:text-text-dark tracking-tighter uppercase">
                        {t('home.techStackTitle')}
                    </h2>
                    <p className="text-sm font-black text-primary tracking-[0.4em] uppercase opacity-60">
                        Engineered for Performance
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    {techStack.map((tech, index) => (
                        <div
                            key={index}
                            className="animate-float"
                            style={{ animationDelay: `${index * 500}ms` }}>
                            <TechBadge name={tech.name} icon={tech.icon} color={tech.color} />
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Final CTA --- */}
            <section className="max-w-6xl mx-auto px-4 text-center">
                <Paper
                    variant="200"
                    className="p-16 md:p-24 border border-primary/20 bg-linear-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-[80px] space-y-12 relative overflow-hidden shadow-2xl">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-pulse-slow" />

                    <div className="relative space-y-10">
                        <h2 className="text-5xl md:text-7xl font-black text-text-light dark:text-text-dark tracking-tight leading-none">
                            {t('home.ctaTitle')}
                        </h2>
                        <p className="text-xl md:text-2xl text-text-light/60 dark:text-text-dark/60 font-medium max-w-2xl mx-auto leading-relaxed italic">
                            {t('home.ctaDesc')}
                        </p>
                        <button
                            onClick={() => navigate(isAuthenticated ? '/profile' : '/signin')}
                            className="group relative px-16 py-8 bg-linear-to-r from-primary to-accent text-white rounded-[32px] font-black text-2xl shadow-2xl shadow-primary/40 transition-all hover:scale-110 active:scale-95 overflow-hidden">
                            <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            {isAuthenticated ? t('navbar.profile') : t('home.getStarted')}
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-12 pt-8 text-text-light/30 dark:text-text-dark/30">
                        <div className="flex items-center gap-3 font-black text-sm tracking-widest uppercase">
                            <HiShieldCheck className="text-2xl" />
                            Secure Core
                        </div>
                        <div className="flex items-center gap-3 font-black text-sm tracking-widest uppercase">
                            <HiLightningBolt className="text-2xl" />
                            Instant Sync
                        </div>
                        <div className="flex items-center gap-3 font-black text-sm tracking-widest uppercase">
                            <FaCheckCircle className="text-xl" />
                            Open Access
                        </div>
                    </div>
                </Paper>
            </section>
        </div>
    );
}
