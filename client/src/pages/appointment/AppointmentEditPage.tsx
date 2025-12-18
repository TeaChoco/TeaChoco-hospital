//-Path: "TeaChoco-Hospital/client/src/pages/appointment/AppointmentEditPage.tsx"
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
    const doctors = useDoctors();
    const hospitals = useHospitals();
    const appointments = useAppointments();

    const formatDate = (date: Date | undefined) => {
        if (!date) return '';
        return new Date(date).toISOString().split('T')[0];
    };

    const formatTime = (date: Date | undefined) => {
        if (!date) return '';
        return new Date(date).toTimeString().substring(0, 5);
    };

    return (
        <EditLayout<Appointment>
            title={Title.APPOINTMENTS}
            newData={{
                _id: 'new',
                appointmentNumber: '',
                patientId: '',
                patientType: PatientType.NEW,
                hospitalId: '',
                doctorId: '',
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
                        {Object.values(AppointmentType).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
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
                        {Object.values(AppointmentStatus).map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </Select>

                    <Select
                        label="Doctor"
                        value={data?.doctorId}
                        onChange={(event) =>
                            setData(
                                (prev) =>
                                    prev && {
                                        ...prev,
                                        doctorId: event.target.value,
                                    },
                            )
                        }>
                        <option value="">Select Doctor</option>
                        {doctors?.map((doctor) => (
                            <option key={doctor._id} value={doctor._id}>
                                {doctor.firstName} {doctor.lastName}
                            </option>
                        ))}
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
                        <option value="">Select Hospital</option>
                        {hospitals?.map((hospital) => (
                            <option key={hospital._id} value={hospital._id}>
                                {hospital.name}
                            </option>
                        ))}
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
                        {Object.values(AppointmentLocation).map((loc) => (
                            <option key={loc} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </Select>
                </>
            )}
        </EditLayout>
    );
}
