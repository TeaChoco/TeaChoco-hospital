//-Path: "TeaChoco-Hospital/client/src/pages/medicine/MedicinesPage.tsx"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockMedicines } from '../../mocks/data';
import type { Medicine } from '../../types/medicine';
import ListLayout from '../../components/layout/ListLayout';
import { MedicineCard } from '../../components/medicine/MedicineCard';

export const MedicinesPage: React.FC = () => {
    const navigator = useNavigate();
    const [medicines] = useState<Medicine[]>(mockMedicines);

    return (
        <ListLayout
            datas={medicines}
            header="My Medicines"
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
};
