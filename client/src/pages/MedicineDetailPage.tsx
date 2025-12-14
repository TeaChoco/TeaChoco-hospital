//-Path: "TeaChoco-Hospital/client/src/pages/MedicineDetailPage.tsx"
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockMedicines } from '../mocks/data';
import {
    FaArrowLeft,
    FaPills,
    FaClock,
    FaBox,
    FaSyringe,
    FaExclamationTriangle,
} from 'react-icons/fa';

export const MedicineDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const medicine = useMemo(() => mockMedicines.find((m) => m._id === id), [id]);

    if (!medicine) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-text-muted-light dark:text-text-muted-dark">
                <h2 className="text-2xl font-bold mb-2">Medicine Not Found</h2>
                <button onClick={() => navigate(-1)} className="text-primary hover:underline">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors">
                <FaArrowLeft /> Back to List
            </button>

            <div className="bg-bg-card-light dark:bg-bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
                <div className="md:flex">
                    {/* Image Section */}
                    <div className="md:w-1/3 h-64 md:h-auto bg-slate-50 dark:bg-slate-800 relative">
                        {medicine.imageUrl ? (
                            <img
                                src={medicine.imageUrl}
                                alt={medicine.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600">
                                <FaPills size={64} />
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8 md:w-2/3 space-y-6">
                        <div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-bold text-text-light dark:text-text-dark">
                                        {medicine.name}
                                    </h1>
                                    <p className="text-lg text-text-muted-light dark:text-text-muted-dark">
                                        {medicine.genericName}
                                    </p>
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium border ${
                                        medicine.isActive
                                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                                    }`}>
                                    {medicine.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <div className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark mb-1">
                                    <FaSyringe className="text-primary" />
                                    <span className="font-medium">Dosage</span>
                                </div>
                                <p className="text-text-light dark:text-text-dark pl-6">
                                    {medicine.dosage.quantity} {medicine.dosage.unit}
                                </p>
                                <p className="text-sm text-text-muted-light dark:text-text-muted-dark pl-6">
                                    {medicine.dosage.frequencyPerDay} times per day
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <div className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark mb-1">
                                    <FaBox className="text-accent-secondary" />
                                    <span className="font-medium">Supply</span>
                                </div>
                                <p className="text-text-light dark:text-text-dark pl-6">
                                    {medicine.package?.tabletsPerStrip || '-'} tablets left
                                </p>
                                <p className="text-sm text-text-muted-light dark:text-text-muted-dark pl-6">
                                    Expires: {new Date(medicine.expiryDate).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-lg text-text-light dark:text-text-dark mb-3 flex items-center gap-2">
                                <FaClock className="text-accent" />
                                How to Take
                            </h3>
                            <div className="space-y-3">
                                {medicine.takeInstructions.map((instruction, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-4 p-4 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-black/20">
                                        <div className="flex-1">
                                            <p className="font-medium text-text-light dark:text-text-dark capitalize">
                                                {instruction.mealTime} • {instruction.relation}
                                            </p>
                                            {instruction.notes && (
                                                <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">
                                                    "{instruction.notes}"
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {medicine.warnings && medicine.warnings.length > 0 && (
                            <div>
                                <h3 className="font-bold text-lg text-text-light dark:text-text-dark mb-3 flex items-center gap-2">
                                    <FaExclamationTriangle className="text-amber-500" />
                                    Warnings
                                </h3>
                                <ul className="list-disc list-inside space-y-1 text-text-secondary-light dark:text-text-secondary-dark">
                                    {medicine.warnings.map((warning, idx) => (
                                        <li
                                            key={idx}
                                            className="text-amber-700 dark:text-amber-400">
                                            {warning.description}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
