//-Path: "TeaChoco-Hospital/client/src/pages/hospital/HospitalsPage.tsx"
import { useNavigate } from 'react-router-dom';
import { useHospitals } from '../../context/hospitalsAtom';
import ListLayout from '../../components/layout/ListLayout';
import { HospitalCard } from '../../components/hospital/HospitalCard';

export default function HospitalsPage() {
    const navigate = useNavigate();
    const { hospitals } = useHospitals();

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
}
