//-Path: "TeaChoco-Hospital/client/src/components/HospitalCard.tsx"
import React from 'react';
import type { Hospital } from '../types/hospital';
import { FaHospital, FaMapMarkerAlt, FaPhone, FaExternalLinkAlt } from 'react-icons/fa';

interface HospitalCardProps {
    hospital: Hospital;
    onClick?: (hospital: Hospital) => void;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onClick }) => {
    return (
        <div
            onClick={() => onClick?.(hospital)}
            className="bg-bg-card-light dark:bg-bg-card-dark rounded-xl shadow-sm border border-border-light dark:border-border-dark p-5 hover:shadow-md hover:border-primary transition-all duration-300 cursor-pointer flex flex-col h-full group">
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <FaHospital size={24} />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-text-light dark:text-text-dark text-lg group-hover:text-primary transition-colors">
                        {hospital.name}
                    </h3>

                    <div className="mt-2 space-y-2">
                        {hospital.address && (
                            <div className="flex items-start gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                <FaMapMarkerAlt
                                    size={14}
                                    className="mt-1 flex-shrink-0 text-text-muted-light dark:text-text-muted-dark"
                                />
                                <span>{hospital.address}</span>
                            </div>
                        )}

                        {hospital.contactNumber && (
                            <div className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                <FaPhone
                                    size={14}
                                    className="flex-shrink-0 text-text-muted-light dark:text-text-muted-dark"
                                />
                                <span>{hospital.contactNumber}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-4 flex gap-2">
                {hospital.website && (
                    <a
                        href={hospital.website}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-border-light dark:border-border-dark text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark hover:bg-bg-card-hover-light dark:hover:bg-bg-card-hover-dark hover:border-primary transition-colors">
                        <FaExternalLinkAlt size={12} />
                        Visit Website
                    </a>
                )}
                <button className="flex-1 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                    View Details
                </button>
            </div>
        </div>
    );
};
