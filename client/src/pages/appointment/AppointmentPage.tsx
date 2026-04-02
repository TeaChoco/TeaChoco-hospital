//-Path: "TeaChoco-Hospital/client/src/pages/appointment/AppointmentPage.tsx"
import { Resource } from '../../types/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ListLayout from '../../components/layout/ListLayout';
import { useAppointments } from '../../store/useAppointmentStore';
import type { FilterOption } from '../../components/custom/Search';
import { AppointmentCard } from '../../components/content/AppointmentCard';
import { AppointmentCardSkeleton } from '../../components/content/AppointmentCardSkeleton';

export default function AppointmentPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { appointments } = useAppointments();

    const filterOptions: FilterOption[] = [
        {
            key: 'department',
            label: t('appointments.department'),
            options: [
                { value: 'Cardiology', label: 'Cardiology' },
                { value: 'Dermatology', label: 'Dermatology' },
                { value: 'Pediatrics', label: 'Pediatrics' },
                { value: 'Neurology', label: 'Neurology' },
            ],
        },
        {
            key: 'status',
            label: t('appointments.status'),
            options: [
                { value: 'Upcoming', label: 'Upcoming' },
                { value: 'Completed', label: 'Completed' },
                { value: 'Cancelled', label: 'Cancelled' },
            ],
        },
    ];

    return (
        <ListLayout
            resource={Resource.APPOINTMENTS}
            datas={appointments}
            Skeleton={AppointmentCardSkeleton}
            newData={t('appointments.new')}
            header={t('appointments.header')}
            placeholder={t('appointments.placeholder')}
            description={t('appointments.description')}
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
