//-Path: "TeaChoco-Hospital/client/src/pages/admin/AdminDataPage.tsx"
import React from 'react';
import { TabKey } from '../../../types/admin';
import {
    DoctorsList,
    HospitalsList,
    MedicinesList,
    AppointmentsList,
} from '../../../components/admin/custom/List';
import type { User } from '../../../types/auth';
import { useSwal } from '../../../hooks/useSwal';
import { userAPI } from '../../../services/user';
import Search from '../../../components/custom/Search';
import Select from '../../../components/custom/Select';
import Loading from '../../../components/custom/Loading';
import { useParams, useNavigate } from 'react-router-dom';
import { useDoctors } from '../../../store/useDoctorStore';
import { FaHospital, FaUserDoctor } from 'react-icons/fa6';
import { useHospitals } from '../../../store/useHospitalStore';
import { useMedicines } from '../../../store/useMedicineStore';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useAppointments } from '../../../store/useAppointmentStore';
import { FiUser, FiSearch, FiPackage, FiCalendar } from 'react-icons/fi';
import { doctorAPI, hospitalAPI, medicineAPI, appointmentAPI } from '../../../services/api';

interface TabConfig {
    key: TabKey;
    label: string;
    icon: React.ElementType;
    color: string;
}

const tabs: TabConfig[] = [
    { key: TabKey.DOCTORS, label: 'หมอ', icon: FaUserDoctor, color: 'bg-blue-500' },
    { key: TabKey.HOSPITALS, label: 'โรงพยาบาล', icon: FaHospital, color: 'bg-emerald-500' },
    { key: TabKey.MEDICINES, label: 'ยา', icon: FiPackage, color: 'bg-orange-500' },
    { key: TabKey.APPOINTMENTS, label: 'นัดหมาย', icon: FiCalendar, color: 'bg-indigo-500' },
];

