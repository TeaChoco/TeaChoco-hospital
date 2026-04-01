//-Path: "TeaChoco-Hospital/client/src/pages/doctor/DoctorDetailPage.tsx"
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Title } from '../../types/types';
import { useTranslation } from 'react-i18next';
import { useDoctors } from '../../store/useDoctorStore';
import { useHospitals } from '../../store/useHospitalStore';
import DetailLayout from '../../components/layout/DetailLayout';
import { FaPhone, FaClock, FaHistory, FaUserMd, FaHospital, FaChevronRight } from 'react-icons/fa';

export default function DoctorDetailPage() {
    const { t } = useTranslation();
    const { doctors } = useDoctors();
    const { hospitals } = useHospitals();

    return (
        <DetailLayout datas={doctors} title={Title.DOCTORS}>
            {(doctor) => (
                <div className="bg-bg-card-light dark:bg-bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark p-6 md:p-10 pb-0 md:pb-0">
                    <div className="flex flex-col items-center text-center py-6">
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
                            <a
                                href={`tel:${doctor.contactNumber}`}
                                className="group flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-border-light dark:border-border-dark hover:border-primary/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
                                <div className="p-2.5 bg-white dark:bg-slate-700 rounded-lg text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                    <FaPhone className="text-sm" />
                                </div>
                                <div className="text-left flex-1">
                                    <p className="text-[10px] text-text-muted-light dark:text-text-muted-dark uppercase font-bold tracking-widest mb-0.5">
                                        {t('doctors.contactNumber')}
                                    </p>
                                    <p className="font-semibold text-text-light dark:text-text-dark group-hover:text-primary transition-colors">
                                        {doctor.contactNumber || t('common.notAvailable')}
                                    </p>
                                </div>
                                <FaChevronRight
                                    className="text-text-muted-light/30 dark:text-text-muted-dark/30 group-hover:text-primary group-hover:translate-x-1 transition-all"
                                    size={12}
                                />
                            </a>

                            <Link
                                to={`/hospitals/${doctor.hospitalId}`}
                                className="group flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-border-light dark:border-border-dark hover:border-accent-secondary/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-accent-secondary/5 transition-all duration-300 hover:-translate-y-1">
                                <div className="p-2.5 bg-white dark:bg-slate-700 rounded-lg text-accent-secondary shadow-sm group-hover:bg-accent-secondary group-hover:text-white transition-colors duration-300">
                                    <FaHospital className="text-sm" />
                                </div>
                                <div className="text-left flex-1">
                                    <p className="text-[10px] text-text-muted-light dark:text-text-muted-dark uppercase font-bold tracking-widest mb-0.5">
                                        {t('doctors.affiliatedHospital')}
                                    </p>
                                    <p className="font-semibold text-text-light dark:text-text-dark group-hover:text-accent-secondary transition-colors line-clamp-1">
                                        {hospitals?.find(
                                            (hospital) => hospital._id === doctor.hospitalId,
                                        )?.name || t('common.notAvailable')}
                                    </p>
                                </div>
                                <FaChevronRight
                                    className="text-text-muted-light/30 dark:text-text-muted-dark/30 group-hover:text-accent-secondary group-hover:translate-x-1 transition-all"
                                    size={12}
                                />
                            </Link>
                        </div>

                        {/* <div className="mt-4 py-4  border-t border-border-light dark:border-border-dark w-full">
                            <button className="btn btn-primary w-full max-w-sm flex items-center justify-center gap-2 mx-auto">
                                <FaCalendarCheck />
                                <span>Schedule Appointment</span>
                            </button>
                        </div> */}
                    </div>

                    <div className="p-6 md:px-10 py-4 flex flex-col md:flex-row gap-4 border-t border-border-light dark:border-border-dark">
                        <div className="flex items-center gap-2 text-text-muted-light dark:text-text-muted-dark">
                            <FaClock className="shrink-0" size={14} />
                            <span className="text-xs font-medium">{t('common.createdAt')}:</span>
                            <span className="text-xs">
                                {doctor.createdAt
                                    ? moment(doctor.createdAt).format('DD MMM YYYY, HH:mm')
                                    : t('common.na')}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-text-muted-light dark:text-text-muted-dark">
                            <FaHistory className="shrink-0" size={14} />
                            <span className="text-xs font-medium">{t('common.updatedAt')}:</span>
                            <span className="text-xs">
                                {doctor.updatedAt
                                    ? moment(doctor.updatedAt).format('DD MMM YYYY, HH:mm')
                                    : t('common.na')}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </DetailLayout>
    );
}
