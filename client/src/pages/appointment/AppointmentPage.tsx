//-Path: "TeaChoco-Hospital/client/src/pages/doctor/DoctorsPage.tsx"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockAppointments } from '../../mocks/data';
import type { Appointment } from '../../types/appointment';
import ListLayout from '../../components/layout/ListLayout';
import { AppointmentCard } from '../../components/appointment/AppointmentCard';
import type { FilterOption } from '../../components/custom/Search';

export const AppointmentPage: React.FC = () => {
    const navigate = useNavigate();
    const [appointments] = useState<Appointment[]>(mockAppointments);

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
                    app.appointmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    app.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    app.department.toLowerCase().includes(searchTerm.toLowerCase());

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
};
