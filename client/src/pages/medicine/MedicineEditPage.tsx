//-Path: "TeaChoco-Hospital/client/src/pages/medicine/MedicineEditPage.tsx"
import { Title } from '../../types/types';
import Input from '../../components/custom/Input';
import Select from '../../components/custom/Select';
import { useMedicines } from '../../context/medicinesAtom';
import { useHospitals } from '../../context/hospitalsAtom';
import EditLayout from '../../components/layout/EditLayout';
import { MedicineType, MedicineUnit, type Medicine } from '../../types/medicine';

export default function MedicineEditPage() {
    const medicines = useMedicines();
    const hospitals = useHospitals();

    const formatDate = (date: Date | undefined) => {
        if (!date) return '';
        return new Date(date).toISOString().split('T')[0];
    };

    return (
        <EditLayout<Medicine>
            title={Title.MEDICINES}
            newData={{
                _id: 'new',
                name: '',
                genericName: '',
                brand: '',
                type: MedicineType.TABLET,
                category: '',
                takeInstructions: [],
                dosage: {
                    unit: MedicineUnit.TABLET,
                    quantity: 1,
                    frequencyPerDay: 1,
                },
                hospital: {
                    hospitalId: '',
                    prescriptionDate: new Date(),
                    dispenseDate: new Date(),
                },
                startDate: new Date(),
                endDate: new Date(),
                expiryDate: new Date(),
                storageConditions: [],
                package: {
                    tabletsPerStrip: 0,
                },
                sideEffects: [],
                warnings: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                createdBy: '',
                isActive: true,
                isCompleted: false,
            }}
            find={async (id) => medicines?.find((medicine) => medicine._id === id)}>
            {(data, setData) => (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            required
                            label="Name"
                            value={data?.name}
                            onChange={(event) =>
                                setData((prev) => prev && { ...prev, name: event.target.value })
                            }
                        />
                        <Input
                            required
                            label="Generic Name"
                            value={data?.genericName}
                            onChange={(event) =>
                                setData(
                                    (prev) => prev && { ...prev, genericName: event.target.value },
                                )
                            }
                        />
                    </div>
                    <Input
                        label="Brand"
                        value={data?.brand || ''}
                        onChange={(event) =>
                            setData((prev) => prev && { ...prev, brand: event.target.value })
                        }
                    />
                    <Select
                        label="Type"
                        value={data?.type}
                        onChange={(event) =>
                            setData(
                                (prev) =>
                                    prev && {
                                        ...prev,
                                        type: event.target.value as MedicineType,
                                    },
                            )
                        }>
                        {Object.values(MedicineType).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </Select>
                    <Input
                        label="Category"
                        value={data.category || ''}
                        onChange={(event) =>
                            setData((prev) => prev && { ...prev, category: event.target.value })
                        }
                    />
                    <Select
                        label="Hospital"
                        value={data.hospital.hospitalId}
                        onChange={(event) =>
                            setData(
                                (prev) =>
                                    prev && {
                                        ...prev,
                                        hospital: {
                                            ...prev.hospital,
                                            hospitalId: event.target.value,
                                        },
                                    },
                            )
                        }>
                        <option value="">Select Hospital</option>
                        {hospitals?.map((hospital) => (
                            <option key={hospital._id} value={hospital._id}>
                                {hospital.name}
                            </option>
                        ))}
                    </Select>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                            type="date"
                            label="Start Date"
                            value={formatDate(data.startDate)}
                            onChange={(event) =>
                                setData(
                                    (prev) =>
                                        prev && {
                                            ...prev,
                                            startDate: new Date(event.target.value),
                                        },
                                )
                            }
                        />
                        <Input
                            type="date"
                            label="End Date"
                            value={formatDate(data.endDate)}
                            onChange={(event) =>
                                setData(
                                    (prev) =>
                                        prev && {
                                            ...prev,
                                            endDate: new Date(event.target.value),
                                        },
                                )
                            }
                        />
                        <Input
                            type="date"
                            label="Expiry Date"
                            value={formatDate(data.expiryDate)}
                            onChange={(event) =>
                                setData(
                                    (prev) =>
                                        prev && {
                                            ...prev,
                                            expiryDate: new Date(event.target.value),
                                        },
                                )
                            }
                        />
                    </div>
                </>
            )}
        </EditLayout>
    );
}
