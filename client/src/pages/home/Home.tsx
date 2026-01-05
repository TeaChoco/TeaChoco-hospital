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
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Paper from '../../components/custom/Paper';
import { HiLightningBolt, HiShieldCheck, HiSparkles } from 'react-icons/hi';
import { SiReact, SiNestjs, SiMongodb, SiSocketdotio, SiTailwindcss } from 'react-icons/si';

/**
 * @description FeatureCard - สำหรับแสดง feature พร้อม link ไปหน้านั้น
 */
function FeatureCard({
    icon: Icon,
    title,
    path,
    description,
    colorClass,
}: {
    icon: any;
    path: string;
    title: string;
    colorClass: string;
    description: string;
}) {
    const navigate = useNavigate();

    return (
        <Paper
            variant="200"
            className="group p-6 flex flex-col gap-4 border border-border-light/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 cursor-pointer"
            onClick={() => navigate(path)}>
            <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colorClass} bg-opacity-10 group-hover:scale-110 transition-transform duration-500`}>
                <Icon className={`text-2xl ${colorClass.replace('bg-', 'text-')}`} />
            </div>
            <div>
                <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2 tracking-tight group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-sm text-text-light/60 dark:text-text-dark/60 leading-relaxed font-medium">
                    {description}
                </p>
            </div>
            <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
                <span className="text-sm font-bold">Explore</span>
                <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </div>
        </Paper>
    );
}

/**
 * @description UsageStep - แสดง step การใช้งาน
 */
function UsageStep({
    title,
    number,
    description,
}: {
    title: string;
    number: string;
    description: string;
}) {
    return (
        <div className="flex gap-6 items-start group">
            <div className="shrink-0 w-14 h-14 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                {number}
            </div>
            <div className="pt-1">
                <h4 className="text-lg font-bold text-text-light dark:text-text-dark mb-1">
                    {title}
                </h4>
                <p className="text-sm text-text-light/60 dark:text-text-dark/60 leading-relaxed font-medium">
                    {description}
                </p>
            </div>
        </div>
    );
}

/**
 * @description TechBadge - แสดง technology ที่ใช้
 */
function TechBadge({ name, icon: Icon, color }: { name: string; icon: any; color: string }) {
    return (
        <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-bg-paper-light-100 dark:bg-bg-paper-dark-100 hover:scale-105 transition-transform group">
            <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} bg-opacity-10`}>
                <Icon className={`text-2xl text-white ${color.replace('bg-', 'text-')}`} />
            </div>
            <span className="text-sm font-bold text-text-light/70 dark:text-text-dark/70 group-hover:text-text-light dark:group-hover:text-text-dark transition-colors">
                {name}
            </span>
        </div>
    );
}

