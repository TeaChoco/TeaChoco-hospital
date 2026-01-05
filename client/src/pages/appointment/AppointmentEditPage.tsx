//-Path: "TeaChoco-Hospital/client/src/pages/appointment/AppointmentEditPage.tsx"
import {
    FaUser,
    FaVial,
    FaClock,
    FaHospital,
    FaRegCircle,
    FaUserDoctor,
    FaStethoscope,
    FaLocationDot,
    FaFileMedical,
    FaCalendarDays,
    FaTruckMedical,
    FaNotesMedical,
    FaHourglassHalf,
    FaCircleExclamation,
} from 'react-icons/fa6';
import { useMemo, useState } from 'react';
import Switch from '../../components/custom/Switch';
import {
    PatientType,
    UrgencyLevel,
    PaymentStatus,
    AppointmentType,
    type Appointment,
    AppointmentStatus,
    AppointmentLocation,
} from '../../types/appointment';
import { useTranslation } from 'react-i18next';
import Input from '../../components/custom/Input';
import Paper from '../../components/custom/Paper';
import Select from '../../components/custom/Select';
import { appointmentAPI } from '../../services/api';
import { useDoctors } from '../../context/doctorsAtom';
import { useHospitals } from '../../context/hospitalsAtom';
import { Title, type OutApiData } from '../../types/types';
import EditLayout from '../../components/layout/EditLayout';
import { useAppointments } from '../../context/appointmentsAtom';

