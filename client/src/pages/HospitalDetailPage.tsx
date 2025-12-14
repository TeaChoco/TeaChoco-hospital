//-Path: "TeaChoco-Hospital/client/src/pages/HospitalDetailPage.tsx"
import React, { useMemo } from 'react';
import { mockHospitals } from '../mocks/data';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHospital, FaPhone, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

export const HospitalDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const hospital = useMemo(() => mockHospitals.find((h) => h._id === id), [id]);

    if (!hospital) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-text-muted-light dark:text-text-muted-dark">
                <h2 className="text-2xl font-bold mb-2">Hospital Not Found</h2>
                <button onClick={() => navigate(-1)} className="text-primary hover:underline">
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors">
                <FaArrowLeft /> Back to List
            </button>

            <div className="bg-bg-card-light dark:bg-bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
                <div className="h-40 bg-linear-to-r from-primary/10 to-accent/10 flex items-center justify-center text-primary/20">
                    <FaHospital size={80} />
                </div>

                <div className="p-6 md:p-10">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-2">
                            {hospital.name}
                        </h1>
                        <p className="text-text-muted-light dark:text-text-muted-dark">
                            Partner Hospital
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                            <FaMapMarkerAlt className="mt-1 text-primary shrink-0" size={20} />
                            <div>
                                <h3 className="font-bold text-text-light dark:text-text-dark mb-1">
                                    Address
                                </h3>
                                <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                                    {hospital.address || 'No address provided'}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <FaPhone className="text-accent-secondary shrink-0" size={20} />
                                <div>
                                    <h3 className="font-bold text-text-light dark:text-text-dark mb-1">
                                        Phone
                                    </h3>
                                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                                        {hospital.contactNumber || 'No contact number'}
                                    </p>
                                </div>
                            </div>

                            {hospital.website && (
                                <a
                                    href={hospital.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                                    <FaGlobe
                                        className="text-accent shrink-0 group-hover:scale-110 transition-transform"
                                        size={20}
                                    />
                                    <div>
                                        <h3 className="font-bold text-text-light dark:text-text-dark mb-1 group-hover:text-accent transition-colors">
                                            Website
                                        </h3>
                                        <p className="text-text-secondary-light dark:text-text-secondary-dark truncate max-w-[200px]">
                                            {hospital.website}
                                        </p>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
