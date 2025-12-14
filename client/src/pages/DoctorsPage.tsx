//-Path: "TeaChoco-Hospital/client/src/pages/DoctorsPage.tsx"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { mockDoctors } from '../mocks/data';
import type { Doctor } from '../types/doctor';
import { DoctorCard } from '../components/DoctorCard';

export const DoctorsPage: React.FC = () => {
    const [doctors] = useState<Doctor[]>(mockDoctors);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const filteredDoctors = doctors.filter(
        (doc) =>
            doc.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.department.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleDoctorClick = (doc: Doctor) => {
        navigate(`/doctors/${doc._id}`);
    };

    return (
        <div className="space-y-6">
            <div className="text-center md:text-left">
                <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
                    Find a Doctor
                </h1>
                <p className="text-text-muted-light dark:text-text-muted-dark">
                    Specialized care from our experienced team
                </p>
            </div>

            {/* Search */}
            <div className="max-w-md relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark" />
                <input
                    type="text"
                    placeholder="Search by name or department..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border-light dark:border-border-dark bg-bg-card-light dark:bg-bg-card-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Doctor Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDoctors.map((doc) => (
                    <DoctorCard key={doc._id} doctor={doc} onClick={handleDoctorClick} />
                ))}
            </div>

            {filteredDoctors.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-text-muted-light dark:text-text-muted-dark">
                        No doctors found matching "{searchTerm}"
                    </p>
                </div>
            )}
        </div>
    );
};
