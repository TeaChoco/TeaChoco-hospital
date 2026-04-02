//-Path: "TeaChoco-Hospital/client/src/pages/doctor/DoctorsPage.tsx"
import { Resource } from '../../types/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDoctors } from '../../store/useDoctorStore';
import ListLayout from '../../components/layout/ListLayout';
import { DoctorCard } from '../../components/content/DoctorCard';
import { DoctorCardSkeleton } from '../../components/content/DoctorCardSkeleton';

export default function DoctorsPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { doctors } = useDoctors();

    return (
        <ListLayout
            resource={Resource.DOCTORS}
            datas={doctors}
            Skeleton={DoctorCardSkeleton}
            newData={t('doctors.new')}
            header={t('doctors.header')}
            placeholder={t('doctors.placeholder')}
            description={t('doctors.description')}
            filter={(doc, searchTerm) => {
                const matchesSearch =
                    doc.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    doc.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    doc.department.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesSearch;
            }}>
            {(filteredDatas) =>
                filteredDatas.map((doc) => (
                    <DoctorCard
                        key={doc._id}
                        doctor={doc}
                        onClick={() => navigate(`/doctors/${doc._id}`)}
                    />
                ))
            }
        </ListLayout>
    );
}
