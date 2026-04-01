//-Path: "TeaChoco-Hospital/client/src/components/admin/layout/Layout.tsx"
import {
    FiMenu,
    FiUsers,
    FiLogOut,
    FiShield,
    FiDatabase,
    FiArrowLeft,
    FiChevronRight,
} from 'react-icons/fi';
import Loading from '../../custom/Loading';
import { Role } from '../../../types/auth';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';

const navItems = [
    { path: '/admin/users', label: 'จัดการผู้ใช้', icon: FiUsers, exact: true },
    { path: '/admin/data', label: 'จัดการข้อมูล', icon: FiDatabase, exact: false },
];

export default function AdminLayout() {
    const location = useLocation();
    const { user, loading, signout } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    if (loading) return <Loading />;
    if (!user || user.role !== Role.ADMIN) return <Navigate to="/" replace />;

    const isActive = (path: string, exact?: boolean) =>
        exact ? location.pathname === path : location.pathname.startsWith(path);

    return (
        <div className="flex min-h-screen bg-bg-light dark:bg-bg-dark">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs md:hidden animate-fadeIn"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed z-50 md:sticky md:top-0 flex flex-col h-screen w-72 bg-bg-card-light dark:bg-bg-card-dark border-r border-border-light dark:border-border-dark transition-transform duration-300 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}>
                <div className="flex items-center gap-3 p-6 border-b border-border-light dark:border-border-dark">
                    <div className="p-2.5 bg-primary/10 rounded-xl">
                        <FiShield className="text-primary" size={22} />
                    </div>
                    <div>
                        <h2 className="text-lg font-black tracking-tight text-text-light dark:text-text-dark">
                            Admin
                        </h2>
                        <p className="text-[11px] font-medium text-text-muted-light dark:text-text-muted-dark">
                            แผงควบคุมผู้ดูแลระบบ
                        </p>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const active = isActive(item.path, item.exact);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                                    active
                                        ? 'bg-primary/10 text-primary shadow-sm'
                                        : 'text-text-muted-light dark:text-text-muted-dark hover:bg-bg-card-hover-light dark:hover:bg-bg-card-hover-dark hover:text-text-light dark:hover:text-text-dark'
                                }`}>
                                <item.icon
                                    size={18}
                                    className={
                                        active
                                            ? 'text-primary'
                                            : 'group-hover:text-primary transition-colors'
                                    }
                                />
                                {item.label}
                                {active && (
                                    <FiChevronRight className="ml-auto text-primary/50" size={14} />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-border-light dark:border-border-dark space-y-2">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center shrink-0">
                            {user.picture ? (
                                <img
                                    src={user.picture}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <FiUsers className="text-primary" size={16} />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-text-light dark:text-text-dark truncate">
                                {user.name}
                            </p>
                            <p className="text-[11px] text-text-muted-light dark:text-text-muted-dark truncate">
                                {user.email}
                            </p>
                        </div>
                    </div>
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-text-muted-light dark:text-text-muted-dark hover:bg-bg-card-hover-light dark:hover:bg-bg-card-hover-dark transition-colors">
                        <FiArrowLeft size={16} />
                        กลับหน้าหลัก
                    </Link>
                    <button
                        onClick={signout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors">
                        <FiLogOut size={16} />
                        ออกจากระบบ
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0">
                <header className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark md:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-lg hover:bg-bg-card-light dark:hover:bg-bg-card-dark transition-colors">
                        <FiMenu size={20} />
                    </button>
                    <div className="flex items-center gap-2">
                        <FiShield className="text-primary" size={18} />
                        <span className="font-bold text-text-light dark:text-text-dark">
                            Admin Panel
                        </span>
                    </div>
                </header>

                <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
