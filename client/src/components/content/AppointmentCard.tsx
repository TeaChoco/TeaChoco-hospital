//-Path: "TeaChoco-Hospital/client/src/components/appointment/AppointmentCard.tsx"
import { FaPhone } from 'react-icons/fa6';
import { FaHospital } from 'react-icons/fa';
import type { Appointment } from '../../types/appointment';

export function AppointmentCard({
    onClick,
    appointment,
}: {
    appointment: Appointment;
    onClick?: (appointment: Appointment) => void;
}) {
    return (
        <div
            onClick={() => onClick?.(appointment)}
            className="bg-bg-card-light dark:bg-bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-5 hover:shadow-md hover:border-primary transition-all duration-300 cursor-pointer flex flex-col h-full group">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <FaHospital size={24} />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-text-light dark:text-text-dark text-lg group-hover:text-primary transition-colors">
                        {appointment.appointmentNumber}
                    </h3>

                    <div className="mt-2 space-y-2">
                        {appointment.department && (
                            <div className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                <FaPhone
                                    size={14}
                                    className="shrink-0 text-text-muted-light dark:text-text-muted-dark"
                                />
                                <span>{appointment.department}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-4 flex gap-2"></div>
        </div>
    );
}
