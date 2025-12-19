//-Path: "TeaChoco-Hospital/client/src/pages/hospital/HospitalEditPage.tsx"
import { Title } from '../../types/types';
import Input from '../../components/custom/Input';
import type { Hospital } from '../../types/hospital';
import { useHospitals } from '../../context/hospitalsAtom';
import EditLayout from '../../components/layout/EditLayout';

export default function HospitalEditPage() {
    const { hospitals } = useHospitals();

    return (
        <EditLayout<Hospital>
            title={Title.HOSPITALS}
            newData={{
                _id: 'new',
                name: '',
                address: '',
                contactNumber: '',
                website: '',
                createdAt: new Date(),
                updatedAt: new Date(),
            }}
            find={async (id) => hospitals?.find((h) => h._id === id)}>
            {(data, setData) => (
                <>
                    <Input
                        required
                        label="Name"
                        value={data.name}
                        onChange={(event) =>
                            setData((prev) => prev && { ...prev, name: event.target.value })
                        }
                    />
                    <Input
                        label="Address"
                        value={data.address || ''}
                        onChange={(event) =>
                            setData((prev) => prev && { ...prev, address: event.target.value })
                        }
                    />
                    <Input
                        label="Contact Number"
                        value={data.contactNumber || ''}
                        onChange={(event) =>
                            setData(
                                (prev) => prev && { ...prev, contactNumber: event.target.value },
                            )
                        }
                    />
                    <Input
                        label="Website"
                        value={data.website || ''}
                        onChange={(event) =>
                            setData((prev) => prev && { ...prev, website: event.target.value })
                        }
                    />
                </>
            )}
        </EditLayout>
    );
}
