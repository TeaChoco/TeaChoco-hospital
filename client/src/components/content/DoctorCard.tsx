//-Path: "TeaChoco-Hospital/client/src/components/DoctorCard.tsx"
import type { Doctor } from '../../types/doctor';
import { FaUserMd, FaPhone } from 'react-icons/fa';

interface DoctorCardProps {
    doctor: Doctor;
    onClick?: () => void;
}

export function DoctorCard({ doctor, onClick }: DoctorCardProps) {
    return (
        <div
            onClick={onClick}
            className="bg-bg-card-light dark:bg-bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-4 hover:shadow-md hover:border-primary transition-all duration-300 cursor-pointer flex flex-col items-center text-center group">
            <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden ring-4 ring-slate-50 dark:ring-slate-800 group-hover:ring-primary/20 transition-all">
                {doctor.picture ? (
                    <img
                        src={doctor.picture}
                        alt={`${doctor.firstName} ${doctor.lastName}`}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500">
                        <FaUserMd size={32} />
                    </div>
                )}
            </div>

            <h3 className="font-bold text-text-light dark:text-text-dark text-lg">
                {doctor.firstName} {doctor.lastName}
            </h3>
            {doctor.nickname && (
                <span className="text-sm text-text-muted-light dark:text-text-muted-dark mb-1">
                    ({doctor.nickname})
                </span>
            )}

            <div className="mt-2 inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {doctor.department}
            </div>

            {doctor.contactNumber && (
                <div className="mt-4 flex items-center text-sm text-text-secondary-light dark:text-text-secondary-dark gap-2">
                    <FaPhone size={12} className="text-primary" />
                    <span>{doctor.contactNumber}</span>
                </div>
            )}
        </div>
    );
}
