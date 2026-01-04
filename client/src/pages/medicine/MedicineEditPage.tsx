//-Path: "TeaChoco-Hospital/client/src/pages/medicine/MedicineEditPage.tsx"
import {
    FaBox,
    FaPlus,
    FaVial,
    FaTrash,
    FaPills,
    FaFlask,
    FaClock,
    FaSyringe,
    FaCapsules,
    FaHospital,
    FaShieldCat,
    FaNotesMedical,
    FaPrescription,
    FaPrescriptionBottle,
} from 'react-icons/fa6';
import {
    MealTime,
    MedicineType,
    MedicineUnit,
    FoodRelation,
    type Medicine,
    StorageCondition,
} from '../../types/medicine';
import { useMemo } from 'react';
import { medicineAPI } from '../../services/api';
import Input from '../../components/custom/Input';
import Paper from '../../components/custom/Paper';
import Select from '../../components/custom/Select';
import { useMedicines } from '../../context/medicinesAtom';
import { useHospitals } from '../../context/hospitalsAtom';
import { Title, type OutApiData } from '../../types/types';
import EditLayout from '../../components/layout/EditLayout';

export default function MedicineEditPage() {
    const { medicines, resetMedicines } = useMedicines();
    const { hospitals, resetHospitals } = useHospitals();

    const formatDate = (date: Date | undefined) =>
        date ? new Date(date).toISOString().split('T')[0] : '';

    const getMedicineIcon = (type: MedicineType) => {
        if (type === MedicineType.TABLET) return <FaPills />;
        if (type === MedicineType.CAPSULE) return <FaCapsules />;
        if (type === MedicineType.SYRUP) return <FaPrescriptionBottle />;
        if (type === MedicineType.INJECTION) return <FaSyringe />;
        if (type === MedicineType.DROPS) return <FaFlask />;
        return <FaPills />;
    };

    const newData: OutApiData<Medicine> = useMemo(
        () => ({
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
            isActive: true,
            isCompleted: false,
        }),
        [],
    );

    return (
        <EditLayout<Medicine>
            newData={newData}
            title={Title.MEDICINES}
            onRemove={async (id) => {
                await medicineAPI.remove(id);
                resetMedicines();
                resetHospitals();
                return true;
            }}
            onSave={async (data, id) => {
                if (id === 'new') await medicineAPI.create(data);
                else await medicineAPI.update(id, data);
                resetMedicines();
                resetHospitals();
                return true;
            }}
            find={(id) => medicines?.find((m) => m._id === id)}>
            {(data, setData) => (
                <div className="space-y-8">
                    {/* Section 1: Clinical Identity */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <FaNotesMedical size={20} />
                            </div>
                            <h3 className="text-xl font-black text-text-light dark:text-text-dark tracking-tight">
                                Clinical Identity
                            </h3>
                        </div>

                        <Paper variant="100" className="p-6 space-y-6 border-l-4 border-primary/40">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    required
                                    label="Commercial Name"
                                    placeholder="e.g. Tylenol"
                                    value={data?.name}
                                    onChange={(e) =>
                                        setData((prev) => prev && { ...prev, name: e.target.value })
                                    }
                                />
                                <Input
                                    required
                                    label="Generic Composition"
                                    placeholder="e.g. Paracetamol"
                                    value={data?.genericName || ''}
                                    onChange={(e) =>
                                        setData(
                                            (prev) =>
                                                prev && { ...prev, genericName: e.target.value },
                                        )
                                    }
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Input
                                    label="Manufacturer / Brand"
                                    value={data?.brand || ''}
                                    onChange={(e) =>
                                        setData(
                                            (prev) => prev && { ...prev, brand: e.target.value },
                                        )
                                    }
                                />
                                <Select
                                    label="Medicine Form"
                                    value={data?.type}
                                    onChange={(e) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    type: e.target.value as MedicineType,
                                                },
                                        )
                                    }>
                                    {(Option) =>
                                        Object.values(MedicineType).map((type) => (
                                            <Option
                                                key={type}
                                                value={type}
                                                icon={getMedicineIcon(type)}>
                                                {type}
                                            </Option>
                                        ))
                                    }
                                </Select>
                                <Input
                                    label="Therapeutic Category"
                                    value={data.category || ''}
                                    onChange={(e) =>
                                        setData(
                                            (prev) => prev && { ...prev, category: e.target.value },
                                        )
                                    }
                                />
                            </div>

                            <div className="pt-2">
                                <Input
                                    label="Medicine Image URL"
                                    placeholder="https://..."
                                    value={data.imageUrl || ''}
                                    onChange={(e) =>
                                        setData(
                                            (prev) => prev && { ...prev, imageUrl: e.target.value },
                                        )
                                    }
                                />
                            </div>
                        </Paper>
                    </div>

                    {/* Section 2: Administration Protocol */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                                <FaPrescription size={20} />
                            </div>
                            <h3 className="text-xl font-black text-text-light dark:text-text-dark tracking-tight">
                                Administration Protocol
                            </h3>
                        </div>

                        <Paper
                            variant="100"
                            className="p-6 space-y-8 border-l-4 border-amber-500/40">
                            {/* Dosage Config */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10">
                                <Input
                                    type="number"
                                    label="Quantity Per Dose"
                                    value={data.dosage.quantity}
                                    onChange={(e) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    dosage: {
                                                        ...prev.dosage,
                                                        quantity: Number(e.target.value),
                                                    },
                                                },
                                        )
                                    }
                                />
                                <Select
                                    label="Unit"
                                    value={data.dosage.unit}
                                    onChange={(e) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    dosage: {
                                                        ...prev.dosage,
                                                        unit: e.target.value as MedicineUnit,
                                                    },
                                                },
                                        )
                                    }>
                                    {(Option) =>
                                        Object.values(MedicineUnit).map((unit) => (
                                            <Option key={unit} value={unit}>
                                                {unit}
                                            </Option>
                                        ))
                                    }
                                </Select>
                                <Input
                                    type="number"
                                    label="Times Per Day"
                                    value={data.dosage.frequencyPerDay}
                                    onChange={(e) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    dosage: {
                                                        ...prev.dosage,
                                                        frequencyPerDay: Number(e.target.value),
                                                    },
                                                },
                                        )
                                    }
                                />
                            </div>

                            {/* Take Instructions List */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-bold text-text-muted-light dark:text-text-muted-dark uppercase tracking-widest">
                                        Timing Schedule
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setData(
                                                (prev) =>
                                                    prev && {
                                                        ...prev,
                                                        takeInstructions: [
                                                            ...prev.takeInstructions,
                                                            { mealTime: MealTime.ANYTIME },
                                                        ],
                                                    },
                                            )
                                        }
                                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-xs font-black rounded-xl hover:bg-primary transition-colors hover:text-white">
                                        <FaPlus size={10} /> Add Schedule
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {data.takeInstructions.map((inst, index) => (
                                        <Paper
                                            key={index}
                                            variant="200"
                                            className="p-5 flex flex-col gap-4 relative group">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData(
                                                        (prev) =>
                                                            prev && {
                                                                ...prev,
                                                                takeInstructions:
                                                                    prev.takeInstructions.filter(
                                                                        (_, i) => i !== index,
                                                                    ),
                                                            },
                                                    )
                                                }
                                                className="absolute top-4 right-4 p-2 text-red-500/50 hover:text-red-500 transition-colors">
                                                <FaTrash size={14} />
                                            </button>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Select
                                                    label="Meal Reference"
                                                    value={inst.mealTime}
                                                    onChange={(e) =>
                                                        setData(
                                                            (prev) =>
                                                                prev && {
                                                                    ...prev,
                                                                    takeInstructions:
                                                                        prev.takeInstructions.map(
                                                                            (ti, i) =>
                                                                                i === index
                                                                                    ? {
                                                                                          ...ti,
                                                                                          mealTime:
                                                                                              e
                                                                                                  .target
                                                                                                  .value as MealTime,
                                                                                      }
                                                                                    : ti,
                                                                        ),
                                                                },
                                                        )
                                                    }>
                                                    {(Option) =>
                                                        Object.values(MealTime).map((mt) => (
                                                            <Option key={mt} value={mt}>
                                                                {mt}
                                                            </Option>
                                                        ))
                                                    }
                                                </Select>
                                                <Select
                                                    label="Food Relation"
                                                    value={inst.relation || ''}
                                                    onChange={(e) =>
                                                        setData(
                                                            (prev) =>
                                                                prev && {
                                                                    ...prev,
                                                                    takeInstructions:
                                                                        prev.takeInstructions.map(
                                                                            (ti, i) =>
                                                                                i === index
                                                                                    ? {
                                                                                          ...ti,
                                                                                          relation:
                                                                                              e
                                                                                                  .target
                                                                                                  .value as FoodRelation,
                                                                                      }
                                                                                    : ti,
                                                                        ),
                                                                },
                                                        )
                                                    }>
                                                    {(Option) => (
                                                        <>
                                                            <Option value="">N/A</Option>
                                                            {Object.values(FoodRelation).map(
                                                                (fr) => (
                                                                    <Option key={fr} value={fr}>
                                                                        {fr}
                                                                    </Option>
                                                                ),
                                                            )}
                                                        </>
                                                    )}
                                                </Select>
                                            </div>
                                            <Input
                                                label="Special Instructions"
                                                placeholder="e.g. Swallow whole"
                                                value={inst.notes || ''}
                                                onChange={(e) =>
                                                    setData(
                                                        (prev) =>
                                                            prev && {
                                                                ...prev,
                                                                takeInstructions:
                                                                    prev.takeInstructions.map(
                                                                        (ti, i) =>
                                                                            i === index
                                                                                ? {
                                                                                      ...ti,
                                                                                      notes: e
                                                                                          .target
                                                                                          .value,
                                                                                  }
                                                                                : ti,
                                                                    ),
                                                            },
                                                    )
                                                }
                                            />
                                        </Paper>
                                    ))}
                                </div>
                            </div>
                        </Paper>
                    </div>

                    {/* Section 3: Timing & Logistics */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500">
                                <FaClock size={20} />
                            </div>
                            <h3 className="text-xl font-black text-text-light dark:text-text-dark tracking-tight">
                                Timing & Logistics
                            </h3>
                        </div>

                        <Paper
                            variant="100"
                            className="p-6 space-y-8 border-l-4 border-indigo-500/40">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Input
                                    type="date"
                                    label="Treatment Start"
                                    value={formatDate(data.startDate)}
                                    onChange={(e) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    startDate: new Date(e.target.value),
                                                },
                                        )
                                    }
                                />
                                <Input
                                    type="date"
                                    label="Treatment End"
                                    value={formatDate(data.endDate)}
                                    onChange={(e) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    endDate: new Date(e.target.value),
                                                },
                                        )
                                    }
                                />
                                <Input
                                    type="date"
                                    label="Medicine Expiry"
                                    value={formatDate(data.expiryDate)}
                                    onChange={(e) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    expiryDate: new Date(e.target.value),
                                                },
                                        )
                                    }
                                />
                            </div>

                            <Select
                                label="Prescribing Hospital"
                                value={data.hospital.hospitalId}
                                icon={<FaHospital />}
                                onChange={(e) =>
                                    setData(
                                        (prev) =>
                                            prev && {
                                                ...prev,
                                                hospital: {
                                                    ...prev.hospital,
                                                    hospitalId: e.target.value,
                                                },
                                            },
                                    )
                                }>
                                {(Option) => (
                                    <>
                                        <Option value="">Unknown Provider</Option>
                                        {hospitals?.map((h) => (
                                            <Option key={h._id} value={h._id} icon={<FaHospital />}>
                                                {h.name}
                                            </Option>
                                        ))}
                                    </>
                                )}
                            </Select>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl text-indigo-500 shadow-sm">
                                        <FaBox size={18} />
                                    </div>
                                    <Input
                                        type="number"
                                        label="Units Left"
                                        value={data.package.tabletsPerStrip || 0}
                                        onChange={(e) =>
                                            setData(
                                                (prev) =>
                                                    prev && {
                                                        ...prev,
                                                        package: {
                                                            ...prev.package,
                                                            tabletsPerStrip: Number(e.target.value),
                                                        },
                                                    },
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl text-indigo-500 shadow-sm">
                                        <FaVial size={18} />
                                    </div>
                                    <Input
                                        type="number"
                                        label="Units Per Strip"
                                        value={data.package.stripsPerBox || 1}
                                        onChange={(e) =>
                                            setData(
                                                (prev) =>
                                                    prev && {
                                                        ...prev,
                                                        package: {
                                                            ...prev.package,
                                                            stripsPerBox: Number(e.target.value),
                                                        },
                                                    },
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </Paper>
                    </div>

                    {/* Section 4: Safety Workspace */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                                <FaShieldCat size={20} />
                            </div>
                            <h3 className="text-xl font-black text-text-light dark:text-text-dark tracking-tight">
                                Safety Workspace
                            </h3>
                        </div>

                        <Paper
                            variant="100"
                            className="p-6 space-y-6 border-l-4 border-emerald-500/40">
                            <Select
                                label="Storage Protocol"
                                value=""
                                onChange={(e) => {
                                    const val = e.target.value as StorageCondition;
                                    if (val && !data.storageConditions.includes(val))
                                        setData(
                                            (p) =>
                                                p && {
                                                    ...p,
                                                    storageConditions: [
                                                        ...p.storageConditions,
                                                        val,
                                                    ],
                                                },
                                        );
                                }}>
                                {(Option) => (
                                    <>
                                        <Option value="">Add Condition...</Option>
                                        {Object.values(StorageCondition).map((sc) => (
                                            <Option key={sc} value={sc}>
                                                {sc.replace('_', ' ')}
                                            </Option>
                                        ))}
                                    </>
                                )}
                            </Select>

                            <div className="flex flex-wrap gap-2">
                                {data.storageConditions.map((cond) => (
                                    <div
                                        key={cond}
                                        className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-lg text-[10px] font-black uppercase flex items-center gap-2 border border-emerald-500/20">
                                        {cond.replace('_', ' ')}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setData(
                                                    (p) =>
                                                        p && {
                                                            ...p,
                                                            storageConditions:
                                                                p.storageConditions.filter(
                                                                    (c) => c !== cond,
                                                                ),
                                                        },
                                                )
                                            }>
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-4 border-t border-border-light dark:border-border-dark">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-black text-text-muted-light dark:text-text-muted-dark uppercase tracking-widest">
                                        Clinical Warnings
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setData(
                                                (p) =>
                                                    p && {
                                                        ...p,
                                                        warnings: [
                                                            ...p.warnings,
                                                            {
                                                                description: '',
                                                                severity: 'warning' as any,
                                                            },
                                                        ],
                                                    },
                                            )
                                        }
                                        className="text-[10px] font-black text-primary hover:underline">
                                        + Add Warning
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {data.warnings.map((w, idx) => (
                                        <div key={idx} className="flex gap-4 items-end">
                                            <div className="flex-1">
                                                <Input
                                                    placeholder="e.g. May cause drowsiness"
                                                    value={w.description}
                                                    onChange={(e) =>
                                                        setData(
                                                            (p) =>
                                                                p && {
                                                                    ...p,
                                                                    warnings: p.warnings.map(
                                                                        (item, i) =>
                                                                            i === idx
                                                                                ? {
                                                                                      ...item,
                                                                                      description:
                                                                                          e.target
                                                                                              .value,
                                                                                  }
                                                                                : item,
                                                                    ),
                                                                },
                                                        )
                                                    }
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData(
                                                        (p) =>
                                                            p && {
                                                                ...p,
                                                                warnings: p.warnings.filter(
                                                                    (_, i) => i !== idx,
                                                                ),
                                                            },
                                                    )
                                                }
                                                className="mb-2 p-2 text-red-500">
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Paper>
                    </div>

                    <Paper
                        variant="100"
                        className="p-4 bg-primary/5 border border-primary/20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className={`w-3 h-3 rounded-full ${
                                    data.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                                }`}
                            />
                            <span className="text-sm font-black text-text-light dark:text-text-dark uppercase tracking-widest">
                                {data.isActive
                                    ? 'Medicine is currently Active'
                                    : 'Medicine is Inactive'}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setData((p) => p && { ...p, isActive: !p.isActive })}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                data.isActive
                                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                                    : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                            }`}>
                            {data.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                    </Paper>
                </div>
            )}
        </EditLayout>
    );
}
