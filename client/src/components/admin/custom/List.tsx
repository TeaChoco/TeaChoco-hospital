//-Path: "TeaChoco-Hospital/client/src/components/admin/custom/List.tsx"
import React from 'react';
import { Link } from 'react-router-dom';
import type { Doctor } from '../../../types/doctor';
import type { Hospital } from '../../../types/hospital';
import type { Medicine } from '../../../types/medicine';
import type { Appointment } from '../../../types/appointment';
import { FaHospital, FaUserDoctor } from 'react-icons/fa6';
import { FiUser, FiEdit2, FiTrash2, FiPackage, FiActivity, FiCalendar } from 'react-icons/fi';

interface ListItemProps {
    icon: React.ReactNode;
    title: React.ReactNode;
    subtitle: React.ReactNode;
    middle?: React.ReactNode;
    userName: string;
    userPicture?: string;
    viewUrl: string;
    editUrl: string;
    onDelete: () => void;
}

function ListItem({
    icon,
    title,
    subtitle,
    middle,
    userName,
    userPicture,
    viewUrl,
    editUrl,
    onDelete,
}: ListItemProps) {
    return (
        <div className="group flex flex-col md:flex-row md:items-center gap-3 md:gap-4 px-5 py-4 rounded-2xl border border-border-light dark:border-border-dark bg-bg-card-light dark:bg-bg-card-dark hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center shrink-0">
                    {icon}
                </div>
                <div className="min-w-0">
                    <p className="font-bold text-sm text-text-light dark:text-text-dark truncate">
                        {title}
                    </p>
                    <p className="text-[11px] text-text-muted-light dark:text-text-muted-dark truncate">
                        {subtitle}
                    </p>
                </div>
            </div>
            {middle && <div className="hidden md:block">{middle}</div>}
            <div className="flex items-center gap-2 text-xs text-text-muted-light dark:text-text-muted-dark">
                <div className="w-5 h-5 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                    {userPicture ? (
                        <img
                            src={userPicture}
                            alt={userName}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <FiUser size={10} />
                    )}
                </div>
                <span className="truncate max-w-[150px]">{userName}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
                <Link
                    to={viewUrl}
                    className="p-2 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:text-primary hover:bg-primary/10 transition-all">
                    <FiActivity size={15} />
                </Link>
                <Link
                    to={editUrl}
                    className="p-2 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:text-primary hover:bg-primary/10 transition-all">
                    <FiEdit2 size={15} />
                </Link>
                <button
                    onClick={onDelete}
                    className="p-2 rounded-lg text-text-muted-light dark:text-text-muted-dark hover:text-red-500 hover:bg-red-500/10 transition-all">
                    <FiTrash2 size={15} />
                </button>
            </div>
        </div>
    );
}

