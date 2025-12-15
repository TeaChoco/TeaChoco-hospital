//-Path: "TeaChoco-Hospital/client/src/pages/doctor/DoctorsPage.tsx"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDoctors } from '../../mocks/data';
import type { Doctor } from '../../types/doctor';
import { DoctorCard } from '../../components/doctor/DoctorCard';
import ListLayout from '../../components/layout/ListLayout';

export const DoctorsPage: React.FC = () => {
    const navigate = useNavigate();
    const [doctors] = useState<Doctor[]>(mockDoctors);

    return (
        <ListLayout
            datas={doctors}
            newData="New Doctor"
            header="Find a Doctor"
            placeholder="Search by name or department..."
            description="Specialized care from our experienced team"
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
};
