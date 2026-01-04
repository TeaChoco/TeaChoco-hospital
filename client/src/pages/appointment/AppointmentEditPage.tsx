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
import { useMemo } from 'react';
import {
    PatientType,
    UrgencyLevel,
    PaymentStatus,
    AppointmentType,
    type Appointment,
    AppointmentStatus,
    AppointmentLocation,
} from '../../types/appointment';
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
            purpose: '',
            scheduledDate: new Date(),
            scheduledTime: new Date(),
            expectedDuration: 30,
            location: AppointmentLocation.OPD,
            status: AppointmentStatus.PENDING,
            statusHistory: [],
            urgency: UrgencyLevel.ROUTINE,
            preparation: {
                types: [],
                instructions: [],
            },
            remindersSent: false,
            symptoms: [],
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
        }),
        [],
    );

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
                                Appointment Essentials
                            </h3>
                        </div>

                        <Paper variant="100" className="p-6 space-y-6 border-l-4 border-primary/40">
                            <Input
                                required
                                label="Primary Purpose"
                                placeholder="e.g. Annual Health Checkup"
                                icon={<FaStethoscope className="text-primary/60" />}
                                value={data?.purpose}
                                onChange={(e) =>
                                    setData((prev) => prev && { ...prev, purpose: e.target.value })
                                }
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Select
                                    label="Patient Status"
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
                                    label="Clinical Urgency"
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
                                Care Provider & Specialized Unit
                            </h3>
                        </div>

                        <Paper
                            variant="100"
                            className="p-6 space-y-6 border-l-4 border-indigo-500/40">
                            <Select
                                label="Responsible Physician"
                                icon={<FaUserDoctor className="text-indigo-500/60" />}
                                value={data?.doctor_id}
                                onChange={(e) =>
                                    setData(
                                        (prev) => prev && { ...prev, doctor_id: e.target.value },
                                    )
                                }>
                                {(Option) => (
                                    <>
                                        <Option value="">Assign Doctor Later</Option>
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
                                    label="Medical Institution"
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
                                            <Option value="">Select Facility</Option>
                                            {hospitals?.map((h) => (
                                                <Option key={h._id} value={h._id}>
                                                    {h.name}
                                                </Option>
                                            ))}
                                        </>
                                    )}
                                </Select>
                                <Input
                                    label="Department / Unit"
                                    placeholder="e.g. Cardiology"
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
                                Scheduling & Precision Logistics
                            </h3>
                        </div>

                        <Paper
                            variant="100"
                            className="p-6 space-y-6 border-l-4 border-emerald-500/40">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Input
                                    required
                                    type="date"
                                    label="Scheduled Date"
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
                                    label="Scheduled Start Time"
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
                                    label="Est. Duration (Min)"
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
                                    label="Consultation Setting"
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
                                        label="Room"
                                        placeholder="Room #"
                                        value={data?.roomNumber || ''}
                                        onChange={(e) =>
                                            setData(
                                                (prev) =>
                                                    prev && { ...prev, roomNumber: e.target.value },
                                            )
                                        }
                                    />
                                    <Input
                                        label="Floor"
                                        placeholder="Level"
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
                                Operational Intelligence
                            </h3>
                        </div>

                        <Paper
                            variant="100"
                            className="p-6 space-y-6 border-l-4 border-amber-500/40">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Select
                                    label="Appointment Class"
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
                                    label="Current Status"
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
                            <Input
                                label="Patient Preliminary Notes"
                                placeholder="Additional details or concerns from patient side..."
                                value={data?.patientNotes || ''}
                                onChange={(e) =>
                                    setData(
                                        (prev) => prev && { ...prev, patientNotes: e.target.value },
                                    )
                                }
                            />
                        </Paper>
                    </div>
                </div>
            )}
        </EditLayout>
    );
}
