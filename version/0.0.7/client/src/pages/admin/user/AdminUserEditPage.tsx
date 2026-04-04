//-Path: "TeaChoco-Hospital/client/src/pages/admin/AdminUserEditPage.tsx"
import {
    FiUser,
    FiMail,
    FiSave,
    FiImage,
    FiShield,
    FiClock,
    FiArrowLeft,
    FiChevronRight,
} from 'react-icons/fi';
import { Role } from '../../../types/auth';
import { useState, useEffect } from 'react';
import type { User } from '../../../types/auth';
import { userAPI } from '../../../services/user';
import { useSwal } from '../../../hooks/useSwal';
import Input from '../../../components/custom/Input';
import Paper from '../../../components/custom/Paper';
import Select from '../../../components/custom/Select';
import Loading from '../../../components/custom/Loading';
import InputImg from '../../../components/custom/InputImg';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function AdminUserEditPage() {
    const { id } = useParams();
    const { fire } = useSwal();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        const fetchUser = async () => {
            setIsLoading(true);
            try {
                const response = await userAPI.userId(id, {
                    auth: true,
                });
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
                setError('ไม่สามารถโหลดข้อมูลผู้ใช้ได้');
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!user || !id) return;

        setIsSaving(true);
        setError(null);
        try {
            await userAPI.update(id, {
                name: user.name,
                role: user.role,
                email: user.email,
                picture: user.picture,
                lastName: user.lastName,
                firstName: user.firstName,
            });
            await fire({
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                title: 'บันทึกสำเร็จ!',
                text: 'ข้อมูลผู้ใช้ถูกอัปเดตเรียบร้อยแล้ว',
            });
            navigate('/admin/users');
        } catch (error: any) {
            console.error('Failed to update user:', error);
            const serverError = error.response?.data?.message;
            setError(
                Array.isArray(serverError)
                    ? serverError.join(', ')
                    : typeof serverError === 'string'
                      ? serverError
                      : 'เกิดข้อผิดพลาดในการบันทึก',
            );
        } finally {
            setIsSaving(false);
        }
    };

    const roleOptions = [
        { value: Role.ADMIN, label: 'Admin (ผู้ดูแลระบบ)' },
        { value: Role.USER, label: 'User (ผู้ใช้ทั่วไป)' },
        { value: Role.VISITOR, label: 'Visitor (ผู้เยี่ยมชม)' },
    ];

    if (isLoading) return <Loading />;

    if (!user)
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
                <Paper
                    variant="100"
                    className="max-w-md w-full p-10 flex flex-col items-center text-center space-y-6 border-t-4 border-red-500 shadow-xl">
                    <div className="p-5 bg-red-50 dark:bg-red-900/20 rounded-full text-red-500 animate-pulse">
                        <FiUser size={48} />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-black text-text-light dark:text-text-dark tracking-tight">
                            ไม่พบผู้ใช้
                        </h2>
                        <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                            ไม่สามารถค้นหาผู้ใช้ที่ต้องการได้ ผู้ใช้อาจถูกลบออกจากระบบแล้ว
                        </p>
                    </div>
                    <Link
                        to="/admin/users"
                        className="btn btn-primary w-full flex items-center justify-center gap-2 group">
                        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        กลับไปหน้ารายชื่อผู้ใช้
                    </Link>
                </Paper>
            </div>
        );

    return (
        <div className="flex flex-col gap-6 animate-fadeIn">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-text-muted-light dark:text-text-muted-dark">
                    <Link to="/admin" className="hover:text-primary transition-colors">
                        แผงควบคุม
                    </Link>
                    <FiChevronRight size={14} />
                    <Link to="/admin/users" className="hover:text-primary transition-colors">
                        จัดการผู้ใช้
                    </Link>
                    <FiChevronRight size={14} />
                    <span className="text-primary font-medium">แก้ไข</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        to="/admin/users"
                        className="p-2 rounded-xl hover:bg-bg-card-light dark:hover:bg-bg-card-dark transition-colors">
                        <FiArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-text-light dark:text-text-dark">
                            แก้ไขผู้ใช้
                        </h1>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                            ID: {user.user_id}
                        </p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="animate-slideDown">
                    <Paper
                        variant="100"
                        className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-4 shadow-lg shadow-red-500/5">
                        <div className="p-2 bg-red-500/20 rounded-xl text-red-500 animate-pulse shrink-0">
                            <FiShield size={20} />
                        </div>
                        <div className="flex-1 space-y-1 py-1">
                            <p className="text-sm font-black text-red-600 dark:text-red-400 uppercase tracking-widest">
                                ข้อผิดพลาด
                            </p>
                            <p className="text-sm font-medium text-red-500/80 leading-relaxed">
                                {error}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setError(null)}
                            className="p-2 hover:bg-red-500/10 rounded-xl transition-colors text-red-500/50 hover:text-red-500 text-lg font-bold">
                            ✕
                        </button>
                    </Paper>
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary shadow-xs">
                                    <FiUser size={20} />
                                </div>
                                <h3 className="text-xl font-black text-text-light dark:text-text-dark tracking-tight">
                                    ข้อมูลส่วนตัว
                                </h3>
                            </div>

                            <Paper
                                variant="100"
                                className="p-6 space-y-6 border-l-4 border-primary/40">
                                <Input
                                    label="ชื่อที่แสดง"
                                    placeholder="ชื่อที่แสดงในระบบ"
                                    icon={<FiUser className="text-primary/60" />}
                                    value={user.name || ''}
                                    onChange={(event) =>
                                        setUser(
                                            (prev) => prev && { ...prev, name: event.target.value },
                                        )
                                    }
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        label="ชื่อจริง"
                                        placeholder="ชื่อจริง"
                                        icon={<FiUser className="text-primary/60" />}
                                        value={user.firstName || ''}
                                        onChange={(event) =>
                                            setUser(
                                                (prev) =>
                                                    prev && {
                                                        ...prev,
                                                        firstName: event.target.value,
                                                    },
                                            )
                                        }
                                    />
                                    <Input
                                        label="นามสกุล"
                                        placeholder="นามสกุล"
                                        icon={<FiUser className="text-primary/60" />}
                                        value={user.lastName || ''}
                                        onChange={(event) =>
                                            setUser(
                                                (prev) =>
                                                    prev && {
                                                        ...prev,
                                                        lastName: event.target.value,
                                                    },
                                            )
                                        }
                                    />
                                </div>
                                <Input
                                    label="อีเมล"
                                    type="email"
                                    placeholder="อีเมล"
                                    icon={<FiMail className="text-primary/60" />}
                                    value={user.email || ''}
                                    onChange={(event) =>
                                        setUser(
                                            (prev) =>
                                                prev && { ...prev, email: event.target.value },
                                        )
                                    }
                                />
                            </Paper>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500 shadow-xs">
                                    <FiShield size={20} />
                                </div>
                                <h3 className="text-xl font-black text-text-light dark:text-text-dark tracking-tight">
                                    สิทธิ์การเข้าถึง
                                </h3>
                            </div>

                            <Paper
                                variant="100"
                                className="p-6 space-y-6 border-l-4 border-indigo-500/40">
                                <Select
                                    label="บทบาท"
                                    options={roleOptions}
                                    icon={<FiShield className="text-indigo-500/60" />}
                                    value={user.role || Role.VISITOR}
                                    onChange={(event) =>
                                        setUser(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    role: event.target.value as Role,
                                                },
                                        )
                                    }
                                />
                            </Paper>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 shadow-xs">
                                    <FiImage size={20} />
                                </div>
                                <h3 className="text-xl font-black text-text-light dark:text-text-dark tracking-tight">
                                    รูปโปรไฟล์
                                </h3>
                            </div>

                            <Paper
                                variant="100"
                                className="p-6 space-y-6 border-l-4 border-amber-500/40">
                                <InputImg
                                    label="รูปภาพ"
                                    placeholder="เลือกหรืออัปโหลดรูปโปรไฟล์"
                                    value={user.picture || ''}
                                    setValue={(value) =>
                                        setUser((prev) => prev && { ...prev, picture: value })
                                    }
                                />
                            </Paper>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Paper className="p-6 overflow-hidden relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary to-accent" />
                            <div className="flex flex-col items-center text-center pt-4">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-primary/10 flex items-center justify-center mb-4 ring-4 ring-primary/10">
                                    {user.picture ? (
                                        <img
                                            src={user.picture}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <FiUser className="text-primary" size={32} />
                                    )}
                                </div>
                                <h3 className="text-lg font-black text-text-light dark:text-text-dark">
                                    {user.name || 'ไม่ระบุชื่อ'}
                                </h3>
                                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                                    {user.email || '-'}
                                </p>
                                <span
                                    className={`mt-3 inline-flex px-3 py-1 rounded-full text-xs font-bold border ${
                                        user.role === Role.ADMIN
                                            ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                            : user.role === Role.USER
                                              ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                              : 'bg-slate-500/10 text-slate-500 border-slate-500/20'
                                    }`}>
                                    {user.role || 'visitor'}
                                </span>
                            </div>
                        </Paper>

                        <Paper className="p-6">
                            <h3 className="text-sm font-bold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider mb-4 flex items-center gap-2">
                                <FiClock size={14} />
                                ไทม์ไลน์
                            </h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'สร้างเมื่อ', value: user.createdAt },
                                    { label: 'แก้ไขล่าสุด', value: user.updatedAt },
                                    { label: 'เข้าสู่ระบบล่าสุด', value: user.lastLoginAt },
                                ].map((item) => (
                                    <div key={item.label}>
                                        <p className="text-[11px] font-bold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider">
                                            {item.label}
                                        </p>
                                        <p className="text-sm font-semibold text-text-light dark:text-text-dark mt-0.5">
                                            {item.value
                                                ? new Date(item.value).toLocaleString('th-TH', {
                                                      day: 'numeric',
                                                      year: 'numeric',
                                                      hour: '2-digit',
                                                      month: 'short',
                                                      minute: '2-digit',
                                                  })
                                                : '-'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Paper>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="btn btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50">
                        <FiSave size={16} />
                        {isSaving ? 'กำลังบันทึก...' : 'บันทึกการเปลี่ยนแปลง'}
                    </button>
                    <Link
                        to="/admin/users"
                        className="btn hover:bg-bg-card-light dark:hover:bg-bg-card-dark flex items-center justify-center gap-2">
                        ยกเลิก
                    </Link>
                </div>
            </form>
        </div>
    );
}
