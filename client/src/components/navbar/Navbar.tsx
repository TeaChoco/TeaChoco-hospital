//-Path: "TeaChoco-Hospital/client/src/components/navbar/Navbar.tsx"
import SelectLang from './SelectLang';
import ThemeToggle from './ThemeToggle';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getNavItems } from '../../constants/navigation';
import { NavbarLink, SignBtn } from './Custom';

export default function Navbar() {
    const { t } = useTranslation();
    const navItems = getNavItems(t);

    return (
        <header className="flex items-center justify-between px-4 md:px-8 py-4 sticky top-0 z-50 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-xl border-b border-border-light dark:border-border-dark transition-all duration-200">
            <Link to="/" className="text-2xl font-bold no-underline">
                <span className="linear-text">{t('navbar.appName')}</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 xl:gap-6">
                {navItems.map((item) => (
                    <NavbarLink key={item.path} to={item.path} icon={item.icon}>
                        {item.label}
                    </NavbarLink>
                ))}
            </div>

            <div className="flex items-center gap-2">
                <div className="hidden md:flex">
                    <SignBtn />
                </div>
                <ThemeToggle />
                <SelectLang />
            </div>
        </header>
    );
}
