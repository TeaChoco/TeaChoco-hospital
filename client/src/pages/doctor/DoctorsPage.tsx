//-Path: "TeaChoco-Hospital/client/src/pages/doctor/DoctorsPage.tsx"
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDoctors } from '../../context/doctorsAtom';
import ListLayout from '../../components/layout/ListLayout';
import { DoctorCard } from '../../components/content/DoctorCard';

export default function DoctorsPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { doctors } = useDoctors();

    return (
        <ListLayout
            datas={doctors}
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