export default function AppointmentEditPage() {
    const { t } = useTranslation();
    const { doctors, resetDoctors } = useDoctors();
    const { hospitals, resetHospitals } = useHospitals();
    const { appointments, resetAppointments } = useAppointments();

    const formatDate = (date: Date | undefined) =>
        date ? new Date(date).toISOString().split('T')[0] : '';
    const formatTime = (date: Date | undefined) =>
        date ? new Date(date).toTimeString().substring(0, 5) : '';

    const getAppointmentTypeIcon = (type: AppointmentType) => {
        if (type === AppointmentType.CONSULTATION) return <FaStethoscope />;
        if (type === AppointmentType.EMERGENCY) return <FaTruckMedical />;
        if (type === AppointmentType.VACCINATION) return <FaVial />;
        if (type === AppointmentType.FOLLOW_UP) return <FaClock />;
        return <FaNotesMedical />;
    };

    const getUrgencyIcon = (urgency: UrgencyLevel) => {
        if (urgency === UrgencyLevel.EMERGENCY)
            return <FaCircleExclamation className="text-red-500" />;
        if (urgency === UrgencyLevel.URGENT)
            return <FaCircleExclamation className="text-amber-500" />;
        return <FaRegCircle className="text-emerald-500" />;
    };

    const newData: OutApiData<Appointment> = useMemo(
        () => ({
            appointmentNumber: '',
            patientType: PatientType.NEW,
            hospitalId: '',
            doctor_id: '',
            department: '',
            type: AppointmentType.CONSULTATION,
            subType: '',
            purpose: '',
            description: '',
            scheduledDate: new Date(),
            scheduledTime: new Date(),
            expectedDuration: 30,
            location: AppointmentLocation.OPD,
            roomNumber: '',
            floor: '',
            status: AppointmentStatus.PENDING,
            statusHistory: [],
            urgency: UrgencyLevel.ROUTINE,
            preparation: {
                types: [],
                instructions: [],
            },
            remindersSent: false,
            symptoms: [],
            preliminaryDiagnosis: '',
            payment: {
                totalAmount: 0,
                patientResponsibility: 0,
                netAmount: 0,
                paidAmount: 0,
                balance: 0,
                paymentStatus: PaymentStatus.PENDING,
            },
            followUp: {
                isRequired: false,
            },
            patientNotes: [],
            nurseNotes: [],
            doctorNotes: [],
        }),
        [],
    );

    const NoteManager = <T extends 'patientNotes' | 'nurseNotes' | 'doctorNotes'>({
        type,
        label,
        authorDefault,
        icon,
        data,
        setData,
    }: {
        type: T;
        label: string;
        authorDefault: string;
        icon: React.ReactNode;
        data?: OutApiData<Appointment>;
        setData: React.Dispatch<React.SetStateAction<OutApiData<Appointment> | undefined>>;
    }) => {
        const inputId = `new-note-${type}`;
        const [isInternal, setIsInternal] = useState(type !== 'patientNotes');
        const notes = data?.[type] || [];

        return (
            <div className="space-y-4">
                <h4 className="text-sm font-bold text-text-muted-light dark:text-text-muted-dark uppercase tracking-wider flex items-center gap-2">
                    {icon}
                    {label}
                </h4>
                <div className="space-y-4">
                    {notes.map((note, index) => (
                        <div
                            key={note.noteId}
                            className={`p-4 rounded-xl border group relative transition-all ${
                                note.isInternal
                                    ? 'bg-slate-50/50 dark:bg-slate-800/20 border-border-light dark:border-border-dark italic opacity-80'
                                    : 'bg-white dark:bg-slate-800/40 border-primary/10 shadow-sm'
                            }`}>
                            <div className="flex items-start justify-between gap-4">
                                <p className="text-sm text-text-light dark:text-text-dark flex-1">
                                    {note.content}
                                </p>
                                {note.isInternal && (
                                    <div className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-[9px] font-black uppercase text-slate-500 tracking-wider">
                                        Internal
                                    </div>
                                )}
                            </div>
                            <div className="mt-2 flex items-center justify-between text-[10px] text-text-muted-light dark:text-text-muted-dark font-medium">
                                <span>{note.author}</span>
                                <span>{new Date(note.createdAt).toLocaleString()}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() =>
                                    setData(
                                        (prev) =>
                                            prev && {
                                                ...prev,
                                                [type]: notes.filter((_, i) => i !== index),
                                            },
                                    )
                                }
                                className="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/10 rounded-md">
                                <FaCircleExclamation size={12} />
                            </button>
                        </div>
                    ))}
                    <div className="flex flex-col gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/40 border border-dashed border-border-light dark:border-border-dark">
                        <div className="flex gap-2">
                            <Input
                                icon={icon}
                                id={inputId}
                                className="flex-1"
                                containerClassName="w-full"
                                placeholder={t('common.addNotePlaceholder', {
                                    defaultValue: 'Add a note...',
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const input = document.getElementById(
                                        inputId,
                                    ) as HTMLInputElement;
                                    const content = input?.value?.trim();
                                    if (content) {
                                        const newNote = {
                                            noteId: Math.random().toString(36).substring(2, 9),
                                            content,
                                            author: authorDefault,
                                            createdAt: new Date(),
                                            isInternal,
                                        };
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    [type]: [...(prev[type] || []), newNote],
                                                },
                                        );
                                        input.value = '';
                                    }
                                }}
                                className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-all shadow-md shadow-primary/20 hover:shadow-lg active:scale-95">
                                {t('common.add')}
                            </button>
                        </div>
                        <div className="flex items-center justify-between px-1">
                            <Switch
                                label={t('appointments.isInternalNote', {
                                    defaultValue: 'Internal Note (Staff only)',
                                })}
                                checked={isInternal}
                                onCheckedChange={setIsInternal}
                            />
                            <p className="text-[10px] text-text-muted-light dark:text-text-muted-dark font-medium italic">
                                {isInternal
                                    ? t('appointments.internalNoteHint', {
                                          defaultValue: 'Only visible to medical staff',
                                      })
                                    : t('appointments.externalNoteHint', {
                                          defaultValue: 'Visible to patient',
                                      })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <EditLayout<Appointment>
            newData={newData}
            title={Title.APPOINTMENTS}
            loading={appointments === undefined}
            onRemove={async (id) => {
                await appointmentAPI.remove(id);
                resetAppointments();
                resetHospitals();
                resetDoctors();
                return true;
            }}
            onSave={async (data, id) => {
                if (id === 'new') await appointmentAPI.create(data);
                else await appointmentAPI.update(id, data);
                resetAppointments();
                resetHospitals();
                resetDoctors();
                return true;
            }}
            find={(id) => appointments?.find((appointment) => appointment._id === id)}>
            {(data, setData) => (
                <div className="space-y-8">
                    {/* Section 1: Appointment Essentials */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <FaFileMedical size={20} />
                            </div>
                            <h3 className="text-xl font-black text-text-light dark:text-text-dark tracking-tight">
                                {t('appointments.sectionEssentials')}
                            </h3>
                        </div>

                        <Paper variant="100" className="p-6 space-y-6 border-l-4 border-primary/40">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    required
                                    label={t('appointments.purpose')}
                                    placeholder={t('appointments.purposePlaceholder')}
                                    icon={<FaStethoscope className="text-primary/60" />}
                                    value={data?.purpose}
                                    onChange={(e) =>
                                        setData(
                                            (prev) => prev && { ...prev, purpose: e.target.value },
                                        )
                                    }
                                />
                                <Input
                                    label={t('appointments.appointmentSubType')}
                                    placeholder={t('appointments.subTypePlaceholder', {
                                        defaultValue: 'e.g. Annual Checkup',
                                    })}
                                    icon={<FaStethoscope className="text-primary/10" />}
                                    value={data?.subType}
                                    onChange={(e) =>
                                        setData(
                                            (prev) => prev && { ...prev, subType: e.target.value },
                                        )
                                    }
                                />
                            </div>
                            <Input
                                label={t('appointments.description')}
                                placeholder={t('appointments.descriptionPlaceholder', {
                                    defaultValue: 'Additional details about the appointment',
                                })}
                                icon={<FaFileMedical size={16} className="text-primary/60" />}
                                value={data?.description}
                                onChange={(e) =>
                                    setData(
                                        (prev) => prev && { ...prev, description: e.target.value },
                                    )
                                }
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Select
                                    required
                                    label={t('appointments.patientStatus')}
                                    icon={<FaUser className="text-primary/60" />}
                                    value={data?.patientType}
                                    onChange={(e) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    patientType: e.target.value as PatientType,
                                                },
                                        )
                                    }>
                                    {(Option) =>
                                        Object.values(PatientType).map((type) => (
                                            <Option key={type} value={type}>
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </Option>
                                        ))
                                    }
                                </Select>
                                <Select
                                    label={t('appointments.urgency')}
                                    icon={<FaCircleExclamation className="text-primary/60" />}
                                    value={data?.urgency}
                                    onChange={(e) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    urgency: e.target.value as UrgencyLevel,
                                                },
                                        )
                                    }>
                                    {(Option) =>
                                        Object.values(UrgencyLevel).map((level) => (
                                            <Option
                                                key={level}
                                                value={level}
                                                icon={getUrgencyIcon(level)}>
                                                {level.charAt(0).toUpperCase() + level.slice(1)}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </Paper>
                    </div>

                    {/* Section 2: Care Provider & Specialized Unit */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500">
                                <FaUserDoctor size={20} />
                            </div>
                            <h3 className="text-xl font-black text-text-light dark:text-text-dark tracking-tight">
                                {t('appointments.sectionProvider')}
                            </h3>
                        </div>

                        <Paper
                            variant="100"
                            className="p-6 space-y-6 border-l-4 border-indigo-500/40">
                            <Select
                                required
                                label={t('appointments.doctor')}
                                icon={<FaUserDoctor className="text-indigo-500/60" />}
                                value={data?.doctor_id}
                                onChange={(e) => {
                                    const docId = e.target.value;
                                    const selectedDoc = doctors?.find((d) => d._id === docId);
                                    setData(
                                        (prev) =>
                                            prev && {
                                                ...prev,
                                                doctor_id: docId,
                                                hospitalId:
                                                    selectedDoc?.hospitalId || prev.hospitalId,
                                                department:
                                                    selectedDoc?.department || prev.department,
                                            },
                                    );
                                }}>
                                {(Option) => (
                                    <>
                                        <Option value="">
                                            {t('appointments.assignDoctorLater')}
                                        </Option>
                                        {doctors?.map((doc) => (
                                            <Option key={doc._id} value={doc._id}>
                                                {doc.firstName} {doc.lastName}
                                            </Option>
                                        ))}
                                    </>
                                )}
                            </Select>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Select
                                    required
                                    label={t('appointments.institution')}
                                    icon={<FaHospital className="text-indigo-500/60" />}
                                    value={data?.hospitalId}
                                    onChange={(e) =>
                                        setData(
                                            (prev) =>
                                                prev && { ...prev, hospitalId: e.target.value },
                                        )
                                    }>
                                    {(Option) => (
                                        <>
                                            <Option value="">
                                                {t('appointments.selectFacility')}
                                            </Option>
                                            {hospitals?.map((h) => (
                                                <Option key={h._id} value={h._id}>
                                                    {h.name}
                                                </Option>
                                            ))}
                                        </>
                                    )}
                                </Select>
                                <Input
                                    required
                                    label={t('appointments.unit')}
                                    placeholder={t('appointments.unitPlaceholder')}
                                    icon={<FaHospital className="text-indigo-500/60" />}
                                    value={data?.department || ''}
                                    onChange={(e) =>
                                        setData(
                                            (prev) =>
                                                prev && { ...prev, department: e.target.value },
                                        )
                                    }
                                />
                            </div>
                        </Paper>
                    </div>

                    {/* Section 3: Scheduling & Precision Logistics */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                <FaCalendarDays size={20} />
                            </div>
                            <h3 className="text-xl font-black text-text-light dark:text-text-dark tracking-tight">
                                {t('appointments.sectionLogistics')}
                            </h3>
                        </div>

                        <Paper
                            variant="100"
                            className="p-6 space-y-6 border-l-4 border-emerald-500/40">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Input
                                    required
                                    type="date"
                                    label={t('appointments.date')}
                                    icon={<FaCalendarDays className="text-emerald-500/60" />}
                                    value={formatDate(data?.scheduledDate)}
                                    onChange={(e) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    scheduledDate: new Date(e.target.value),
                                                },
                                        )
                                    }
                                />
                                <Input
                                    required
                                    type="time"
                                    label={t('appointments.startTime')}
                                    icon={<FaClock className="text-emerald-500/60" />}
                                    value={formatTime(data?.scheduledTime)}
                                    onChange={(e) => {
                                        const [h, m] = e.target.value.split(':').map(Number);
                                        const nt = new Date(data?.scheduledTime);
                                        nt.setHours(h, m);
                                        setData((prev) => prev && { ...prev, scheduledTime: nt });
                                    }}
                                />
                                <Input
                                    type="number"
                                    label={t('appointments.duration')}
                                    icon={<FaHourglassHalf className="text-emerald-500/60" />}
                                    value={data?.expectedDuration}
                                    onChange={(e) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    expectedDuration: Number(e.target.value),
                                                },
                                        )
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Select
                                    label={t('appointments.setting')}
                                    icon={<FaLocationDot className="text-emerald-500/60" />}
                                    value={data?.location}
                                    onChange={(e) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    location: e.target.value as AppointmentLocation,
                                                },
                                        )
                                    }>
                                    {(Option) =>
                                        Object.values(AppointmentLocation).map((loc) => (
                                            <Option key={loc} value={loc}>
                                                {loc.toUpperCase().replace('_', ' ')}
                                            </Option>
                                        ))
                                    }
                                </Select>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label={t('appointments.room')}
                                        placeholder={t('appointments.roomPlaceholder')}
                                        value={data?.roomNumber || ''}
                                        onChange={(e) =>
                                            setData(
                                                (prev) =>
                                                    prev && { ...prev, roomNumber: e.target.value },
                                            )
                                        }
                                    />
                                    <Input
                                        label={t('appointments.floor')}
                                        placeholder={t('appointments.floorPlaceholder')}
                                        value={data?.floor || ''}
                                        onChange={(e) =>
                                            setData(
                                                (prev) =>
                                                    prev && { ...prev, floor: e.target.value },
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </Paper>
                    </div>

                    {/* Section 4: Operational Intelligence */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                                <FaHourglassHalf size={20} />
                            </div>
                            <h3 className="text-xl font-black text-text-light dark:text-text-dark tracking-tight">
                                {t('appointments.sectionIntelligence')}
                            </h3>
                        </div>

                        <Paper
                            variant="100"
                            className="p-6 space-y-6 border-l-4 border-amber-500/40">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Select
                                    label={t('appointments.appointmentClass')}
                                    icon={<FaStethoscope className="text-amber-500/60" />}
                                    value={data?.type}
                                    onChange={(e) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    type: e.target.value as AppointmentType,
                                                },
                                        )
                                    }>
                                    {(Option) =>
                                        Object.values(AppointmentType).map((type) => (
                                            <Option
                                                key={type}
                                                value={type}
                                                icon={getAppointmentTypeIcon(type)}>
                                                {type.toUpperCase().replace('_', ' ')}
                                            </Option>
                                        ))
                                    }
                                </Select>
                                <Select
                                    required
                                    label={t('appointments.currentStatus')}
                                    icon={<FaHourglassHalf className="text-amber-500/60" />}
                                    value={data?.status}
                                    onChange={(e) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    status: e.target.value as AppointmentStatus,
                                                },
                                        )
                                    }>
                                    {(Option) =>
                                        Object.values(AppointmentStatus).map((status) => (
                                            <Option key={status} value={status}>
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            </div>
                            <div className="pt-2">
                                <Input
                                    label={t('appointments.initialDiagnosisRef')}
                                    placeholder={t('appointments.diagnosisPlaceholder', {
                                        defaultValue: 'Preliminary clinical finding',
                                    })}
                                    icon={<FaStethoscope className="text-amber-500/60" />}
                                    value={data?.preliminaryDiagnosis}
                                    onChange={(e) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    preliminaryDiagnosis: e.target.value,
                                                },
                                        )
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-8">
                                <NoteManager
                                    type="patientNotes"
                                    label={t('appointments.preliminaryNotes')}
                                    authorDefault="Patient"
                                    icon={<FaUser className="text-amber-500/60" />}
                                    data={data}
                                    setData={setData}
                                />
                                <div className="h-px bg-border-light dark:border-border-dark opacity-50" />
                                <NoteManager
                                    type="nurseNotes"
                                    label={t('appointments.nurseNotes')}
                                    authorDefault="Nurse"
                                    icon={<FaNotesMedical className="text-emerald-500/60" />}
                                    data={data}
                                    setData={setData}
                                />
                                <div className="h-px bg-border-light dark:border-border-dark opacity-50" />
                                <NoteManager
                                    type="doctorNotes"
                                    label={t('appointments.medicalNotes')}
                                    authorDefault="Doctor"
                                    icon={<FaUserDoctor className="text-indigo-500/60" />}
                                    data={data}
                                    setData={setData}
                                />
                            </div>
                        </Paper>
                    </div>
                </div>
            )}
        </EditLayout>
    );
}
