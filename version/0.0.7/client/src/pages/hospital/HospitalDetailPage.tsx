//-Path: "TeaChoco-Hospital/client/src/pages/hospital/HospitalDetailPage.tsx"
import moment from 'moment';
import { Title } from '../../types/types';
import { useTranslation } from 'react-i18next';
import Activity from '../../components/custom/Activity';
import { useHospitals } from '../../store/useHospitalStore';
import DetailLayout from '../../components/layout/DetailLayout';
import { FaPhone, FaGlobe, FaClock, FaHistory, FaHospital, FaMapMarkerAlt } from 'react-icons/fa';

export default function HospitalDetailPage() {
    const { t } = useTranslation();
    const { hospitals } = useHospitals();

    return (
        <DetailLayout datas={hospitals} title={Title.HOSPITALS}>
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
                                {t('hospitals.partnerHospital')}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${hospital.address}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                                <FaMapMarkerAlt
                                    className="mt-1 text-primary shrink-0 group-hover:scale-110 transition-transform"
                                    size={20}
                                />
                                <div>
                                    <h3 className="font-bold text-text-light dark:text-text-dark mb-1 group-hover:text-accent transition-colors">
                                        {t('common.address')}
                                    </h3>
                                    <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                                        {hospital.address || t('hospitals.addressPlaceholder')}
                                    </p>
                                </div>
                            </a>

                            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <a
                                    href={
                                        hospital.contactNumber
                                            ? `tel:${hospital.contactNumber}`
                                            : undefined
                                    }
                                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                                    <FaPhone
                                        className="text-accent-secondary shrink-0 group-hover:scale-110 transition-transform"
                                        size={20}
                                    />
                                    <div>
                                        <h3 className="font-bold text-text-light dark:text-text-dark mb-1 group-hover:text-accent transition-colors">
                                            {t('common.phone')}
                                        </h3>
                                        <p className="text-text-secondary-light dark:text-text-secondary-dark">
                                            {hospital.contactNumber || t('common.notAvailable')}
                                        </p>
                                    </div>
                                </a>

                                <Activity visible={hospital.website}>
                                    <a
                                        href={hospital.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex w-full items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                                        <FaGlobe
                                            className="text-accent shrink-0 group-hover:scale-110 transition-transform"
                                            size={20}
                                        />
                                        <div>
                                            <h3 className="font-bold text-text-light dark:text-text-dark mb-1 group-hover:text-accent transition-colors">
                                                {t('common.website')}
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

                    <div className="p-6 md:px-10 py-4 flex flex-col md:flex-row gap-4 border-t border-border-light dark:border-border-dark">
                        <div className="flex items-center gap-2 text-text-muted-light dark:text-text-muted-dark">
                            <FaClock className="shrink-0" size={14} />
                            <span className="text-xs font-medium">{t('common.createdAt')}:</span>
                            <span className="text-xs">
                                {hospital.createdAt
                                    ? moment(hospital.createdAt).format('DD MMM YYYY, HH:mm')
                                    : t('common.na')}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-text-muted-light dark:text-text-muted-dark">
                            <FaHistory className="shrink-0" size={14} />
                            <span className="text-xs font-medium">{t('common.updatedAt')}:</span>
                            <span className="text-xs">
                                {hospital.updatedAt
                                    ? moment(hospital.updatedAt).format('DD MMM YYYY, HH:mm')
                                    : t('common.na')}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </DetailLayout>
    );
}
