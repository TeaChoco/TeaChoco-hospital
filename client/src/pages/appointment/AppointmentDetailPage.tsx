//-Path: "TeaChoco-Hospital/client/src/pages/appointment/AppointmentDetailPage.tsx"
import {
    FaClock,
    FaUserMd,
    FaHistory,
    FaHospital,
    FaStethoscope,
    FaNotesMedical,
} from 'react-icons/fa';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Title } from '../../types/types';
import { useTranslation } from 'react-i18next';
import Activity from '../../components/custom/Activity';
import DetailLayout from '../../components/layout/DetailLayout';
import { useAppointments } from '../../context/appointmentsAtom';

export default function AppointmentDetailPage() {
    const { t } = useTranslation();
    const { appointments } = useAppointments();

    return (
        <DetailLayout datas={appointments} title={Title.APPOINTMENTS}>
            {(appointment) => (
                <div className="bg-bg-card-light dark:bg-bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
                    {/* Header Section Compact Redesign */}
                    <div className="relative p-6 md:p-8 pt-16 md:pt-20 min-h-[280px] flex flex-col justify-end overflow-hidden border-b border-border-light dark:border-border-dark">
                        {/* Decorative Premium Background - More Subtle */}
                        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background-light to-accent/5 dark:from-primary/10 dark:via-background-dark dark:to-accent/10" />
                        <div className="absolute top-[-10%] right-[-5%] w-[350px] h-[350px] bg-primary/10 blur-[100px] rounded-full animate-pulse" />

                        <div className="relative z-1 w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
                            <div className="flex-1 space-y-6">
                                {/* Badges & Identity */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <div className="px-3 py-1 bg-white/60 dark:bg-black/30 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-xl shadow-sm">
                                        <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">
                                            {appointment.appointmentNumber ||
                                                `#APT-${appointment._id.slice(-6).toUpperCase()}`}
                                        </p>
                                    </div>
                                    <div
                                        className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all shadow-sm ${
                                            appointment.urgency === 'emergency'
                                                ? 'bg-red-500/10 text-red-600 border-red-500/20 shadow-red-500/5'
                                                : appointment.urgency === 'urgent'
                                                ? 'bg-amber-500/10 text-amber-600 border-amber-500/20 shadow-amber-500/5'
                                                : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 shadow-emerald-500/5'
                                        }`}>
                                        {appointment.urgency}
                                    </div>
                                    <div
                                        className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all shadow-sm ${
                                            appointment.status === 'completed'
                                                ? 'bg-blue-500/10 text-blue-600 border-blue-500/20 shadow-blue-500/5'
                                                : appointment.status === 'cancelled'
                                                ? 'bg-slate-500/10 text-slate-600 border-slate-500/20'
                                                : 'bg-primary/10 text-primary border-primary/20 shadow-primary/5'
                                        }`}>
                                        {appointment.status}
                                    </div>
                                </div>

                                {/* Main Title & Meta */}
                                <div className="space-y-3">
                                    <h1 className="text-4xl md:text-5xl font-black text-text-light dark:text-text-dark tracking-tight leading-[0.9] filter drop-shadow-sm">
                                        {appointment.purpose}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-6 pt-2">
                                        <div className="flex items-center gap-2.5 group">
                                            <div className="w-1 h-5 bg-primary rounded-full group-hover:h-7 transition-all duration-300" />
                                            <div>
                                                <p className="text-[9px] font-black text-text-muted-light dark:text-text-muted-dark uppercase tracking-widest leading-none mb-0.5">
                                                    {t('appointments.visitType')}
                                                </p>
                                                <p className="text-xs font-bold text-text-light dark:text-text-dark capitalize">
                                                    {appointment.type}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-px h-8 bg-border-light dark:border-border-dark hidden sm:block" />
                                        <div className="flex items-center gap-2.5">
                                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                                <FaHospital size={14} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-text-muted-light dark:text-text-muted-dark uppercase tracking-widest leading-none mb-0.5">
                                                    {t('appointments.department')}
                                                </p>
                                                <p className="text-xs font-bold text-text-light dark:text-text-dark">
                                                    {appointment.department}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hero Time Card - More Balanced */}
                            <div className="shrink-0 w-full lg:w-auto relative group">
                                <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-500 opacity-40" />
                                <div className="relative p-1 rounded-[2.5rem] bg-linear-to-br from-white/60 to-white/20 dark:from-white/20 dark:to-white/5 backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-lg">
                                    <div className="px-8 py-6 rounded-[2.3rem] bg-white dark:bg-slate-900 border border-white/10 flex flex-row items-center gap-8">
                                        <div className="flex flex-col items-center justify-center gap-1.5">
                                            <div className="p-3 bg-primary/5 dark:bg-primary/20 rounded-2xl text-primary shadow-inner">
                                                <FaClock size={20} />
                                            </div>
                                            <p className="text-[9px] font-black text-primary uppercase tracking-tighter">
                                                {appointment.expectedDuration}m
                                            </p>
                                        </div>

                                        <div className="h-14 w-px bg-border-light dark:border-border-dark" />

                                        <div className="flex flex-col">
                                            <p className="text-4xl font-black text-text-light dark:text-text-dark tracking-tighter leading-none mb-1">
                                                {moment(appointment.scheduledTime).format('HH:mm')}
                                            </p>
                                            <div className="flex flex-col">
                                                <p className="text-[9px] font-black text-primary uppercase tracking-[0.15em]">
                                                    {moment(appointment.scheduledDate).format(
                                                        'dddd',
                                                    )}
                                                </p>
                                                <p className="text-[11px] font-bold text-text-muted-light dark:text-text-muted-dark tracking-wide">
                                                    {moment(appointment.scheduledDate).format(
                                                        'DD MMM YYYY',
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-10 space-y-10">
                        {/* Information Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Left Side: Doctor & Location */}
                            <div className="space-y-6">
                                <h3 className="text-xs font-black text-text-muted-light dark:text-text-muted-dark uppercase tracking-[0.2em] flex items-center gap-2">
                                    <div className="w-6 h-px bg-primary/30" />
                                    {t('appointments.doctorClinicalLocation')}
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Activity visible={appointment.doctor}>
                                        <Link
                                            to={`/doctors/${appointment.doctor_id}`}
                                            className="group p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-border-light dark:border-border-dark hover:border-primary/50 transition-all">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="p-3 bg-white dark:bg-slate-700 rounded-xl text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                                    <FaUserMd size={20} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[10px] font-bold text-text-muted-light dark:text-text-muted-dark uppercase mb-1">
                                                        {t('appointments.attendingPhysician')}
                                                    </p>
                                                    <p className="font-bold text-text-light dark:text-text-dark group-hover:text-primary transition-colors">
                                                        {appointment.doctor?.firstName}{' '}
                                                        {appointment.doctor?.lastName}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-text-muted-light dark:text-text-muted-dark line-clamp-1 italic">
                                                {t('appointments.specializingIn')}{' '}
                                                {appointment.doctor?.department}
                                            </p>
                                        </Link>
                                    </Activity>

                                    <Activity visible={appointment.hospital}>
                                        <Link
                                            to={`/hospitals/${appointment.hospitalId}`}
                                            className="group p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-border-light dark:border-border-dark hover:border-accent-secondary/50 transition-all">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="p-3 bg-white dark:bg-slate-700 rounded-xl text-accent-secondary shadow-sm group-hover:bg-accent-secondary group-hover:text-white transition-all">
                                                    <FaHospital size={20} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[10px] font-bold text-text-muted-light dark:text-text-muted-dark uppercase mb-1">
                                                        {t('appointments.medicalCenter')}
                                                    </p>
                                                    <p className="font-bold text-text-light dark:text-text-dark group-hover:text-accent-secondary transition-colors line-clamp-1">
                                                        {appointment.hospital?.name}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-text-muted-light dark:text-text-muted-dark line-clamp-1 italic text-right capitalize">
                                                {t('appointments.room')}{' '}
                                                {appointment.roomNumber || t('common.tba')},{' '}
                                                {t('appointments.floor')} {appointment.floor || '-'}
                                            </p>
                                        </Link>
                                    </Activity>
                                </div>

                                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white  dark:bg-slate-800 flex items-center justify-center text-primary shadow-xs">
                                            <FaStethoscope />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-text-light dark:text-text-dark">
                                                {t('appointments.appointmentSubType')}
                                            </p>
                                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark capitalize">
                                                {appointment.subType || 'General Examination'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right space-y-4">
                                        <p className="text-xs font-bold text-text-light dark:text-text-dark">
                                            {t('appointments.patientClass')}
                                        </p>
                                        <p className="text-sm p-1.5 px-3 bg-white dark:bg-slate-800 rounded-lg shadow-xs text-primary font-bold inline-block capitalize">
                                            {appointment.patientType}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Preparation & Details */}
                            <div className="space-y-6">
                                <h3 className="text-xs font-black text-text-muted-light dark:text-text-muted-dark uppercase tracking-[0.2em] flex items-center gap-2">
                                    <div className="w-6 h-px bg-amber-500/30" />
                                    {t('appointments.protocolsPreparation')}
                                </h3>

                                <div className="space-y-4">
                                    {appointment.preparation?.instructions?.length > 0 ? (
                                        <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="p-2 bg-amber-100 dark:bg-amber-800 rounded-lg text-amber-600 dark:text-amber-400">
                                                    <FaNotesMedical />
                                                </div>
                                                <p className="font-black text-amber-700 dark:text-amber-400 uppercase text-xs tracking-wider">
                                                    {t('appointments.requiredInstructions')}
                                                </p>
                                            </div>
                                            <ul className="space-y-3">
                                                {appointment.preparation.instructions.map(
                                                    (inst, i) => (
                                                        <li
                                                            key={i}
                                                            className="flex items-start gap-3 text-sm text-amber-800 dark:text-amber-300">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                                                            {inst}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                            {appointment.preparation.fastingHours && (
                                                <div className="mt-4 p-3 bg-white/50 dark:bg-black/20 rounded-xl border border-amber-200/50 text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                                                    <FaClock size={12} />
                                                    {t('appointments.fastingRequired')}:{' '}
                                                    {appointment.preparation.fastingHours}{' '}
                                                    {t('appointments.hoursPrior')}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-200/50 dark:border-emerald-800/30 text-center">
                                            <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                                                {t('appointments.noPreparationRequired')}
                                            </p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl border border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800/40">
                                            <p className="text-[10px] font-black text-text-muted-light dark:text-text-muted-dark uppercase mb-2">
                                                {t('appointments.locationCode')}
                                            </p>
                                            <p className="text-sm font-bold text-text-light dark:text-text-dark flex items-center gap-2 capitalize">
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                                {appointment.location.replace('_', ' ')}
                                            </p>
                                        </div>
                                        <div className="p-4 rounded-xl border border-border-light dark:border-border-dark bg-slate-50 dark:bg-slate-800/40">
                                            <p className="text-[10px] font-black text-text-muted-light dark:text-text-muted-dark uppercase mb-2">
                                                {t('appointments.reminders')}
                                            </p>
                                            <p className="text-sm font-bold text-text-light dark:text-text-dark flex items-center gap-2">
                                                <div
                                                    className={`w-2 h-2 rounded-full ${
                                                        appointment.remindersSent
                                                            ? 'bg-emerald-500'
                                                            : 'bg-slate-300'
                                                    }`}
                                                />
                                                {appointment.remindersSent
                                                    ? t('appointments.notificationSent')
                                                    : t('appointments.pendingQueue')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Symptoms & Diagnosis Section */}
                        {appointment.symptoms?.length > 0 && (
                            <div className="pt-10 border-t border-border-light dark:border-border-dark space-y-6">
                                <h3 className="text-xs font-black text-text-muted-light dark:text-text-muted-dark uppercase tracking-[0.2em] flex items-center gap-2">
                                    <div className="w-6 h-px bg-indigo-500/30" />
                                    {t('appointments.symptomsPreliminaryDiagnosis')}
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {appointment.symptoms.map((symptom, idx) => (
                                        <div
                                            key={idx}
                                            className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark shadow-xs flex-1 min-w-[200px]">
                                            <div className="flex justify-between items-start mb-2">
                                                <p className="font-bold text-text-light dark:text-text-dark capitalize">
                                                    {symptom.description}
                                                </p>
                                                <span
                                                    className={`text-[10px] font-black uppercase p-1 px-2 rounded-md ${
                                                        symptom.severity === 'severe'
                                                            ? 'bg-red-100 text-red-600'
                                                            : symptom.severity === 'moderate'
                                                            ? 'bg-amber-100 text-amber-600'
                                                            : 'bg-blue-100 text-blue-600'
                                                    }`}>
                                                    {symptom.severity}
                                                </span>
                                            </div>
                                            <p className="text-xs text-text-muted-light dark:text-text-muted-dark italic">
                                                {t('appointments.duration')}:{' '}
                                                {symptom.duration || t('appointments.notSpecified')}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                {appointment.preliminaryDiagnosis && (
                                    <div className="p-6 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 italic font-medium shadow-xl">
                                        <span className="text-primary font-black not-italic uppercase text-[10px] tracking-widest block mb-2 opacity-70">
                                            {t('appointments.initialDiagnosisRef')}:
                                        </span>
                                        "{appointment.preliminaryDiagnosis}"
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Footer Notes & Payments */}
                        <div className="pt-10 border-t border-border-light dark:border-border-dark grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-text-muted-light dark:text-text-muted-dark uppercase tracking-widest">
                                    {t('appointments.medicalNotes')}
                                </h4>
                                <div className="space-y-4">
                                    {appointment.patientNotes &&
                                    appointment.patientNotes.length > 0 ? (
                                        appointment.patientNotes.map((note) => (
                                            <div
                                                key={note.noteId}
                                                className="p-4 rounded-xl bg-white dark:bg-slate-800/60 border border-border-light dark:border-border-dark shadow-xs">
                                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed italic">
                                                    "{note.content}"
                                                </p>
                                                <div className="mt-2 flex items-center justify-between text-[10px] font-bold text-primary/70 uppercase tracking-tighter">
                                                    <span>{note.author}</span>
                                                    <span>
                                                        {new Date(note.createdAt).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-border-light dark:border-border-dark text-sm text-text-muted-light dark:text-text-muted-dark italic text-center">
                                            {t('appointments.noNotesProvided')}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-text-muted-light dark:text-text-muted-dark uppercase tracking-widest">
                                    {t('appointments.billingSettlement')}
                                </h4>
                                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-border-light dark:border-border-dark flex items-center justify-between">
                                    <div>
                                        <p className="text-2xl font-black text-text-light dark:text-text-dark tracking-tight">
                                            {appointment.payment?.netAmount.toLocaleString()}{' '}
                                            <span className="text-sm font-bold opacity-50">
                                                {t('appointments.thb')}
                                            </span>
                                        </p>
                                        <p className="text-xs font-bold text-text-muted-light dark:text-text-muted-dark uppercase">
                                            {t('appointments.totalSettlement')}
                                        </p>
                                    </div>
                                    <div
                                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                            appointment.payment?.paymentStatus === 'paid'
                                                ? 'bg-emerald-100 text-emerald-600 border-emerald-200'
                                                : 'bg-red-100 text-red-600 border-red-200'
                                        }`}>
                                        {appointment.payment?.paymentStatus}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timestamp Footer */}
                    <div className="p-6 md:px-10 py-4 flex flex-col md:flex-row gap-4 border-t border-border-light dark:border-border-dark bg-slate-50/50 dark:bg-transparent">
                        <div className="flex items-center gap-2 text-text-muted-light dark:text-text-muted-dark">
                            <FaClock className="shrink-0" size={14} />
                            <span className="text-xs font-medium">{t('common.recorded')}:</span>
                            <span className="text-xs">
                                {appointment.createdAt
                                    ? moment(appointment.createdAt).format('DD MMM YYYY, HH:mm')
                                    : t('common.na')}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-text-muted-light dark:text-text-muted-dark">
                            <FaHistory className="shrink-0" size={14} />
                            <span className="text-xs font-medium">{t('common.modified')}:</span>
                            <span className="text-xs">
                                {appointment.updatedAt
                                    ? moment(appointment.updatedAt).format('DD MMM YYYY, HH:mm')
                                    : t('common.na')}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </DetailLayout>
    );
}
