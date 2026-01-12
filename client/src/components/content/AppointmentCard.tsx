//-Path: "TeaChoco-Hospital/client/src/components/content/AppointmentCard.tsx"
import { FaClock, FaCalendar, FaHospital, FaStethoscope, FaLocationArrow } from 'react-icons/fa6';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import type { Appointment } from '../../types/appointment';

export function AppointmentCard({
    onClick,
    appointment,
}: {
    appointment: Appointment;
    onClick?: (appointment: Appointment) => void;
}) {
    const { t } = useTranslation();

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
            case 'pending':
                return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
            case 'cancelled':
                return 'bg-red-500/10 text-red-600 border-red-500/20';
            default:
                return 'bg-primary/10 text-primary border-primary/20';
        }
    };

    const getUrgencyStyles = (urgency: string) => {
        switch (urgency) {
            case 'emergency':
                return 'bg-red-500 text-white shadow-red-500/20';
            case 'urgent':
                return 'bg-amber-500 text-white shadow-amber-500/20';
            default:
                return 'bg-slate-100 dark:bg-slate-800 text-text-muted-light dark:text-text-muted-dark';
        }
    };

    return (
        <div
            onClick={() => onClick?.(appointment)}
            className="group relative bg-bg-card-light dark:bg-bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark p-6 hover:shadow-xl hover:border-primary/50 transition-all duration-500 cursor-pointer flex flex-col gap-5 overflow-hidden">
            {/* Decoration Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-colors duration-500" />

            {/* Header: Identity & Status */}
            <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest opacity-70">
                        {appointment.appointmentNumber ||
                            `#${appointment._id.slice(-6).toUpperCase()}`}
                    </p>
                    <h3 className="text-xl font-black text-text-light dark:text-text-dark leading-tight group-hover:text-primary transition-colors line-clamp-1">
                        {appointment.purpose}
                    </h3>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                    <span
                        className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border transition-all ${getStatusStyles(
                            appointment.status,
                        )}`}>
                        {appointment.status}
                    </span>
                    {appointment.urgency !== 'routine' && (
                        <span
                            className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase shadow-sm ${getUrgencyStyles(
                                appointment.urgency,
                            )}`}>
                            {appointment.urgency}
                        </span>
                    )}
                </div>
            </div>

            {/* Content: Provider Info */}
            <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-border-light/50 dark:border-border-dark/50 group-hover:bg-white dark:group-hover:bg-slate-800 transition-colors">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <FaHospital size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-bold text-text-muted-light dark:text-text-muted-dark uppercase leading-none mb-1">
                            {t('appointments.doctor')}
                        </p>
                        <p className="text-sm font-black text-text-light dark:text-text-dark truncate">
                            {appointment.doctor
                                ? `${appointment.doctor.firstName} ${appointment.doctor.lastName}`
                                : t('common.tba')}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6 px-1">
                    <div className="flex items-center gap-2">
                        <div className="text-primary/60">
                            <FaCalendar size={12} />
                        </div>
                        <p className="text-xs font-bold text-text-secondary-light dark:text-text-secondary-dark">
                            {moment(appointment.scheduledDate).format('DD MMM YYYY')}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="text-primary/60">
                            <FaClock size={12} />
                        </div>
                        <p className="text-xs font-black text-text-light dark:text-text-dark">
                            {moment(appointment.scheduledTime).format('HH:mm')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Metadata */}
            <div className="mt-auto pt-4 border-t border-border-light dark:border-border-dark flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 max-w-[60%]">
                    <FaLocationArrow size={10} className="text-text-muted-light" />
                    <p className="text-[10px] font-medium text-text-muted-light dark:text-text-muted-dark truncate">
                        {appointment.department} · {appointment.roomNumber || t('common.tba')}
                    </p>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
                    <FaStethoscope size={10} className="text-primary" />
                    <p className="text-[9px] font-black text-text-light dark:text-text-dark uppercase tracking-tighter">
                        {appointment.type}
                    </p>
                </div>
            </div>
        </div>
    );
}
