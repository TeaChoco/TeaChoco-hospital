//-Path: "TeaChoco-Hospital/client/src/layout/BottomNav.tsx"
import { SignBtn } from './Custom';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getNavItems } from '../../constants/navigation';

export default function BottomNav() {
    const { t } = useTranslation();

    // Get base nav items
    const baseNavItems = getNavItems(t);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-xl border-t border-border-light dark:border-border-dark md:hidden pb-safe">
            <div className="flex justify-between items-center px-4 py-3">
                {baseNavItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300 w-full ${
                                isActive
                                    ? 'text-primary bg-primary/10'
                                    : 'text-text-muted-light dark:text-text-muted-dark hover:bg-black/5 dark:hover:bg-white/5'
                            }`
                        }>
                        <item.icon className="text-xl mb-0.5" />
                        <span className="text-[10px] font-bold tracking-wide truncate max-w-[64px]">
                            {item.label}
                        </span>
                    </NavLink>
                ))}
                <div className="flex justify-center w-full">
                    <SignBtn />
                </div>
            </div>
        </div>
    );
}
