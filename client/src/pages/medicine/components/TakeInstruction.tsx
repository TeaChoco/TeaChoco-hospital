// -Path: "TeaChoco-Hospital/client/src/pages/medicine/components/TakeInstruction.tsx"
import React from 'react';
import {
    MealTime,
    FoodRelation,
    type Medicine,
    type TakeInstruction,
} from '../../../types/medicine';
import { FaTrash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Input from '../../../components/custom/Input';
import Paper from '../../../components/custom/Paper';
import Select from '../../../components/custom/Select';
import type { OutApiData } from '../../../types/types';

export default function TakeInstruction({
    index,
    setData,
    instruction,
}: {
    index: number;
    instruction: TakeInstruction;
    setData: React.Dispatch<React.SetStateAction<OutApiData<Medicine> | undefined>>;
}) {
    const { t } = useTranslation();

    return (
        <Paper variant="200" className="p-5 flex flex-col gap-4 relative group">
            <button
                type="button"
                onClick={() =>
                    setData(
                        (prev) =>
                            prev && {
                                ...prev,
                                takeInstructions: prev.takeInstructions.filter(
                                    (_, idx) => idx !== index,
                                ),
                            },
                    )
                }
                className="z-10 absolute top-2 right-2 p-2 bg-red-500/5 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                <FaTrash size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                    label={t('medicines.mealReference')}
                    value={instruction.mealTime}
                    options={Object.values(MealTime).map((mt) => ({
                        value: mt,
                        label: t(`medicines.enums.MealTime.${mt}`),
                    }))}
                    onChange={(event) =>
                        setData(
                            (prev) =>
                                prev && {
                                    ...prev,
                                    takeInstructions: prev.takeInstructions.map((ti, idx) =>
                                        idx === index
                                            ? {
                                                  ...ti,
                                                  mealTime: event.target.value as MealTime,
                                              }
                                            : ti,
                                    ),
                                },
                        )
                    }
                />
                <Select
                    label={t('medicines.foodRelation')}
                    value={instruction.relation || ''}
                    options={[
                        { value: '', label: t('common.na') },
                        ...Object.values(FoodRelation).map((fr) => ({
                            value: fr,
                            label: t(`medicines.enums.FoodRelation.${fr}`),
                        })),
                    ]}
                    onChange={(event) =>
                        setData(
                            (prev) =>
                                prev && {
                                    ...prev,
                                    takeInstructions: prev.takeInstructions.map((ti, idx) =>
                                        idx === index
                                            ? {
                                                  ...ti,
                                                  relation: event.target.value as FoodRelation,
                                              }
                                            : ti,
                                    ),
                                },
                        )
                    }
                />
            </div>
            <Input
                label={t('medicines.specialInstructions')}
                placeholder={t('medicines.specialInstructionsPlaceholder')}
                value={instruction.notes || ''}
                onChange={(event) =>
                    setData(
                        (prev) =>
                            prev && {
                                ...prev,
                                takeInstructions: prev.takeInstructions.map((ti, idx) =>
                                    idx === index
                                        ? {
                                              ...ti,
                                              notes: event.target.value,
                                          }
                                        : ti,
                                ),
                            },
                    )
                }
            />
        </Paper>
    );
}
