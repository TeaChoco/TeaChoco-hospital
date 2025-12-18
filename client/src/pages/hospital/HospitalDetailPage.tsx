//-Path: "TeaChoco-Hospital/client/src/pages/hospital/HospitalDetailPage.tsx"
import { Activity } from 'react';
import { Allow } from '../../types/auth';
import { useHospitals } from '../../context/hospitalsAtom';
import DetailLayout from '../../components/layout/DetailLayout';
import { FaHospital, FaPhone, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

export default function HospitalDetailPage() {
    const hospitals = useHospitals();

    return (
        <DetailLayout allow={Allow.HOSPITALS} find={(id) => hospitals?.find((h) => h._id === id)}>
            {(hospital) => (
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

                            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
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

                                <Activity mode={hospital.website ? 'visible' : 'hidden'}>
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
                                </Activity>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DetailLayout>
    );
}