export default function AdminDataPage() {
    const { fire } = useSwal();
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { uid, tab } = useParams<{ uid: string; tab: TabKey }>();
    const [activeTab, setActiveTab] = useState<TabKey>(tab || TabKey.DOCTORS);
    const [selectedUserId, setSelectedUserId] = useState<string>(!uid || uid === 'all' ? '' : uid);

    const { doctors, resetDoctors } = useDoctors();
    const { hospitals, resetHospitals } = useHospitals();
    const { medicines, resetMedicines } = useMedicines();
    const { appointments, resetAppointments } = useAppointments();

    const fetchUsers = useCallback(async () => {
        try {
            const response = await userAPI.findAll({ name: true, email: true, picture: true });
            setUsers(response.data || []);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        setSelectedUserId(!uid || uid === 'all' ? '' : uid);
    }, [uid]);

    useEffect(() => {
        if (tab) setActiveTab(tab);
    }, [tab]);

    const handleTabChange = (newTab: TabKey) => {
        setActiveTab(newTab);
        setSearchTerm('');
        navigate(`/admin/data/${selectedUserId || 'all'}/${newTab}`);
    };

    const handleUserChange = (userId: string) => {
        const targetUid = userId || 'all';
        navigate(`/admin/data/${targetUid}/${activeTab}`);
    };

    const userOptions = useMemo(
        () => [
            { value: '', label: 'ทั้งหมด (ผู้ใช้ทุกคน)' },
            ...users.map((user) => ({
                value: user.user_id,
                label: user.name || user.email || user.user_id,
            })),
        ],
        [users],
    );

    const filteredDoctors = useMemo(() => {
        if (!doctors) return [];
        return doctors.filter((doctor) => {
            const search = searchTerm.toLowerCase();
            const matchUser = !selectedUserId || doctor.user_id === selectedUserId;
            const matchSearch =
                !search ||
                doctor.firstName?.toLowerCase().includes(search) ||
                doctor.lastName?.toLowerCase().includes(search) ||
                doctor.department?.toLowerCase().includes(search) ||
                doctor.nickname?.toLowerCase().includes(search);
            return matchUser && matchSearch;
        });
    }, [doctors, searchTerm, selectedUserId]);

    const filteredHospitals = useMemo(() => {
        if (!hospitals) return [];
        return hospitals.filter((hospital) => {
            const search = searchTerm.toLowerCase();
            const matchUser = !selectedUserId || hospital.user_id === selectedUserId;
            const matchSearch =
                !search ||
                hospital.name?.toLowerCase().includes(search) ||
                hospital.address?.toLowerCase().includes(search);
            return matchUser && matchSearch;
        });
    }, [hospitals, searchTerm, selectedUserId]);

    const filteredMedicines = useMemo(() => {
        if (!medicines) return [];
        return medicines.filter((medicine) => {
            const search = searchTerm.toLowerCase();
            const matchUser = !selectedUserId || medicine.user_id === selectedUserId;
            const matchSearch =
                !search ||
                medicine.name?.toLowerCase().includes(search) ||
                medicine.genericName?.toLowerCase().includes(search) ||
                medicine.brand?.toLowerCase().includes(search);
            return matchUser && matchSearch;
        });
    }, [medicines, searchTerm, selectedUserId]);

    const filteredAppointments = useMemo(() => {
        if (!appointments) return [];
        return appointments.filter((appointment) => {
            const search = searchTerm.toLowerCase();
            const matchUser = !selectedUserId || appointment.user_id === selectedUserId;
            const matchSearch =
                !search ||
                appointment.purpose?.toLowerCase().includes(search) ||
                appointment.department?.toLowerCase().includes(search) ||
                appointment.doctor?.firstName?.toLowerCase().includes(search) ||
                appointment.doctor?.lastName?.toLowerCase().includes(search);
            return matchUser && matchSearch;
        });
    }, [appointments, searchTerm, selectedUserId]);

    const handleDeleteDoctor = async (id: string, name: string) => {
        const result = await fire({
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'ลบ',
            title: `ลบหมอ "${name}"?`,
        });
        if (result.isConfirmed) {
            await doctorAPI.remove(id);
            resetDoctors();
        }
    };

    const handleDeleteHospital = async (id: string, name: string) => {
        const result = await fire({
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'ลบ',
            title: `ลบโรงพยาบาล "${name}"?`,
        });
        if (result.isConfirmed) {
            await hospitalAPI.remove(id);
            resetHospitals();
        }
    };

    const handleDeleteMedicine = async (id: string, name: string) => {
        const result = await fire({
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'ลบ',
            title: `ลบยา "${name}"?`,
        });
        if (result.isConfirmed) {
            await medicineAPI.remove(id);
            resetMedicines();
        }
    };

    const handleDeleteAppointment = async (id: string, purpose: string) => {
        const result = await fire({
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'ลบ',
            title: `ลบนัดหมาย "${purpose}"?`,
        });
        if (result.isConfirmed) {
            await appointmentAPI.remove(id);
            resetAppointments();
        }
    };

    const getUserInfo = (userId: string) => {
        const user = users.find((u) => u.user_id === userId);
        return {
            name: user?.name || user?.email || userId?.slice(-8),
            picture: user?.picture,
        };
    };

    const currentData =
        activeTab === 'doctors'
            ? doctors
            : activeTab === 'hospitals'
              ? hospitals
              : activeTab === 'medicines'
                ? medicines
                : appointments;
    const currentFiltered =
        activeTab === 'doctors'
            ? filteredDoctors
            : activeTab === 'hospitals'
              ? filteredHospitals
              : activeTab === 'medicines'
                ? filteredMedicines
                : filteredAppointments;

    if (!currentData) return <Loading />;

    return (
        <div className="flex flex-col gap-6 animate-fadeIn">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-text-muted-light dark:text-text-muted-dark">
                    <span className="text-primary font-medium">จัดการข้อมูล</span>
                </div>
                <h1 className="text-3xl font-black tracking-tight text-text-light dark:text-text-dark">
                    จัดการข้อมูลทั้งหมด
                </h1>
                <p className="text-text-muted-light dark:text-text-muted-dark">
                    ดูและจัดการข้อมูลหมอ โรงพยาบาล ยา และนัดหมาย ของผู้ใช้ทุกคน
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                {tabs.map((tabConfig) => {
                    const count =
                        tabConfig.key === 'doctors'
                            ? filteredDoctors.length
                            : tabConfig.key === 'hospitals'
                              ? filteredHospitals.length
                              : tabConfig.key === 'medicines'
                                ? filteredMedicines.length
                                : filteredAppointments.length;
                    return (
                        <button
                            key={tabConfig.key}
                            onClick={() => handleTabChange(tabConfig.key)}
                            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                                activeTab === tabConfig.key
                                    ? 'bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20'
                                    : 'text-text-muted-light dark:text-text-muted-dark hover:bg-bg-card-hover-light dark:hover:bg-bg-card-hover-dark'
                            }`}>
                            <tabConfig.icon size={16} />
                            {tabConfig.label}
                            <span
                                className={`px-2 py-0.5 rounded-full text-[11px] font-black ${
                                    activeTab === tabConfig.key
                                        ? 'bg-primary/20 text-primary'
                                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                }`}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
                <Search
                    value={searchTerm}
                    setValue={setSearchTerm}
                    placeholder={`ค้นหา${tabs.find((t) => t.key === activeTab)?.label}...`}
                />
                <Select
                    options={userOptions}
                    value={selectedUserId}
                    placeholder="เลือกผู้ใช้"
                    icon={<FiUser size={16} />}
                    containerClassName="min-w-[220px]"
                    onChange={(event) => handleUserChange(event.target.value)}
                />
            </div>

            <div className="grid gap-3">
                {activeTab === 'doctors' && (
                    <DoctorsList
                        doctors={filteredDoctors}
                        getUserInfo={getUserInfo}
                        onDelete={handleDeleteDoctor}
                    />
                )}
                {activeTab === 'hospitals' && (
                    <HospitalsList
                        hospitals={filteredHospitals}
                        getUserInfo={getUserInfo}
                        onDelete={handleDeleteHospital}
                    />
                )}
                {activeTab === 'medicines' && (
                    <MedicinesList
                        medicines={filteredMedicines}
                        getUserInfo={getUserInfo}
                        onDelete={handleDeleteMedicine}
                    />
                )}
                {activeTab === 'appointments' && (
                    <AppointmentsList
                        appointments={filteredAppointments}
                        getUserInfo={getUserInfo}
                        onDelete={handleDeleteAppointment}
                    />
                )}

                {currentFiltered.length === 0 && (
                    <div className="text-center py-16">
                        <div className="bg-bg-card-light dark:bg-bg-card-dark w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <FiSearch
                                className="text-text-muted-light dark:text-text-muted-dark"
                                size={28}
                            />
                        </div>
                        <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-1">
                            ไม่พบข้อมูล
                        </h3>
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                            ลองปรับเปลี่ยนคำค้นหาหรือเลือกผู้ใช้อื่น
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
