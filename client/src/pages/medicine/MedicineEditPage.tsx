// -Path: "TeaChoco-Hospital/client/src/pages/medicine/MedicineEditPage.tsx"
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
    FaCalendarDays,
    FaPrescriptionBottle,
} from 'react-icons/fa6';
import {
    MealTime,
    MedicineType,
    MedicineUnit,
    type Medicine,
    DayOfWeek,
    StorageCondition,
} from '../../types/medicine';
import { useMemo } from 'react';
import { FaImage } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { medicineAPI } from '../../services/api';
import Input from '../../components/custom/Input';
import Paper from '../../components/custom/Paper';
import Select from '../../components/custom/Select';
import InputDate from '../../components/custom/InputDate';
import { Title, type OutApiData } from '../../types/types';
import EditLayout from '../../components/layout/EditLayout';
import { useMedicines } from '../../store/useMedicineStore';
import { useHospitals } from '../../store/useHospitalStore';
import TakeInstruction from './components/TakeInstruction';
import InputMultiImg from '../../components/custom/InputMultiImg';

export default function MedicineEditPage() {
    const { t } = useTranslation();
    const { medicines, resetMedicines } = useMedicines();
    const { hospitals, resetHospitals } = useHospitals();

    /**
     * @param {MedicineType} type
     * @returns {React.ReactNode}
     */
    const getMedicineIcon = (type: MedicineType) => {
        if (type === MedicineType.TABLET) return <FaPills />;
        if (type === MedicineType.CAPSULE) return <FaCapsules />;
        if (type === MedicineType.SYRUP) return <FaPrescriptionBottle />;
        if (type === MedicineType.INJECTION) return <FaSyringe />;
        if (type === MedicineType.DROPS) return <FaFlask />;
        return <FaPills />;
    };

    /** @type {OutApiData<Medicine>} */
    const newData: OutApiData<Medicine> = useMemo(
        () => ({
            name: '',
            brand: '',
            category: '',
            genericName: '',
            takeInstructions: [],
            type: MedicineType.TABLET,
            dosage: {
                quantity: 1,
                frequencyPerDay: 1,
                unit: MedicineUnit.TABLET,
            },
            hospital: {
                hospitalId: '',
                dispenseDate: new Date(),
                prescriptionDate: new Date(),
            },
            endDate: new Date(),
            startDate: new Date(),
            expiryDate: new Date(),
            storageConditions: [],
            frequencyDays: [],
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
                console.log(data);

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
                                {t('medicines.sectionClinical')}
                            </h3>
                        </div>

                        <Paper variant="100" className="p-6 space-y-6 border-l-4 border-primary/40">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    required
                                    label={t('medicines.commercialName')}
                                    placeholder={t('medicines.commercialNamePlaceholder')}
                                    value={data?.name}
                                    onChange={(event) =>
                                        setData(
                                            (prev) => prev && { ...prev, name: event.target.value },
                                        )
                                    }
                                />
                                <Input
                                    label={t('medicines.genericComposition')}
                                    placeholder={t('medicines.genericCompositionPlaceholder')}
                                    value={data?.genericName || ''}
                                    onChange={(event) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    genericName: event.target.value,
                                                },
                                        )
                                    }
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Input
                                    label={t('medicines.brand')}
                                    value={data?.brand || ''}
                                    onChange={(event) =>
                                        setData(
                                            (prev) =>
                                                prev && { ...prev, brand: event.target.value },
                                        )
                                    }
                                />
                                <Select
                                    label={t('medicines.form')}
                                    value={data?.type}
                                    options={Object.values(MedicineType).map((type) => ({
                                        value: type,
                                        label: t(`medicines.enums.MedicineType.${type}`),
                                        icon: getMedicineIcon(type),
                                    }))}
                                    onChange={(event) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    type: event.target.value as MedicineType,
                                                },
                                        )
                                    }
                                />
                                <Input
                                    label={t('medicines.category')}
                                    value={data.category || ''}
                                    onChange={(event) =>
                                        setData(
                                            (prev) =>
                                                prev && { ...prev, category: event.target.value },
                                        )
                                    }
                                />
                            </div>

                            <InputMultiImg
                                className="pt-2"
                                value={data.imageUrl || []}
                                label={t('medicines.imageUrl')}
                                icon={<FaImage className="text-primary/60" />}
                                placeholder={t('medicines.imageUrlPlaceholder')}
                                setValue={(value) =>
                                    setData((prev) => prev && { ...prev, imageUrl: value })
                                }
                            />
                        </Paper>
                    </div>

                    {/* Section 2: Administration Protocol */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                                <FaPrescription size={20} />
                            </div>
                            <h3 className="text-xl font-black text-text-light dark:text-text-dark tracking-tight">
                                {t('medicines.sectionAdministration')}
                            </h3>
                        </div>

                        <Paper
                            variant="100"
                            className="p-6 space-y-8 border-l-4 border-amber-500/40">
                            {/* Dosage Config */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10">
                                <Input
                                    type="number"
                                    label={t('medicines.quantity')}
                                    value={data.dosage.quantity}
                                    onChange={(event) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    dosage: {
                                                        ...prev.dosage,
                                                        quantity: Number(event.target.value),
                                                    },
                                                },
                                        )
                                    }
                                />
                                <Select
                                    label={t('medicines.unit')}
                                    value={data.dosage.unit}
                                    options={Object.values(MedicineUnit).map((unit) => ({
                                        value: unit,
                                        label: t(`medicines.enums.MedicineUnit.${unit}`),
                                    }))}
                                    onChange={(event) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    dosage: {
                                                        ...prev.dosage,
                                                        unit: event.target.value as MedicineUnit,
                                                    },
                                                },
                                        )
                                    }
                                />
                                <Input
                                    type="number"
                                    label={t('medicines.frequency')}
                                    value={data.dosage.frequencyPerDay}
                                    onChange={(event) =>
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    dosage: {
                                                        ...prev.dosage,
                                                        frequencyPerDay: Number(event.target.value),
                                                    },
                                                },
                                        )
                                    }
                                />
                            </div>

                            {/* Frequency Days Selection */}
                            <div className="space-y-4 p-6 bg-slate-500/5 rounded-2xl border border-border-light dark:border-border-dark">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500">
                                            <FaCalendarDays size={16} />
                                        </div>
                                        <p className="text-sm font-black text-text-light dark:text-text-dark uppercase tracking-widest">
                                            {t('medicines.medicationDays')}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const allDays = Object.values(DayOfWeek);
                                            const isAllSelected = data.frequencyDays?.length === 7;
                                            setData(
                                                (prev) =>
                                                    prev && {
                                                        ...prev,
                                                        frequencyDays: isAllSelected ? [] : allDays,
                                                    },
                                            );
                                        }}
                                        className="text-[10px] font-black text-primary hover:underline uppercase tracking-tight">
                                        {data.frequencyDays?.length === 7
                                            ? t('common.clearAll')
                                            : t('medicines.everyDay')}
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {Object.values(DayOfWeek).map((day) => {
                                        const isSelected = data.frequencyDays?.includes(day);
                                        return (
                                            <button
                                                key={day}
                                                type="button"
                                                onClick={() => {
                                                    setData((prev) => {
                                                        if (!prev) return prev;
                                                        const exists =
                                                            prev.frequencyDays.includes(day);
                                                        return {
                                                            ...prev,
                                                            frequencyDays: exists
                                                                ? prev.frequencyDays.filter(
                                                                      (d) => d !== day,
                                                                  )
                                                                : [...prev.frequencyDays, day],
                                                        };
                                                    });
                                                }}
                                                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 border ${
                                                    isSelected
                                                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105'
                                                        : 'bg-white dark:bg-slate-800 text-text-muted-light dark:text-text-muted-dark border-border-light dark:border-border-dark hover:border-primary/40'
                                                }`}>
                                                {t(`common.daysAbbr.${day}`)}
                                            </button>
                                        );
                                    })}
                                </div>
                                <p className="text-[10px] italic text-text-muted-light opacity-60">
                                    *{' '}
                                    {data.frequencyDays?.length === 0
                                        ? t('medicines.everyDayDefault')
                                        : t('medicines.selectedDaysOnly')}
                                </p>
                            </div>

                            {/* Take Instructions List */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-bold text-text-muted-light dark:text-text-muted-dark uppercase tracking-widest">
                                        {t('medicines.timingSchedule')}
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
                                        <FaPlus size={10} /> {t('medicines.addSchedule')}
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {data.takeInstructions.map((instruction, index) => (
                                        <TakeInstruction
                                            key={index}
                                            index={index}
                                            setData={setData}
                                            instruction={instruction}
                                        />
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
                                {t('medicines.sectionLogistics')}
                            </h3>
                        </div>

                        <Paper
                            variant="100"
                            className="p-6 space-y-8 border-l-4 border-indigo-500/40">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <InputDate
                                    label={t('medicines.treatmentStart')}
                                    value={data.startDate}
                                    setValue={(value) =>
                                        setData((prev) => prev && { ...prev, startDate: value })
                                    }
                                />
                                <InputDate
                                    label={t('medicines.treatmentEnd')}
                                    value={data.endDate}
                                    setValue={(value) =>
                                        setData((prev) => prev && { ...prev, endDate: value })
                                    }
                                />
                                <InputDate
                                    label={t('medicines.expiry')}
                                    value={data.expiryDate}
                                    setValue={(value) =>
                                        setData((prev) => prev && { ...prev, expiryDate: value })
                                    }
                                />
                            </div>

                            <Select
                                options={[
                                    { value: '', label: t('medicines.unknownProvider') },
                                    ...(hospitals?.map((hospital) => ({
                                        label: hospital.name,
                                        value: hospital._id,
                                        icon: <FaHospital />,
                                    })) || []),
                                ]}
                                label={t('medicines.prescribingHospital')}
                                value={data.hospital.hospitalId}
                                icon={<FaHospital />}
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
                                }
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-indigo-500/5 rounded-2xl border border-indigo-500/10">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl text-indigo-500 shadow-sm">
                                        <FaBox size={18} />
                                    </div>
                                    <Input
                                        type="number"
                                        label={t('medicines.unitsLeft')}
                                        value={data.package.tabletsPerStrip || 0}
                                        onChange={(event) =>
                                            setData(
                                                (prev) =>
                                                    prev && {
                                                        ...prev,
                                                        package: {
                                                            ...prev.package,
                                                            tabletsPerStrip: Number(
                                                                event.target.value,
                                                            ),
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
                                        label={t('medicines.unitsPerStrip')}
                                        value={data.package.stripsPerBox || 1}
                                        onChange={(event) =>
                                            setData(
                                                (prev) =>
                                                    prev && {
                                                        ...prev,
                                                        package: {
                                                            ...prev.package,
                                                            stripsPerBox: Number(
                                                                event.target.value,
                                                            ),
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
                                {t('medicines.sectionSafety')}
                            </h3>
                        </div>

                        <Paper
                            variant="100"
                            className="p-6 space-y-6 border-l-4 border-emerald-500/40">
                            <Select
                                value=""
                                options={[
                                    { value: '', label: t('medicines.addCondition') },
                                    ...Object.values(StorageCondition).map((condition) => ({
                                        value: condition,
                                        label: t(`medicines.enums.StorageCondition.${condition}`),
                                    })),
                                ]}
                                label={t('medicines.storageProtocol')}
                                onChange={(event) => {
                                    const value = event.target.value as StorageCondition;
                                    if (value && !data.storageConditions.includes(value))
                                        setData(
                                            (prev) =>
                                                prev && {
                                                    ...prev,
                                                    storageConditions: [
                                                        ...prev.storageConditions,
                                                        value,
                                                    ],
                                                },
                                        );
                                }}
                            />

                            <div className="flex flex-wrap gap-2">
                                {data.storageConditions.map((condition) => (
                                    <div
                                        key={condition}
                                        className="px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-lg text-[10px] font-black uppercase flex items-center gap-2 border border-emerald-500/20">
                                        {t(`medicines.enums.StorageCondition.${condition}`)}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setData(
                                                    (prev) =>
                                                        prev && {
                                                            ...prev,
                                                            storageConditions:
                                                                prev.storageConditions.filter(
                                                                    (item) => item !== condition,
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
                                        {t('medicines.clinicalWarnings')}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setData(
                                                (prev) =>
                                                    prev && {
                                                        ...prev,
                                                        warnings: [
                                                            ...prev.warnings,
                                                            {
                                                                description: '',
                                                                severity: 'warning' as any,
                                                            },
                                                        ],
                                                    },
                                            )
                                        }
                                        className="text-[10px] font-black text-primary hover:underline">
                                        + {t('medicines.addWarning')}
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {data.warnings.map((warning, idx) => (
                                        <div key={idx} className="flex gap-4 items-end">
                                            <div className="flex-1">
                                                <Input
                                                    placeholder={t('medicines.warningPlaceholder')}
                                                    value={warning.description}
                                                    onChange={(event) =>
                                                        setData(
                                                            (prev) =>
                                                                prev && {
                                                                    ...prev,
                                                                    warnings: prev.warnings.map(
                                                                        (item, index) =>
                                                                            index === idx
                                                                                ? {
                                                                                      ...item,
                                                                                      description:
                                                                                          event
                                                                                              .target
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
                                                        (prev) =>
                                                            prev && {
                                                                ...prev,
                                                                warnings: prev.warnings.filter(
                                                                    (_, index) => index !== idx,
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
                            <FaShieldCat size={20} />
                            <span className="text-sm font-black text-text-light dark:text-text-dark uppercase tracking-widest">
                                {data.isActive
                                    ? t('medicines.isActiveMsg')
                                    : t('medicines.isInactiveMsg')}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                setData((prev) => prev && { ...prev, isActive: !prev.isActive })
                            }
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                data.isActive
                                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                                    : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                            }`}>
                            {data.isActive ? t('medicines.deactivate') : t('medicines.activate')}
                        </button>
                    </Paper>
                </div>
            )}
        </EditLayout>
    );
}
