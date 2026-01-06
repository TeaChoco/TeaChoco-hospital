//-Path: "TeaChoco-Hospital/client/src/components/navbar/Custom.tsx"
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { FaUser, FaSignInAlt, FaSpinner } from 'react-icons/fa';

export function NavbarLink({
    to,
    children,
    icon: Icon,
}: {
    to: string;
    children: React.ReactNode;
    icon?: React.ElementType;
}) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `btn md:flex-col xl:flex-row p-2 px-2 md:px-3 xl:px-4 gap-1 xl:gap-2 text-[10px] xl:text-sm font-medium ${
                    isActive ? 'btn-primary-active' : ''
                }`
            }>
            {Icon && <Icon className="text-base xl:text-lg" />}
            {children}
        </NavLink>
    );
}

export function SignBtn({ className, isMobile }: { className?: string; isMobile?: boolean }) {
    const { t } = useTranslation();
    const { user, loading, isAuthenticated } = useAuth();

    if (loading) {
        return isMobile ? (
            <div className={`flex flex-col items-center justify-center gap-1 w-full ${className}`}>
                <FaSpinner className="text-xl text-primary animate-spin mb-0.5" />
                <span className="text-[10px] font-bold text-text-muted-light dark:text-text-muted-dark">
                    ...
                </span>
            </div>
        ) : (
            <button className={`btn btn-dis ${className}`}>{t('common.loading')}</button>
        );
    }

    if (isAuthenticated) {
        return isMobile ? (
            <NavLink
                to="/profile"
                className={({ isActive }) =>
                    `flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300 w-full ${
                        isActive
                            ? 'text-primary bg-primary/10'
                            : 'text-text-muted-light dark:text-text-muted-dark hover:bg-black/5 dark:hover:bg-white/5'
                    } ${className}`
                }>
                <div className="w-6 h-6 rounded-full overflow-hidden border border-current">
                    {user?.picture ? (
                        <img
                            src={user.picture}
                            alt={user.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                            <FaUser className="text-[10px] text-slate-400" />
                        </div>
                    )}
                </div>
                <span className="text-[10px] font-bold tracking-wide truncate max-w-[64px]">
                    {t('navbar.profile')}
                </span>
            </NavLink>
        ) : (
            <Link
                to="/profile"
                className={`w-12 h-12 rounded-full overflow-hidden border border-border-light dark:border-border-dark group hover:border-primary transition-colors ${className}`}>
                {user?.picture ? (
                    <img
                        src={user.picture}
                        alt={user.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                        <FaUser className="text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                )}
            </Link>
        );
    }

    // Guest State
    if (isMobile) {
        return (
            <NavLink
                to="/signin"
                className={({ isActive }) =>
                    `flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300 w-full ${
                        isActive
                            ? 'text-primary bg-primary/10'
                            : 'text-text-muted-light dark:text-text-muted-dark hover:bg-black/5 dark:hover:bg-white/5'
                    } ${className}`
                }>
                <FaSignInAlt className="text-xl mb-0.5" />
                <span className="text-[10px] font-bold tracking-wide truncate max-w-[64px]">
                    {t('auth.signin')}
                </span>
            </NavLink>
        );
    }

    return (
        <Link to="/signin" className={`btn btn-secondary ${className}`}>
            {t('auth.signin')}
        </Link>
    );
}
