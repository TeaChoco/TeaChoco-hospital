//-Path: "TeaChoco-Hospital/client/src/pages/MedicinesPage.tsx"
import React, { useState } from 'react';
import { mockMedicines } from '../mocks/data';
import type { Medicine } from '../types/medicine';
import { MedicineCard } from '../components/MedicineCard';
import { FaSearch, FaFilter, FaPlus } from 'react-icons/fa';

export const MedicinesPage: React.FC = () => {
    const [medicines] = useState<Medicine[]>(mockMedicines);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMedicines = medicines.filter(
        (med) =>
            med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            med.genericName.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleMedicineClick = (med: Medicine) => {
        console.log('Clicked medicine:', med.name);
        // Navigate to detail page (TODO)
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
                        My Medicines
                    </h1>
                    <p className="text-text-muted-light dark:text-text-muted-dark">
                        Manage and track your prescriptions
                    </p>
                </div>
                <button className="flex items-center gap-2 btn btn-primary">
                    <FaPlus size={14} />
                    <span>Add Medicine</span>
                </button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark" />
                    <input
                        type="text"
                        placeholder="Search medicines..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-border-light dark:border-border-dark bg-bg-card-light dark:bg-bg-card-dark text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-border-light dark:border-border-dark bg-bg-card-light dark:bg-bg-card-dark rounded-xl hover:bg-bg-card-hover-light dark:hover:bg-bg-card-hover-dark text-text-secondary-light dark:text-text-secondary-dark transition-colors">
                    <FaFilter size={14} />
                    <span>Filter</span>
                </button>
            </div>

            {/* Medicine Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMedicines.map((med) => (
                    <MedicineCard key={med._id} medicine={med} onClick={handleMedicineClick} />
                ))}
            </div>

            {/* Empty State */}
            {filteredMedicines.length === 0 && (
                <div className="text-center py-12">
                    <div className="bg-slate-50 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaSearch className="text-slate-300 dark:text-slate-600 text-xl" />
                    </div>
                    <h3 className="text-text-light dark:text-text-dark font-medium mb-1">
                        No medicines found
                    </h3>
                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                        Try adjusting your search terms
                    </p>
                </div>
            )}
        </div>
    );
};
