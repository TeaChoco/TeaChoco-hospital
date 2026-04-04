//-Path: "TeaChoco-Hospital/client/src/pages/admin/AdminUsersPage.tsx"
import {
    FiUser,
    FiMail,
    FiEdit2,
    FiTrash2,
    FiSearch,
    FiDatabase,
    FiChevronRight,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useSwal } from '../../../hooks/useSwal';
import { userAPI } from '../../../services/user';
import type { User, Role } from '../../../types/auth';
import Search from '../../../components/custom/Search';
import Loading from '../../../components/custom/Loading';
import { useState, useEffect, useMemo, useCallback } from 'react';

export default function AdminUsersPage() {
    const { fire } = useSwal();
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState<User[] | null>(null);
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

    const fetchUsers = useCallback(async () => {
        try {
            const response = await userAPI.findAll({
                name: true,
                role: true,
                email: true,
                picture: true,
                lastName: true,
                firstName: true,
                createdAt: true,
                lastLoginAt: true,
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            setUsers([]);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleFilterChange = (key: string, value: string) => {
        setActiveFilters((prev) => {
            const current = prev[key] || [];
            const next = current.includes(value)
                ? current.filter((item) => item !== value)
                : [...current, value];
            return { ...prev, [key]: next };
        });
    };

    const handleDelete = async (userId: string, userName?: string) => {
        const result = await fire({
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'ใช่, ลบเลย',
            title: 'ยืนยันการลบผู้ใช้',
            text: `คุณต้องการลบผู้ใช้ "${userName || userId}" จริงหรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้`,
        });

        if (result.isConfirmed) {
            try {
                await userAPI.remove(userId);
                fetchUsers();
            } catch (error) {
                console.error('Failed to delete user:', error);
            }
        }
    };

    const filteredUsers = useMemo(() => {
        if (!users) return [];
        return users.filter((user) => {
            const search = searchTerm.toLowerCase();
            const matchesSearch =
                !search ||
                user.name?.toLowerCase().includes(search) ||
                user.email?.toLowerCase().includes(search) ||
                user.user_id?.toLowerCase().includes(search) ||
                user.firstName?.toLowerCase().includes(search) ||
                user.lastName?.toLowerCase().includes(search);

            const roleFilter = activeFilters['role'] || [];
            const matchesRole = roleFilter.length === 0 || roleFilter.includes(user.role || '');

            return matchesSearch && matchesRole;
        });
    }, [users, searchTerm, activeFilters]);

    const filterOptions = [
        {
            key: 'role',
            label: 'บทบาท',
            options: [
                { value: 'admin', label: 'Admin' },
                { value: 'user', label: 'User' },
                { value: 'visitor', label: 'Visitor' },
            ],
        },
    ];

    const getRoleBadge = (role?: Role | string) => {
        switch (role) {
            case 'admin':
                return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'user':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            default:
                return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    if (!users) return <Loading />;

    return (
        <div className="flex flex-col gap-6 animate-fadeIn">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-text-muted-light dark:text-text-muted-dark">
                    <Link to="/admin" className="hover:text-primary transition-colors">
                        แผงควบคุม
                    </Link>
                    <FiChevronRight size={14} />
                    <span className="text-primary font-medium">จัดการผู้ใช้</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-text-light dark:text-text-dark">
                            จัดการผู้ใช้ทั้งหมด
                        </h1>
                        <p className="mt-1 text-text-muted-light dark:text-text-muted-dark">
                            ดูและจัดการข้อมูลผู้ใช้ในระบบ ทั้งหมด {users.length} คน
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 rounded-xl bg-primary/10 text-primary font-bold text-sm">
                            {filteredUsers.length} / {users.length} คน
                        </div>
                    </div>
                </div>
            </div>

            <Search
                value={searchTerm}
                setValue={setSearchTerm}
                placeholder="ค้นหาผู้ใช้ตามชื่อ, อีเมล, หรือ ID..."
                filterOptions={filterOptions}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
            />

            <div className="grid gap-4">
                <div className="hidden md:grid grid-cols-[auto_2fr_2fr_1fr_1fr_auto] gap-4 px-6 py-3 text-xs font-bold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark">
                    <span className="w-10" />
                    <span>ชื่อ</span>
                    <span>อีเมล</span>
                    <span>บทบาท</span>
                    <span>เข้าร่วมเมื่อ</span>
                    <span className="w-20">จัดการ</span>
                </div>

                {filteredUsers.map((userItem) => (
                    <div
                        key={userItem.user_id}
                        className="group grid grid-cols-1 md:grid-cols-[auto_2fr_2fr_1fr_1fr_auto] gap-3 md:gap-4 items-center px-4 md:px-6 py-4 rounded-2xl border border-border-light dark:border-border-dark bg-bg-card-light dark:bg-bg-card-dark hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                        <div className="flex items-center gap-3 md:gap-0">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center shrink-0 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                                {userItem.picture ? (
                                    <img
                                        src={userItem.picture}
                                        alt={userItem.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FiUser className="text-primary" size={16} />
                                )}
                            </div>
                            <div className="md:hidden flex-1 min-w-0">
                                <p className="font-bold text-text-light dark:text-text-dark truncate">
                                    {userItem.name ||
                                        `${userItem.firstName || ''} ${userItem.lastName || ''}`.trim() ||
                                        'ไม่ระบุชื่อ'}
                                </p>
                                <p className="text-xs text-text-muted-light dark:text-text-muted-dark truncate">
                                    {userItem.email || '-'}
                                </p>
                            </div>
                            <div className="md:hidden flex items-center gap-2">
                                <span
                                    className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold border ${getRoleBadge(userItem.role)}`}>
                                    {userItem.role || 'visitor'}
                                </span>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-3 min-w-0">
                            <div className="min-w-0">
                                <p className="font-semibold text-sm text-text-light dark:text-text-dark truncate">
                                    {userItem.name ||
                                        `${userItem.firstName || ''} ${userItem.lastName || ''}`.trim() ||
                                        'ไม่ระบุชื่อ'}
                                </p>
                                <p className="text-[11px] text-text-muted-light dark:text-text-muted-dark truncate">
                                    ID: {userItem.user_id?.slice(-8)}
                                </p>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center gap-2 min-w-0">
                            <FiMail
                                size={14}
                                className="text-text-muted-light dark:text-text-muted-dark shrink-0"
                            />
                            <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark truncate">
                                {userItem.email || '-'}
                            </span>
                        </div>

                        <div className="hidden md:block">
                            <span
                                className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold border ${getRoleBadge(userItem.role)}`}>
                                {userItem.role || 'visitor'}
                            </span>
                        </div>

                        <div className="hidden md:block text-sm text-text-muted-light dark:text-text-muted-dark">
                            {userItem.createdAt
                                ? new Date(userItem.createdAt).toLocaleDateString('th-TH', {
                                      day: 'numeric',
                                      year: 'numeric',
                                      month: 'short',
                                  })
                                : '-'}
                        </div>

                        <div className="flex items-center gap-1 justify-end md:w-20">
                            <Link
                                to={`/admin/data/${userItem.user_id}`}
                                className="p-2 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:text-primary hover:bg-primary/10 transition-all"
                                title="ดูข้อมูล">
                                <FiDatabase size={16} />
                            </Link>
                            <Link
                                to={`/admin/users/${userItem.user_id}`}
                                className="p-2 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:text-primary hover:bg-primary/10 transition-all"
                                title="แก้ไข">
                                <FiEdit2 size={16} />
                            </Link>
                            <button
                                onClick={() => handleDelete(userItem.user_id, userItem.name)}
                                className="p-2 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:text-red-500 hover:bg-red-500/10 transition-all"
                                title="ลบ">
                                <FiTrash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}

                {filteredUsers.length === 0 && (
                    <div className="text-center py-16 px-6">
                        <div className="bg-bg-card-light dark:bg-bg-card-dark w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <FiSearch
                                className="text-text-muted-light dark:text-text-muted-dark"
                                size={28}
                            />
                        </div>
                        <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-1">
                            ไม่พบผู้ใช้
                        </h3>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                            ลองปรับเปลี่ยนคำค้นหาหรือตัวกรอง
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
