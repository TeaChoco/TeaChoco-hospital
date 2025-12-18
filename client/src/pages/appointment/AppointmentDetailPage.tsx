//-Path: "TeaChoco-Hospital/client/src/pages/appointment/AppointmentDetailPage.tsx"
import { Allow } from '../../types/auth';
import DetailLayout from '../../components/layout/DetailLayout';
import { useAppointments } from '../../context/appointmentsAtom';
import { FaUserMd, FaHospital, FaNotesMedical, FaStethoscope } from 'react-icons/fa';

export default function AppointmentDetailPage() {
    const appointments = useAppointments();

    const formatDate = (date: Date | string) => {
        return new Date(date).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (date: Date | string) => {
        return new Date(date).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <DetailLayout
            allow={Allow.APPOINTMENTS}
            find={(id) => appointments?.find((appointment) => appointment._id === id)}>
            {(appointment) => (
                <div className="bg-bg-card-light dark:bg-bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
                    <div className="p-6 md:p-8 bg-linear-to-br from-primary/5 to-accent/5 border-b border-border-light dark:border-border-dark">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <span className="inline-block px-3 py-1 bg-white dark:bg-slate-800 rounded-full text-xs font-bold uppercase tracking-wider text-primary mb-3 shadow-sm">
                                    {appointment.status}
                                </span>
                                <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-1">
                                    {appointment.purpose}
                                </h1>
                                <p className="text-text-muted-light dark:text-text-muted-dark flex items-center gap-2">
                                    <span className="capitalize">{appointment.type}</span> •{' '}
                                    {appointment.department}
                                </p>
                            </div>
                            <div className="text-right flex flex-col items-start md:items-end">
                                <div className="text-2xl font-bold text-text-light dark:text-text-dark">
                                    {formatTime(appointment.scheduledTime)}
                                </div>
                                <div className="text-text-secondary-light dark:text-text-secondary-dark">
                                    {formatDate(appointment.scheduledDate)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Doctor Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-text-light dark:text-text-dark border-b border-border-light dark:border-border-dark pb-2">
                                Doctor & Location
                            </h3>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-primary">
                                    <FaUserMd size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-text-light dark:text-text-dark">
                                        {appointment.doctor?.firstName}{' '}
                                        {appointment.doctor?.lastName}
                                    </p>
                                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                                        {appointment.doctor?.department}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-accent-secondary">
                                    <FaHospital size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-text-light dark:text-text-dark">
                                        {appointment.hospital?.name}
                                    </p>
                                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                                        {appointment.location}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-text-light dark:text-text-dark border-b border-border-light dark:border-border-dark pb-2">
                                Details
                            </h3>

                            {appointment.preparation?.instructions?.length > 0 && (
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-amber-500">
                                        <FaNotesMedical size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-text-light dark:text-text-dark mb-1">
                                            Preparation
                                        </p>
                                        <ul className="list-disc list-inside text-sm text-text-secondary-light dark:text-text-secondary-dark space-y-1">
                                            {appointment.preparation.instructions.map((inst, i) => (
                                                <li key={i}>{inst}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-indigo-500">
                                    <FaStethoscope size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-text-light dark:text-text-dark">
                                        Avg. Duration
                                    </p>
                                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                        {appointment.expectedDuration} minutes
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DetailLayout>
    );
}
