//-Path: "TeaChoco-Hospital/client/src/pages/profile/ProfilePage.tsx"
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import Paper from '../../components/custom/Paper';
import { FaUser, FaIdCard, FaQrcode, FaEnvelope, FaCalendarCheck } from 'react-icons/fa';

export default function ProfilePage() {
    const { t } = useTranslation();
    const { user, signout } = useAuth();

    const infoItems = [
        { icon: FaUser, label: t('profile.lastName'), value: user?.lastName },
        { icon: FaIdCard, label: t('profile.userID'), value: user?.user_id },
        { icon: FaUser, label: t('profile.firstName'), value: user?.firstName },
        { icon: FaEnvelope, label: t('profile.emailAddress'), value: user?.email },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-primary to-accent rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
                <Paper className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="flex flex-col md:flex-row items-center gap-8 p-4 md:p-8">
                        <div className="relative">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl relative z-10">
                                {user?.picture ? (
                                    <img
                                        src={user.picture}
                                        alt={user.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                                        <FaUser className="text-4xl text-slate-400" />
                                    </div>
                                )}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 border-4 border-white dark:border-slate-800 rounded-full z-20 shadow-lg"></div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-black text-text-light dark:text-text-dark mb-2 tracking-tight">
                                {user?.name || t('profile.title')}
                            </h1>
                            <p className="text-text-muted-light dark:text-text-muted-dark font-medium flex items-center justify-center md:justify-start gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                                {t('profile.registeredViaGoogle')}
                            </p>
                            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                                <button className="btn btn-primary px-6 shadow-lg shadow-primary/20">
                                    {t('profile.editProfile')}
                                </button>
                                <Link
                                    to="/profile/allow"
                                    className="btn btn-primary px-6 flex items-center gap-2">
                                    <FaQrcode />
                                    {t('profile.allowWithQR')}
                                </Link>
                                <Link to="/" onClick={signout} className="btn btn-error">
                                    {t('auth.signout')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Paper className="p-6 md:p-8">
                        <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-8 flex items-center gap-3">
                            <span className="p-2 bg-primary/10 rounded-lg">
                                <FaIdCard className="text-primary text-xl" />
                            </span>
                            {t('profile.personalInfo')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {infoItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="group p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                                    <p className="text-sm font-bold text-text-muted-light dark:text-text-muted-dark mb-2 uppercase tracking-widest flex items-center gap-2">
                                        <item.icon className="text-primary/50" />
                                        {item.label}
                                    </p>
                                    <p className="text-lg font-semibold text-text-light dark:text-text-dark truncate">
                                        {item.value || '-'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Paper>

                    <Paper className="p-6 md:p-8">
                        <h2 className="text-xl font-bold text-text-light dark:text-text-dark mb-8 flex items-center gap-3">
                            <span className="p-2 bg-accent/10 rounded-lg">
                                <FaCalendarCheck className="text-accent text-xl" />
                            </span>
                            {t('profile.accountStats')}
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {[
                                { count: '5', color: 'bg-accent', label: t('navbar.medicines') },
                                {
                                    count: '2',
                                    color: 'bg-accent-secondary',
                                    label: t('navbar.hospitals'),
                                },
                                {
                                    count: '12',
                                    color: 'bg-primary',
                                    label: t('navbar.appointments'),
                                },
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className="p-6 rounded-2xl bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark text-center group hover:scale-105 transition-transform">
                                    <p className="text-3xl font-black text-text-light dark:text-text-dark mb-1">
                                        {stat.count}
                                    </p>
                                    <p className="text-xs font-bold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">
                                        {stat.label}
                                    </p>
                                    <div
                                        className={`h-1 w-8 mx-auto mt-4 rounded-full ${stat.color} opacity-30 group-hover:opacity-100 transition-opacity`}></div>
                                </div>
                            ))}
                        </div>
                    </Paper>
                </div>

                <div className="space-y-6">
                    <Paper className="p-6">
                        <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-6">
                            {t('profile.security')}
                        </h3>
                        <div className="space-y-4">
                            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <span className="text-sm font-medium">{t('profile.password')}</span>
                                <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-500 uppercase font-black">
                                    {t('profile.linked')}
                                </span>
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <span className="text-sm font-medium">
                                    {t('profile.twoFactorAuth')}
                                </span>
                                <span className="text-xs bg-primary/10 px-2 py-1 rounded text-primary uppercase font-black tracking-tighter">
                                    {t('profile.enable')}
                                </span>
                            </button>
                        </div>
                    </Paper>

                    <Paper className="p-6 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-red-500 to-orange-500"></div>
                        <h3 className="text-lg font-bold text-red-500 mb-2">
                            {t('profile.dangerZone')}
                        </h3>
                        <p className="text-xs text-text-muted-light dark:text-text-muted-dark mb-4">
                            {t('profile.deleteAccountInfo')}
                        </p>
                        <button className="w-full btn btn-error text-white font-bold py-3 shadow-lg shadow-red-500/20">
                            {t('profile.deleteAccount')}
                        </button>
                    </Paper>
                </div>
            </div>
        </div>
    );
}
