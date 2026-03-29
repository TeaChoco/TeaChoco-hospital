// -Path: "TeaChoco-Hospital/client/src/pages/doctor/DoctorEditPage.tsx"
import {
    FaPhone,
    FaImage,
    FaUserTie,
    FaHospital,
    FaBriefcase,
    FaUserDoctor,
    FaAddressCard,
} from 'react-icons/fa6';
import { useMemo } from 'react';
import { doctorAPI } from '../../services/api';
import type { Doctor } from '../../types/doctor';
import { useTranslation } from 'react-i18next';
import Input from '../../components/custom/Input';
import Paper from '../../components/custom/Paper';
import Select from '../../components/custom/Select';
import { useDoctors } from '../../context/doctorsAtom';
import { useHospitals } from '../../context/hospitalsAtom';
import { Title, type OutApiData } from '../../types/types';
import EditLayout from '../../components/layout/EditLayout';

export default function DoctorEditPage() {
    const { t } = useTranslation();
    const { hospitals, resetHospitals } = useHospitals();
    const { doctors, resetDoctors } = useDoctors();

    const newData: OutApiData<Doctor> = useMemo(
        () => ({
            lastName: '',
            firstName: '',
            department: '',
            hospitalId: '',
        }),
        [],
    );

    return (
        <EditLayout<Doctor>
            newData={newData}
            title={Title.DOCTORS}
            onRemove={async (id) => {
                await doctorAPI.remove(id);
                resetHospitals();
                resetDoctors();
                return true;
            }}
            onSave={async (data, id) => {
                if (id === 'new') await doctorAPI.create(data);
                else await doctorAPI.update(id, data);
                resetHospitals();
                resetDoctors();
                return true;
            }}
            find={(id) => doctors?.find((doctor) => doctor._id === id)}>
            {(data, setData) => (
                <div className="space-y-8">
                    {/* Section 1: Clinical Identity */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary shadow-xs">
                                <FaUserDoctor size={20} />
                            </div>
                            <h3 className="text-xl font-black text-text-light dark:text-text-dark tracking-tight">
                                {t('doctors.sectionIdentity')}
                            </h3>
                        </div>

                        <Paper variant="100" className="p-6 space-y-6 border-l-4 border-primary/40">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    required
                                    label={t('doctors.firstName')}
                                    placeholder={t('doctors.firstNamePlaceholder')}
                                    icon={<FaUserTie className="text-primary/60" />}
                                    value={data?.firstName}
                                    onChange={(event) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    firstName: event.target.value,
                                                },
                                        )
                                    }
                                />
                                <Input
                                    required
                                    label={t('doctors.lastName')}
                                    placeholder={t('doctors.lastNamePlaceholder')}
                                    icon={<FaUserTie className="text-primary/60" />}
                                    value={data?.lastName}
                                    onChange={(event) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    lastName: event.target.value,
                                                },
                                        )
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label={t('doctors.nickname')}
                                    placeholder={t('doctors.nicknamePlaceholder')}
                                    icon={<FaAddressCard className="text-primary/60" />}
                                    value={data?.nickname || ''}
                                    onChange={(event) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    nickname: event.target.value,
                                                },
                                        )
                                    }
                                />
                                <Input
                                    label={t('doctors.profileImage')}
                                    placeholder={t('doctors.profileImagePlaceholder')}
                                    icon={<FaImage className="text-primary/60" />}
                                    value={data?.picture || ''}
                                    onChange={(event) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    picture: event.target.value,
                                                },
                                        )
                                    }
                                />
                            </div>
                        </Paper>
                    </div>

                    {/* Section 2: Professional Credentials */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500 shadow-xs">
                                <FaBriefcase size={20} />
                            </div>
                            <h3 className="text-xl font-black text-text-light dark:text-text-dark tracking-tight">
                                {t('doctors.sectionCredentials')}
                            </h3>
                        </div>

                        <Paper
                            variant="100"
                            className="p-6 space-y-6 border-l-4 border-indigo-500/40">
                            <Select
                                required
                                options={[
                                    { value: '', label: t('doctors.selectInstitution') },
                                    ...(hospitals?.map((h) => ({
                                        value: h._id,
                                        label: h.name,
                                    })) || []),
                                ]}
                                label={t('doctors.affiliatedHospital')}
                                icon={<FaHospital className="text-indigo-500/60" />}
                                value={data?.hospitalId}
                                onChange={(event) =>
                                    setData(
                                        (prev) =>
                                            prev && {
                                                ...prev,
                                                hospitalId: event.target.value,
                                            },
                                    )
                                }
                            />
                            <Input
                                required
                                label={t('doctors.medicalDepartment')}
                                placeholder={t('doctors.departmentPlaceholder')}
                                icon={<FaBriefcase className="text-indigo-500/60" />}
                                value={data?.department}
                                onChange={(event) =>
                                    setData(
                                        (prev) =>
                                            prev && {
                                                ...prev,
                                                department: event.target.value,
                                            },
                                    )
                                }
                            />
                        </Paper>
                    </div>

                    {/* Section 3: Communication */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 shadow-xs">
                                <FaPhone size={20} />
                            </div>
                            <h3 className="text-xl font-black text-text-light dark:text-text-dark tracking-tight">
                                {t('doctors.sectionCommunication')}
                            </h3>
                        </div>

                        <Paper
                            variant="100"
                            className="p-6 space-y-6 border-l-4 border-emerald-500/40">
                            <Input
                                label={t('doctors.contact')}
                                placeholder={t('doctors.contactPlaceholder')}
                                icon={<FaPhone className="text-emerald-500/60" />}
                                value={data?.contactNumber || ''}
                                onChange={(event) =>
                                    setData(
                                        (prev) =>
                                            prev && {
                                                ...prev,
                                                contactNumber: event.target.value,
                                            },
                                    )
                                }
                            />
                        </Paper>
                    </div>

                    <div className="opacity-50">
                        <p className="text-[10px] font-black uppercase tracking-widest text-center">
                            {t('doctors.footerInfo')}
                        </p>
                    </div>
                </div>
            )}
        </EditLayout>
    );
}
