//-Path: "TeaChoco-Hospital/client/src/pages/HospitalsPage.tsx"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { mockHospitals } from '../mocks/data';
import type { Hospital } from '../types/hospital';
import { HospitalCard } from '../components/HospitalCard';

export const HospitalsPage: React.FC = () => {
    const [hospitals] = useState<Hospital[]>(mockHospitals);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const filteredHospitals = hospitals.filter(
        (hosp) =>
            hosp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (hosp.address && hosp.address.toLowerCase().includes(searchTerm.toLowerCase())),
    );

    const handleHospitalClick = (hosp: Hospital) => {
        navigate(`/hospitals/${hosp._id}`);
    };

    return (
        <div className="space-y-6">
            <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
                    Partner Hospitals
                </h1>
                <p className="text-text-muted-light dark:text-text-muted-dark">
                    Find care locations and contact information
                </p>
            </div>

            {/* Search */}
            <div className="max-w-md relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark" />
                <input
                    type="text"
                    placeholder="Search hospitals..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-bg-card-light dark:bg-bg-card-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHospitals.map((hosp) => (
                    <HospitalCard key={hosp._id} hospital={hosp} onClick={handleHospitalClick} />
                ))}
            </div>

            {filteredHospitals.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-text-muted-light dark:text-text-muted-dark">
                        No hospitals found matching "{searchTerm}"
                    </p>
                </div>
            )}
        </div>
    );
};
