//-Path: "TeaChoco-Hospital/client/src/pages/medicine/MedicinesPage.tsx"
import { useNavigate } from 'react-router-dom';
import { useMedicines } from '../../context/medicinesAtom';
import ListLayout from '../../components/layout/ListLayout';
import { MedicineCard } from '../../components/content/MedicineCard';

export default function MedicinesPage() {
    const navigator = useNavigate();
    const { medicines } = useMedicines();

    return (
        <ListLayout
            datas={medicines}
            header="Medicines"
            newData="New Medicine"
            description="Manage and track your prescriptions"
            placeholder="Search medicines..."
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