export function DoctorsList({
    doctors,
    onDelete,
    getUserInfo,
}: {
    doctors: Doctor[];
    getUserInfo: (id: string) => { name: string; picture?: string };
    onDelete: (id: string, name: string) => void;
}) {
    return (
        <>
            {doctors.map((doctor) => {
                const user = getUserInfo(doctor.user_id);
                return (
                    <ListItem
                        key={doctor._id}
                        icon={
                            doctor.picture ? (
                                <img
                                    src={doctor.picture}
                                    alt={doctor.firstName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="bg-blue-500/10 w-full h-full flex items-center justify-center">
                                    <FaUserDoctor className="text-blue-500" size={18} />
                                </div>
                            )
                        }
                        title={`${doctor.firstName} ${doctor.lastName}`}
                        subtitle={`${doctor.department} ${doctor.nickname ? `(${doctor.nickname})` : ''}`}
                        userName={user.name}
                        userPicture={user.picture}
                        viewUrl={`/admin/data/${doctor.user_id}/doctors/${doctor._id}`}
                        editUrl={`/admin/data/${doctor.user_id}/doctors/edit/${doctor._id}`}
                        onDelete={() =>
                            onDelete(doctor._id, `${doctor.firstName} ${doctor.lastName}`)
                        }
                    />
                );
            })}
        </>
    );
}

export function HospitalsList({
    hospitals,
    onDelete,
    getUserInfo,
}: {
    hospitals: Hospital[];
    getUserInfo: (id: string) => { name: string; picture?: string };
    onDelete: (id: string, name: string) => void;
}) {
    return (
        <>
            {hospitals.map((hospital) => {
                const user = getUserInfo(hospital.user_id);
                return (
                    <ListItem
                        key={hospital._id}
                        icon={
                            <div className="bg-emerald-500/10 w-full h-full flex items-center justify-center">
                                <FaHospital className="text-emerald-500" size={18} />
                            </div>
                        }
                        title={hospital.name}
                        subtitle={hospital.address || 'ไม่ระบุที่อยู่'}
                        middle={
                            <span className="text-xs text-text-muted-light dark:text-text-muted-dark truncate max-w-[150px]">
                                {hospital.contactNumber || '-'}
                            </span>
                        }
                        userName={user.name}
                        userPicture={user.picture}
                        viewUrl={`/admin/data/${hospital.user_id}/hospitals/${hospital._id}`}
                        editUrl={`/admin/data/${hospital.user_id}/hospitals/edit/${hospital._id}`}
                        onDelete={() => onDelete(hospital._id, hospital.name)}
                    />
                );
            })}
        </>
    );
}

export function MedicinesList({
    medicines,
    onDelete,
    getUserInfo,
}: {
    medicines: Medicine[];
    getUserInfo: (id: string) => { name: string; picture?: string };
    onDelete: (id: string, name: string) => void;
}) {
    return (
        <>
            {medicines.map((medicine) => {
                const user = getUserInfo(medicine.user_id);
                return (
                    <ListItem
                        key={medicine._id}
                        icon={
                            medicine.imageUrl && medicine.imageUrl.length > 0 ? (
                                <img
                                    src={medicine.imageUrl[0]}
                                    alt={medicine.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            ) : (
                                <div className="bg-orange-500/10 w-full h-full flex items-center justify-center">
                                    <FiPackage className="text-orange-500" size={18} />
                                </div>
                            )
                        }
                        title={medicine.name}
                        subtitle={`${medicine.genericName} ${medicine.brand ? `• ${medicine.brand}` : ''}`}
                        middle={
                            <span
                                className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                                    medicine.isActive
                                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                        : 'bg-slate-500/10 text-slate-500 border-slate-500/20'
                                }`}>
                                {medicine.isActive ? 'ใช้งาน' : 'ปิดการใช้'}
                            </span>
                        }
                        userName={user.name}
                        userPicture={user.picture}
                        viewUrl={`/admin/data/${medicine.user_id}/medicines/${medicine._id}`}
                        editUrl={`/admin/data/${medicine.user_id}/medicines/edit/${medicine._id}`}
                        onDelete={() => onDelete(medicine._id, medicine.name)}
                    />
                );
            })}
        </>
    );
}

export function AppointmentsList({
    onDelete,
    appointments,
    getUserInfo,
}: {
    appointments: Appointment[];
    getUserInfo: (id: string) => { name: string; picture?: string };
    onDelete: (id: string, name: string) => void;
}) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'pending':
                return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'cancelled':
                return 'bg-red-500/10 text-red-500 border-red-500/20';
            case 'confirmed':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'in_progress':
                return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
            default:
                return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    return (
        <>
            {appointments.map((appointment) => {
                const user = getUserInfo(appointment.user_id);
                return (
                    <ListItem
                        key={appointment._id}
                        icon={
                            <div className="bg-indigo-500/10 w-full h-full flex items-center justify-center">
                                <FiCalendar className="text-indigo-500" size={18} />
                            </div>
                        }
                        title={appointment.purpose || 'ไม่ระบุวัตถุประสงค์'}
                        subtitle={
                            <>
                                {appointment.department}
                                {appointment.doctor
                                    ? ` • ${appointment.doctor.firstName} ${appointment.doctor.lastName}`
                                    : ''}
                            </>
                        }
                        middle={
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-[10px] text-text-muted-light dark:text-text-muted-dark font-medium">
                                    {new Date(appointment.scheduledDate).toLocaleDateString(
                                        'th-TH',
                                        {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        },
                                    )}
                                </span>
                                <span
                                    className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(appointment.status)}`}>
                                    {appointment.status}
                                </span>
                            </div>
                        }
                        userName={user.name}
                        userPicture={user.picture}
                        viewUrl={`/admin/data/${appointment.user_id}/appointments/${appointment._id}`}
                        editUrl={`/admin/data/${appointment.user_id}/appointments/edit/${appointment._id}`}
                        onDelete={() => onDelete(appointment._id, appointment.purpose)}
                    />
                );
            })}
        </>
    );
}
