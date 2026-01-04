//-Path: "TeaChoco-Hospital/client/src/pages/doctor/DoctorEditPage.tsx"
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
import Input from '../../components/custom/Input';
import Paper from '../../components/custom/Paper';
import Select from '../../components/custom/Select';
import { useDoctors } from '../../context/doctorsAtom';
import { useHospitals } from '../../context/hospitalsAtom';
import { Title, type OutApiData } from '../../types/types';
import EditLayout from '../../components/layout/EditLayout';

export default function DoctorEditPage() {
    const { hospitals, resetHospitals } = useHospitals();
    const { doctors, resetDoctors } = useDoctors();

    const newData: OutApiData<Doctor> = useMemo(
        () => ({
            firstName: '',
            lastName: '',
            hospitalId: '',
            department: '',
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
                                Practitioner Identity
                            </h3>
                        </div>

                        <Paper variant="100" className="p-6 space-y-6 border-l-4 border-primary/40">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    required
                                    label="First Name"
                                    placeholder="e.g. John"
                                    icon={<FaUserTie className="text-primary/60" />}
                                    value={data?.firstName}
                                    onChange={(e) =>
                                        setData((p) => p && { ...p, firstName: e.target.value })
                                    }
                                />
                                <Input
                                    required
                                    label="Last Name"
                                    placeholder="e.g. Doe"
                                    icon={<FaUserTie className="text-primary/60" />}
                                    value={data?.lastName}
                                    onChange={(e) =>
                                        setData((p) => p && { ...p, lastName: e.target.value })
                                    }
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Nickname / Alias"
                                    placeholder="e.g. Dr. John"
                                    icon={<FaAddressCard className="text-primary/60" />}
                                    value={data?.nickname || ''}
                                    onChange={(e) =>
                                        setData((p) => p && { ...p, nickname: e.target.value })
                                    }
                                />
                                <Input
                                    label="Professional Profile Image"
                                    placeholder="https://..."
                                    icon={<FaImage className="text-primary/60" />}
                                    value={data?.picture || ''}
                                    onChange={(e) =>
                                        setData((p) => p && { ...p, picture: e.target.value })
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
                                Professional Credentials
                            </h3>
                        </div>

                        <Paper
                            variant="100"
                            className="p-6 space-y-6 border-l-4 border-indigo-500/40">
                            <Select
                                required
                                label="Affiliated Hospital"
                                icon={<FaHospital className="text-indigo-500/60" />}
                                value={data?.hospitalId}
                                onChange={(e) =>
                                    setData((p) => p && { ...p, hospitalId: e.target.value })
                                }>
                                {(Option) => (
                                    <>
                                        <Option value="">Select Institution</Option>
                                        {hospitals?.map((h) => (
                                            <Option key={h._id} value={h._id}>
                                                {h.name}
                                            </Option>
                                        ))}
                                    </>
                                )}
                            </Select>
                            <Input
                                required
                                label="Medical Department"
                                placeholder="e.g. Cardiology"
                                icon={<FaBriefcase className="text-indigo-500/60" />}
                                value={data?.department}
                                onChange={(e) =>
                                    setData((p) => p && { ...p, department: e.target.value })
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
                                Communication
                            </h3>
                        </div>

                        <Paper
                            variant="100"
                            className="p-6 space-y-6 border-l-4 border-emerald-500/40">
                            <Input
                                label="Primary Contact Number"
                                placeholder="+1 (234) 567-8900"
                                icon={<FaPhone className="text-emerald-500/60" />}
                                value={data?.contactNumber || ''}
                                onChange={(e) =>
                                    setData((p) => p && { ...p, contactNumber: e.target.value })
                                }
                            />
                        </Paper>
                    </div>

                    <div className="opacity-50">
                        <p className="text-[10px] font-black uppercase tracking-widest text-center">
                            practitioner profile securely encrypted and stored
                        </p>
                    </div>
                </div>
            )}
        </EditLayout>
    );
}
