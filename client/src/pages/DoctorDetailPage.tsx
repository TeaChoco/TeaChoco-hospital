//-Path: "TeaChoco-Hospital/client/src/pages/DoctorDetailPage.tsx"
import React, { useMemo } from 'react';
import { mockDoctors } from '../mocks/data';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUserMd, FaPhone, FaHospital, FaCalendarCheck } from 'react-icons/fa';

export const DoctorDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const doctor = useMemo(() => mockDoctors.find((d) => d._id === id), [id]);

    if (!doctor) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-text-muted-light dark:text-text-muted-dark">
                <h2 className="text-2xl font-bold mb-2">Doctor Not Found</h2>
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

            <div className="bg-bg-card-light dark:bg-bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark p-6 md:p-10">
                <div className="flex flex-col items-center text-center">
                    <div className="w-32 h-32 mb-6 rounded-full overflow-hidden ring-4 ring-primary/10">
                        {doctor.picture ? (
                            <img
                                src={doctor.picture}
                                alt={`${doctor.firstName} ${doctor.lastName}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500">
                                <FaUserMd size={48} />
                            </div>
                        )}
                    </div>

                    <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-2">
                        {doctor.firstName} {doctor.lastName}
                    </h1>
                    {doctor.nickname && (
                        <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-4">
                            "{doctor.nickname}"
                        </p>
                    )}

                    <div className="inline-flex px-4 py-2 bg-primary/10 text-primary font-medium rounded-full mb-8">
                        {doctor.department}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-border-light dark:border-border-dark">
                            <div className="p-2 bg-white dark:bg-slate-700 rounded-lg text-primary">
                                <FaPhone />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase font-bold tracking-wider">
                                    Contact
                                </p>
                                <p className="font-medium text-text-light dark:text-text-dark">
                                    {doctor.contactNumber || ' Not Available'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-border-light dark:border-border-dark">
                            <div className="p-2 bg-white dark:bg-slate-700 rounded-lg text-accent-secondary">
                                <FaHospital />
                            </div>
                            <div className="text-left">
                                <p className="text-xs text-text-muted-light dark:text-text-muted-dark uppercase font-bold tracking-wider">
                                    Hospital
                                </p>
                                {/* Assuming we might populate hospital name or ID here later */}
                                <p className="font-medium text-text-light dark:text-text-dark">
                                    {doctor.hospitalId || 'Main Hospital'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-border-light dark:border-border-dark w-full">
                        <button className="btn btn-primary w-full max-w-sm flex items-center justify-center gap-2 mx-auto">
                            <FaCalendarCheck />
                            <span>Schedule Appointment</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
