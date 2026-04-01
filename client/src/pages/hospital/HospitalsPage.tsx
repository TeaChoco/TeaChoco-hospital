//-Path: "TeaChoco-Hospital/client/src/pages/hospital/HospitalsPage.tsx"
import { Resource } from '../../types/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ListLayout from '../../components/layout/ListLayout';
import { useHospitals } from '../../store/useHospitalStore';
import { HospitalCard } from '../../components/content/HospitalCard';

export default function HospitalsPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { hospitals } = useHospitals();

    return (
        <ListLayout
            resource={Resource.HOSPITALS}
            datas={hospitals}
            newData={t('hospitals.new')}
            header={t('hospitals.header')}
            placeholder={t('hospitals.placeholder')}
            description={t('hospitals.description')}
            filter={(hosp, search) =>
                hosp.name.toLowerCase().includes(search.toLowerCase()) ||
                hosp.address?.toLowerCase().includes(search.toLowerCase())
            }>
            {(filteredDatas) =>
                filteredDatas.map((hosp) => (
                    <HospitalCard
                        key={hosp._id}
                        hospital={hosp}
                        onClick={() => navigate(`/hospitals/${hosp._id}`)}
                    />
                ))
            }
        </ListLayout>
    );
}