export default function Home() {
    const { t } = useTranslation();
    const navigate = useNavigate();

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
        <div className="space-y-24 pb-24">
            {/* Section 1: Hero */}
            <section className="relative pt-16 pb-24 overflow-hidden">
                <div className="fixed top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
                <div className="fixed bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />

                <div className="max-w-5xl mx-auto text-center space-y-8 px-4 relative">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold">
                        <HiSparkles className="text-lg" />
                        <span>Personal Health Management</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-text-light dark:text-text-dark leading-none">
                        {t('home.welcome')} <br />
                        <span className="bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                            {t('navbar.appName')}
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-text-light/60 dark:text-text-dark/60 max-w-3xl mx-auto font-medium leading-relaxed">
                        {t('home.description')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <button
                            onClick={() => navigate('/signin')}
                            className="group px-10 py-5 bg-linear-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-3">
                            {t('home.getStarted')}
                            <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => navigate('/hospitals')}
                            className="px-10 py-5 border-2 border-border-light dark:border-border-dark hover:border-primary rounded-2xl font-bold text-lg text-text-light dark:text-text-dark transition-all active:scale-95">
                            {t('home.learnMore')}
                        </button>
                    </div>
                </div>
            </section>

            {/* Section 2: About / What is this? */}
            <section className="max-w-6xl mx-auto px-4">
                <Paper className="p-8 md:p-12 border border-border-light/50 dark:border-border-dark/50 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[60px]" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-black text-text-light dark:text-text-dark tracking-tight">
                                {t('home.aboutTitle')}
                            </h2>
                            <p className="text-lg text-text-light/70 dark:text-text-dark/70 leading-relaxed">
                                {t('home.aboutDesc')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                {
                                    icon: FaHospitalAlt,
                                    text: t('home.aboutFeature1'),
                                },
                                { icon: FaPills, text: t('home.aboutFeature2') },
                                {
                                    icon: FaCalendarAlt,
                                    text: t('home.aboutFeature3'),
                                },
                                { icon: FaQrcode, text: t('home.aboutFeature4') },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-4 rounded-xl bg-bg-paper-light-100 dark:bg-bg-paper-dark-100">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <item.icon className="text-primary" />
                                    </div>
                                    <span className="text-sm font-medium text-text-light/80 dark:text-text-dark/80 pt-2">
                                        {item.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Paper>
            </section>

            {/* Section 3: Features Grid */}
            <section className="max-w-6xl mx-auto px-4 space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black text-text-light dark:text-text-dark tracking-tight">
                        {t('home.featuresTitle')}
                    </h2>
                    <p className="text-lg text-text-light/60 dark:text-text-dark/60 font-medium max-w-xl mx-auto">
                        {t('home.featuresDesc')}
                    </p>
                    <div className="w-20 h-1.5 bg-linear-to-r from-primary to-accent rounded-full mx-auto" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            path={feature.path}
                            title={feature.title}
                            colorClass={feature.colorClass}
                            description={feature.description}
                        />
                    ))}
                </div>
            </section>

            {/* Section 4: Usage Guide */}
            <section className="max-w-6xl mx-auto px-4">
                <Paper className="p-8 md:p-14 relative overflow-hidden border-l-8 border-l-primary shadow-2xl">
                    <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                        <HiLightningBolt className="text-9xl text-primary" />
                    </div>

                    <div className="space-y-10 relative">
                        <div className="text-center space-y-2">
                            <h2 className="text-4xl font-black text-text-light dark:text-text-dark tracking-tight">
                                {t('home.howToUseTitle')}
                            </h2>
                            <div className="w-16 h-1 bg-primary rounded-full mx-auto" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
            </section>

            {/* Section 5: Tech Stack */}
            <section className="max-w-4xl mx-auto px-4 space-y-10">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-black text-text-light dark:text-text-dark tracking-tight">
                        {t('home.techStackTitle')}
                    </h2>
                    <div className="w-16 h-1 bg-linear-to-r from-primary to-accent rounded-full mx-auto" />
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {techStack.map((tech, index) => (
                        <TechBadge
                            key={index}
                            name={tech.name}
                            icon={tech.icon}
                            color={tech.color}
                        />
                    ))}
                </div>
            </section>

            {/* Section 6: CTA */}
            <section className="max-w-4xl mx-auto px-4 text-center">
                <Paper
                    variant="200"
                    className="p-12 border border-primary/20 bg-linear-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-[40px] space-y-8 relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-[80px]" />
                    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-accent/10 rounded-full blur-[80px]" />

                    <div className="relative space-y-6">
                        <h2 className="text-3xl md:text-4xl font-black text-text-light dark:text-text-dark">
                            {t('home.ctaTitle')}
                        </h2>
                        <p className="text-lg text-text-light/60 dark:text-text-dark/60 font-medium max-w-xl mx-auto">
                            {t('home.ctaDesc')}
                        </p>
                        <button
                            onClick={() => navigate('/signin')}
                            className="px-12 py-5 bg-linear-to-r from-primary to-accent hover:from-primary-dark hover:to-accent text-white rounded-2xl font-black text-xl shadow-2xl shadow-primary/30 transition-all active:scale-95">
                            {t('home.getStarted')}
                        </button>
                    </div>

                    <div className="flex items-center justify-center gap-8 pt-4 text-text-light/40 dark:text-text-dark/40">
                        <div className="flex items-center gap-2 font-bold text-sm">
                            <HiShieldCheck className="text-lg" />
                            SECURE
                        </div>
                        <div className="flex items-center gap-2 font-bold text-sm">
                            <HiLightningBolt className="text-lg" />
                            FAST
                        </div>
                        <div className="flex items-center gap-2 font-bold text-sm">
                            <FaCheckCircle />
                            FREE
                        </div>
                    </div>
                </Paper>
            </section>
        </div>
    );
}
