//-Path: "TeaChoco-Hospital/src/pages/medicine/MedicineEditPage.tsx"
import {
    FaFlask,
    FaPills,
    FaSyringe,
    FaCapsules,
    FaHospital,
    FaPrescriptionBottle,
} from 'react-icons/fa6';
import { Title } from '../../types/types';
import Input from '../../components/custom/Input';
import Select from '../../components/custom/Select';
import { useMedicines } from '../../context/medicinesAtom';
import { useHospitals } from '../../context/hospitalsAtom';
import EditLayout from '../../components/layout/EditLayout';
import {
    FoodRelation,
    MealTime,
    MedicineType,
    MedicineUnit,
    type Medicine,
} from '../../types/medicine';
import Paper from '../../components/custom/Paper';

export default function MedicineEditPage() {
    const { medicines } = useMedicines();
    const { hospitals } = useHospitals();

    const formatDate = (date: Date | undefined) => {
        if (!date) return '';
        return new Date(date).toISOString().split('T')[0];
    };

    const getMedicineIcon = (type: MedicineType) => {
        switch (type) {
            case MedicineType.TABLET:
                return <FaPills />;
            case MedicineType.CAPSULE:
                return <FaCapsules />;
            case MedicineType.SYRUP:
                return <FaPrescriptionBottle />;
            case MedicineType.INJECTION:
                return <FaSyringe />;
            case MedicineType.DROPS:
                return <FaFlask />;
            default:
                return <FaPills />;
        }
    };

    return (
        <EditLayout<Medicine>
            title={Title.MEDICINES}
            newData={{
                _id: 'new',
                user_id: '',
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
                            value={data?.genericName || ''}
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
                        {(Option) =>
                            Object.values(MedicineType).map((type) => (
                                <Option key={type} value={type} icon={getMedicineIcon(type)}>
                                    {type}
                                </Option>
                            ))
                        }
                    </Select>
                    <Input
                        label="Category"
                        value={data.category || ''}
                        onChange={(event) =>
                            setData((prev) => prev && { ...prev, category: event.target.value })
                        }
                    />
                    {/* takeInstructions */}
                    <Paper variant="100" className="space-y-4">
                        <h3 className="text-lg font-semibold mb-2">Take Instructions</h3>
                        {data?.takeInstructions.map((takeInstruction, index) => (
                            <Paper key={index} variant="200" className="space-y-2">
                                <Select
                                    label="Meal Time"
                                    value={takeInstruction.mealTime || ''}
                                    onChange={(event) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    takeInstructions: prev.takeInstructions.map(
                                                        (takeInstruction) => ({
                                                            ...takeInstruction,
                                                            mealTime: event.target
                                                                .value as MealTime,
                                                        }),
                                                    ),
                                                },
                                        )
                                    }>
                                    {(Option) =>
                                        Object.values(MealTime).map((mealTime) => (
                                            <Option key={mealTime} value={mealTime}>
                                                {mealTime}
                                            </Option>
                                        ))
                                    }
                                </Select>
                                <Select
                                    label="Relation"
                                    value={takeInstruction.relation || ''}
                                    onChange={(event) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    takeInstructions: prev.takeInstructions.map(
                                                        (takeInstruction) => ({
                                                            ...takeInstruction,
                                                            relation: event.target
                                                                .value as FoodRelation,
                                                        }),
                                                    ),
                                                },
                                        )
                                    }>
                                    {(Option) => (
                                        <>
                                            <Option value="" icon={<FaHospital />}>
                                                Select Relation
                                            </Option>
                                            {Object.values(FoodRelation).map((foodRelation) => (
                                                <Option key={foodRelation} value={foodRelation}>
                                                    {foodRelation}
                                                </Option>
                                            ))}
                                        </>
                                    )}
                                </Select>
                                <div className="flex">
                                    <Input
                                        type="number"
                                        label="Time Interval"
                                        value={takeInstruction.interval?.value}
                                        onChange={(event) =>
                                            setData(
                                                (prev) =>
                                                    prev && {
                                                        ...prev,
                                                        takeInstructions: prev.takeInstructions.map(
                                                            (takeInstruction) => ({
                                                                ...takeInstruction,
                                                                timeInterval: {
                                                                    ...takeInstruction.interval,
                                                                    value: Number(
                                                                        event.target.value,
                                                                    ),
                                                                },
                                                            }),
                                                        ),
                                                    },
                                            )
                                        }
                                    />
                                </div>
                            </Paper>
                        ))}
                        <button
                            type="button"
                            onClick={() =>
                                setData(
                                    (prev) =>
                                        prev && {
                                            ...prev,
                                            takeInstructions: [
                                                ...prev.takeInstructions,
                                                {
                                                    mealTime: MealTime.ANYTIME,
                                                },
                                            ],
                                        },
                                )
                            }
                            className="btn btn-primary">
                            Add Take Instruction
                        </button>
                    </Paper>

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
                        {(Option) => (
                            <>
                                <Option value="" icon={<FaHospital />}>
                                    Select Hospital
                                </Option>
                                {hospitals?.map((hospital) => (
                                    <Option
                                        key={hospital._id}
                                        value={hospital._id}
                                        icon={<FaHospital className="text-primary" />}>
                                        {hospital.name}
                                    </Option>
                                ))}
                            </>
                        )}
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
