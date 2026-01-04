//-Path: "TeaChoco-Hospital/client/src/components/layout/Navbar.tsx"
import {
    FaBars,
    FaUser,
    FaTimes,
    FaPills,
    FaUserMd,
    FaCalendar,
    FaHospital,
    FaCalendarAlt,
} from 'react-icons/fa';
import { useState } from 'react';
import SelectLang from './SelectLang';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isAuthenticated, signout } = useAuth();

    const NavbarLink = ({
        to,
        children,
        icon: Icon,
    }: {
        to: string;
        children: React.ReactNode;
        icon?: React.ElementType;
    }) => (
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

    const MenuLink = ({
        to,
        children,
        icon: Icon,
    }: {
        to: string;
        children: React.ReactNode;
        icon?: React.ElementType;
    }) => (
        <NavLink
            to={to}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
                `btn flex gap-1 sm:gap-2 px-4 sm:px-6 text-base justify-start font-medium ${
                    isActive ? 'btn-primary-active' : ''
                }`
            }>
            {Icon && <Icon className="text-base xl:text-lg" />}
            {children}
        </NavLink>
    );

    const SignBtn = ({ className }: { className?: string }) =>
        isAuthenticated ? (
            <button onClick={signout} className={`btn btn-secondary ${className}`}>
                {t('auth.signout')}
            </button>
        ) : (
            <Link to="/signin" className={`btn btn-secondary ${className}`}>
                {t('auth.signin')}
            </Link>
        );

    return (
        <header className="flex items-center justify-between px-4 md:px-8 py-4 sticky top-0 z-50 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-xl border-b border-border-light dark:border-border-dark transition-all duration-200">
            <Link to="/" className="text-2xl font-bold no-underline">
                <span className="linear-text">{t('navbar.appName')}</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 xl:gap-6">
                <NavbarLink to="/hospitals" icon={FaHospital}>
                    {t('navbar.hospitals')}
                </NavbarLink>
                <NavbarLink to="/appointments" icon={FaCalendarAlt}>
                    {t('navbar.appointments')}
                </NavbarLink>
                <NavbarLink to="/doctors" icon={FaUserMd}>
                    {t('navbar.doctors')}
                </NavbarLink>
                <NavbarLink to="/medicines" icon={FaPills}>
                    {t('navbar.medicines')}
                </NavbarLink>
                <NavbarLink to="/calendar" icon={FaCalendar}>
                    {t('navbar.calendar')}
                </NavbarLink>
            </div>

            <div className="flex items-center gap-2">
                <div className="hidden md:flex">
                    {isAuthenticated ? (
                        <Link
                            to="/profile"
                            className="w-12 h-12 rounded-full overflow-hidden border border-border-light dark:border-border-dark group hover:border-primary transition-colors">
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
                        <SignBtn />
                    )}
                </div>
                <ThemeToggle />
                <SelectLang />
                <button
                    className="md:hidden p-2 text-slate-600 dark:text-slate-200"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-bg-light dark:bg-bg-dark border-b border-border-light dark:border-border-dark p-4 flex flex-col gap-4 md:hidden shadow-lg animate-in slide-in-from-top-2">
                    <MenuLink to="/hospitals" icon={FaHospital}>
                        {t('navbar.hospitals')}
                    </MenuLink>
                    <MenuLink to="/appointments" icon={FaCalendarAlt}>
                        {t('navbar.appointments')}
                    </MenuLink>
                    <MenuLink to="/doctors" icon={FaUserMd}>
                        {t('navbar.doctors')}
                    </MenuLink>
                    <MenuLink to="/medicines" icon={FaPills}>
                        {t('navbar.medicines')}
                    </MenuLink>
                    <MenuLink to="/calendar" icon={FaCalendar}>
                        {t('navbar.calendar')}
                    </MenuLink>
                    {isAuthenticated && (
                        <MenuLink to="/profile" icon={FaUser}>
                            {t('navbar.profile')}
                        </MenuLink>
                    )}
                    <div className="pt-2 border-t border-border-light dark:border-border-dark">
                        <SignBtn className="w-full mt-2" />
                    </div>
                </div>
            )}
        </header>
    );
}
