//-Path: "TeaChoco-Hospital/client/src/pages/hospital/HospitalsPage.tsx"
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useHospitals } from '../../context/hospitalsAtom';
import ListLayout from '../../components/layout/ListLayout';
import { HospitalCard } from '../../components/content/HospitalCard';

export default function HospitalsPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { hospitals } = useHospitals();

    return (
        <ListLayout
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
