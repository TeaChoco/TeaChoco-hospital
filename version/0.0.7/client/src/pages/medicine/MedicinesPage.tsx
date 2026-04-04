//-Path: "TeaChoco-Hospital/client/src/pages/medicine/MedicinesPage.tsx"
import { Resource } from '../../types/auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ListLayout from '../../components/layout/ListLayout';
import { useMedicines } from '../../store/useMedicineStore';
import { MedicineCard } from '../../components/content/MedicineCard';
import { MedicineCardSkeleton } from '../../components/content/MedicineCardSkeleton';

export default function MedicinesPage() {
    const { t } = useTranslation();
    const navigator = useNavigate();
    const { medicines } = useMedicines();

    return (
        <ListLayout
            resource={Resource.MEDICINES}
            datas={medicines}
            Skeleton={MedicineCardSkeleton}
            newData={t('medicines.new')}
            header={t('medicines.header')}
            placeholder={t('medicines.placeholder')}
            description={t('medicines.description')}
            filter={(med, search) =>
                med.name.toLowerCase().includes(search.toLowerCase()) ||
                med.genericName.toLowerCase().includes(search.toLowerCase())
            }>
            {(filteredDatas) =>
                filteredDatas.map((med) => (
                    <MedicineCard
                        key={med._id}
                        medicine={med}
                        onClick={() => navigator(`/medicines/${med._id}`)}
                    />
                ))
            }
        </ListLayout>
    );
}
