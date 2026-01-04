//-Path: "TeaChoco-Hospital/client/src/pages/medicine/MedicinesPage.tsx"
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMedicines } from '../../context/medicinesAtom';
import ListLayout from '../../components/layout/ListLayout';
import { MedicineCard } from '../../components/content/MedicineCard';

export default function MedicinesPage() {
    const { t } = useTranslation();
    const navigator = useNavigate();
    const { medicines } = useMedicines();

    return (
        <ListLayout
            datas={medicines}
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
