//-Path: "TeaChoco-Hospital/client/src/pages/hospital/HospitalsPage.tsx"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockHospitals } from '../../mocks/data';
import type { Hospital } from '../../types/hospital';
import ListLayout from '../../components/layout/ListLayout';
import { HospitalCard } from '../../components/hospital/HospitalCard';

export const HospitalsPage: React.FC = () => {
    const navigate = useNavigate();
    const [hospitals] = useState<Hospital[]>(mockHospitals);

    return (
        <ListLayout
            datas={hospitals}
            newData="New Hospital"
            header="Partner Hospitals"
            placeholder="Search hospitals..."
            description="Find care locations and contact information"
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
};
