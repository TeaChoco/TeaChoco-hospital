//-Path: "TeaChoco-Hospital/client/src/pages/doctor/DoctorsPage.tsx"
import { useNavigate } from 'react-router-dom';
import ListLayout from '../../components/layout/ListLayout';
import { useAppointments } from '../../context/appointmentsAtom';
import type { FilterOption } from '../../components/custom/Search';
import { AppointmentCard } from '../../components/appointment/AppointmentCard';

export default function AppointmentPage() {
    const navigate = useNavigate();
    const { appointments } = useAppointments();

    const filterOptions: FilterOption[] = [
        {
            key: 'department',
            label: 'Department',
            options: [
                { value: 'Cardiology', label: 'Cardiology' },
                { value: 'Dermatology', label: 'Dermatology' },
                { value: 'Pediatrics', label: 'Pediatrics' },
                { value: 'Neurology', label: 'Neurology' },
            ],
        },
        {
            key: 'status',
            label: 'Status',
            options: [
                { value: 'Upcoming', label: 'Upcoming' },
                { value: 'Completed', label: 'Completed' },
                { value: 'Cancelled', label: 'Cancelled' },
            ],
        },
    ];

    return (
        <ListLayout
            datas={appointments}
            newData="New Appointment"
            header="Find a Appointment"
            placeholder="Search by name or department..."
            description="Specialized care from our experienced team"
            filterOptions={filterOptions}
            filter={(app, searchTerm, filters) => {
                const matchesSearch =
                    app.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    app.appointmentNumber?.toLowerCase().includes(searchTerm.toLowerCase());

                const matchesDepartment =
                    !filters.department ||
                    filters.department.length === 0 ||
                    filters.department.includes(app.department);

                const matchesStatus =
                    !filters.status ||
                    filters.status.length === 0 ||
                    filters.status.includes(app.status);

                return matchesSearch && matchesDepartment && matchesStatus;
            }}>
            {(filteredDatas) =>
                filteredDatas.map((app) => (
                    <AppointmentCard
                        key={app._id}
                        appointment={app}
                        onClick={() => navigate(`/appointments/${app._id}`)}
                    />
                ))
            }
        </ListLayout>
    );
}
