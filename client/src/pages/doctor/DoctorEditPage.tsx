//-Path: "TeaChoco-Hospital/client/src/pages/doctor/DoctorEditPage.tsx"
import { Title } from '../../types/types';
import type { Doctor } from '../../types/doctor';
import Input from '../../components/custom/Input';
import Select from '../../components/custom/Select';
import { useDoctors } from '../../context/doctorsAtom';
import { useHospitals } from '../../context/hospitalsAtom';
import EditLayout from '../../components/layout/EditLayout';

export default function DoctorEditPage() {
    const { doctors } = useDoctors();
    const { hospitals } = useHospitals();

    return (
        <EditLayout<Doctor>
            title={Title.DOCTORS}
            newData={{
                _id: 'new',
                user_id: '',
                firstName: '',
                lastName: '',
                hospitalId: '',
                department: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            }}
            find={async (id) => doctors?.find((doctor) => doctor._id === id)}>
            {(data, setData) => (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            required
                            label="First Name"
                            value={data?.firstName}
                            onChange={(e) =>
                                setData((prev) => prev && { ...prev, firstName: e.target.value })
                            }
                        />
                        <Input
                            required
                            label="Last Name"
                            value={data?.lastName}
                            onChange={(e) =>
                                setData((prev) => prev && { ...prev, lastName: e.target.value })
                            }
                        />
                    </div>
                    <Input
                        label="Nickname"
                        value={data?.nickname || ''}
                        onChange={(e) =>
                            setData((prev) => prev && { ...prev, nickname: e.target.value })
                        }
                    />
                    <Select
                        label="Hospital"
                        value={data?.hospitalId}
                        onChange={(e) =>
                            setData((prev) => prev && { ...prev, hospitalId: e.target.value })
                        }>
                        {(Option) => (
                            <>
                                <Option value="">Select Hospital</Option>
                                {hospitals?.map((hospital) => (
                                    <Option key={hospital._id} value={hospital._id}>
                                        {hospital.name}
                                    </Option>
                                ))}
                            </>
                        )}
                    </Select>
                    <Input
                        required
                        label="Department"
                        value={data?.department}
                        onChange={(e) =>
                            setData((prev) => prev && { ...prev, department: e.target.value })
                        }
                    />
                    <Input
                        label="Contact Number"
                        value={data?.contactNumber || ''}
                        onChange={(e) =>
                            setData((prev) => prev && { ...prev, contactNumber: e.target.value })
                        }
                    />
                    <Input
                        label="Picture URL"
                        value={data?.picture || ''}
                        onChange={(e) =>
                            setData((prev) => prev && { ...prev, picture: e.target.value })
                        }
                    />
                </>
            )}
        </EditLayout>
    );
}
