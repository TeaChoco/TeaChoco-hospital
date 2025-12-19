//-Path: "TeaChoco-Hospital/client/src/pages/appointment/AppointmentEditPage.tsx"
import {
    FaUserDoctor,
    FaHospital,
    FaCircleInfo,
    FaStethoscope,
    FaTruckMedical,
    FaNotesMedical,
    FaClockRotateLeft,
    FaCheckDouble,
    FaHourglassHalf,
    FaFlask,
} from 'react-icons/fa6';
import {
    PatientType,
    UrgencyLevel,
    PaymentStatus,
    AppointmentType,
    type Appointment,
    AppointmentStatus,
    AppointmentLocation,
} from '../../types/appointment';
import { Title } from '../../types/types';
import Input from '../../components/custom/Input';
import Select from '../../components/custom/Select';
import { useDoctors } from '../../context/doctorsAtom';
import { useHospitals } from '../../context/hospitalsAtom';
import EditLayout from '../../components/layout/EditLayout';
import { useAppointments } from '../../context/appointmentsAtom';

export default function AppointmentEditPage() {
    const { doctors } = useDoctors();
    const { hospitals } = useHospitals();
    const { appointments } = useAppointments();

    const formatDate = (date: Date | undefined) => {
        if (!date) return '';
        return new Date(date).toISOString().split('T')[0];
    };

    const formatTime = (date: Date | undefined) => {
        if (!date) return '';
        return new Date(date).toTimeString().substring(0, 5);
    };

    const getAppointmentIcon = (type: AppointmentType) => {
        switch (type) {
            case AppointmentType.CONSULTATION:
                return <FaStethoscope />;
            case AppointmentType.FOLLOW_UP:
                return <FaClockRotateLeft />;
            case AppointmentType.EMERGENCY:
                return <FaTruckMedical />;
            case AppointmentType.LAB_TEST:
                return <FaFlask className="w-4 h-4" />;
            case AppointmentType.SURGERY:
                return <FaNotesMedical />;
            default:
                return <FaStethoscope />;
        }
    };

    const getStatusIcon = (status: AppointmentStatus) => {
        switch (status) {
            case AppointmentStatus.PENDING:
                return <FaHourglassHalf />;
            case AppointmentStatus.CONFIRMED:
                return <FaCheckDouble />;
            case AppointmentStatus.COMPLETED:
                return <FaCheckDouble className="text-secondary" />;
            case AppointmentStatus.CANCELLED:
                return <FaCircleInfo className="text-red-500" />;
            default:
                return <FaCircleInfo />;
        }
    };

    return (
        <EditLayout<Appointment>
            title={Title.APPOINTMENTS}
            newData={{
                _id: 'new',
                user_id: '',
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
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: '',
                __v: 0,
            }}
            find={async (id) => appointments?.find((appointment) => appointment._id === id)}>
            {(data, setData) => (
                <>
                    <Input
                        required
                        label="Purpose"
                        description="Reason for your appointment"
                        value={data?.purpose}
                        onChange={(event) =>
                            setData((prev) => prev && { ...prev, purpose: event.target.value })
                        }
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            required
                            type="date"
                            label="Date"
                            value={formatDate(data?.scheduledDate)}
                            onChange={(event) =>
                                setData(
                                    (prev) =>
                                        prev && {
                                            ...prev,
                                            scheduledDate: new Date(event.target.value),
                                        },
                                )
                            }
                        />
                        <Input
                            required
                            type="time"
                            label="Time"
                            value={formatTime(data?.scheduledTime)}
                            onChange={(event) => {
                                const [hours, minutes] = event.target.value.split(':').map(Number);
                                const newTime = new Date(data?.scheduledTime);
                                newTime.setHours(hours, minutes);
                                setData(
                                    (prev) =>
                                        prev && {
                                            ...prev,
                                            scheduledTime: newTime,
                                        },
                                );
                            }}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select
                            label="Type"
                            value={data?.type}
                            onChange={(event) =>
                                setData(
                                    (prev) =>
                                        prev && {
                                            ...prev,
                                            type: event.target.value as AppointmentType,
                                        },
                                )
                            }>
                            {(Option) =>
                                Object.values(AppointmentType).map((type) => (
                                    <Option key={type} value={type} icon={getAppointmentIcon(type)}>
                                        {type}
                                    </Option>
                                ))
                            }
                        </Select>

                        <Select
                            label="Status"
                            value={data?.status}
                            onChange={(event) =>
                                setData(
                                    (prev) =>
                                        prev && {
                                            ...prev,
                                            status: event.target.value as AppointmentStatus,
                                        },
                                )
                            }>
                            {(Option) =>
                                Object.values(AppointmentStatus).map((status) => (
                                    <Option
                                        key={status}
                                        value={status}
                                        icon={getStatusIcon(status)}>
                                        {status}
                                    </Option>
                                ))
                            }
                        </Select>
                    </div>

                    <Select
                        label="Doctor"
                        value={data?.doctor_id}
                        onChange={(event) =>
                            setData(
                                (prev) =>
                                    prev && {
                                        ...prev,
                                        doctor_id: event.target.value,
                                    },
                            )
                        }>
                        {(Option) => (
                            <>
                                <Option value="" icon={<FaUserDoctor />}>
                                    Select Doctor
                                </Option>
                                {doctors?.map((doctor) => (
                                    <Option
                                        key={doctor._id}
                                        value={doctor._id}
                                        icon={<FaUserDoctor className="text-primary" />}>
                                        {doctor.firstName} {doctor.lastName}
                                    </Option>
                                ))}
                            </>
                        )}
                    </Select>

                    <Select
                        label="Hospital"
                        value={data?.hospitalId}
                        onChange={(event) =>
                            setData(
                                (prev) =>
                                    prev && {
                                        ...prev,
                                        hospitalId: event.target.value,
                                    },
                            )
                        }>
                        {(Option) => (
                            <>
                                <Option value="" icon={<FaHospital />}>
                                    Select Hospital
                                </Option>
                                {hospitals?.map((hospital) => (
                                    <Option
                                        key={hospital._id}
                                        value={hospital._id}
                                        icon={<FaHospital className="text-primary" />}>
                                        {hospital.name}
                                    </Option>
                                ))}
                            </>
                        )}
                    </Select>

                    <Select
                        label="Location"
                        value={data?.location}
                        onChange={(event) =>
                            setData(
                                (prev) =>
                                    prev && {
                                        ...prev,
                                        location: event.target.value as AppointmentLocation,
                                    },
                            )
                        }>
                        {(Option) =>
                            Object.values(AppointmentLocation).map((loc) => (
                                <Option key={loc} value={loc} icon={<FaHospital />}>
                                    {loc}
                                </Option>
                            ))
                        }
                    </Select>
                </>
            )}
        </EditLayout>
    );
}
