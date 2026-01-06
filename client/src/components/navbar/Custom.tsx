//-Path: "TeaChoco-Hospital/client/src/components/navbar/Custom.tsx"
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { FaUser } from 'react-icons/fa';

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

export function SignBtn({ className }: { className?: string }) {
    const { t } = useTranslation();
    const { user, loading, isAuthenticated } = useAuth();

    return loading ? (
        <button className={`btn btn-dis ${className}`}>{t('common.loading')}</button>
    ) : isAuthenticated ? (
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
    ) : (
        <Link to="/signin" className={`btn btn-secondary ${className}`}>
            {t('auth.signin')}
        </Link>
    );
}
