//-Path: "TeaChoco-Hospital/client/src/pages/medicine/MedicineDetailPage.tsx"
import {
    FaBox,
    FaVial,
    FaPills,
    FaClock,
    FaHistory,
    FaHospital,
    FaShieldAlt,
    FaPrescription,
    FaExclamationTriangle,
} from 'react-icons/fa';
import moment from 'moment';
import { Title } from '../../types/types';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMedicines } from '../../store/useMedicineStore';
import DetailLayout from '../../components/layout/DetailLayout';

export default function MedicineDetailPage() {
    const { t } = useTranslation();
    const { medicines } = useMedicines();
    const [activeImgIndex, setActiveImgIndex] = useState(0);

    // Reset index when medicines change or component remounts
    useEffect(() => {
        setActiveImgIndex(0);
    }, [medicines]);

    return (
        <DetailLayout datas={medicines} title={Title.MEDICINES}>
            {(medicine) => (
                <div className="space-y-8 animate-in fade-in duration-700 pb-12">
                    {/* Header Section - Modern High-End Layout */}
                    <div className="relative overflow-hidden rounded-lg bg-white dark:bg-slate-900 border border-border-light dark:border-border-dark shadow-2xl shadow-primary/5">
                        {/* Dramatic Background Elements */}
                        <div className="absolute inset-0 bg-linear-to-br from-primary/3 via-transparent to-accent/3" />
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/5 blur-[100px] rounded-full" />

                        <div className="relative z-1 p-8 lg:p-12 flex flex-col lg:flex-row gap-12">
                            {/* Left Side: Modern Image Gallery */}
                            <div className="w-full lg:w-[400px] space-y-6">
                                <div className="group relative aspect-square rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800/50 border border-border-light dark:border-border-dark shadow-inner p-4">
                                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    {medicine.imageUrl && medicine.imageUrl.length > 0 ? (
                                        <img
                                            src={
                                                medicine.imageUrl[activeImgIndex] ||
                                                medicine.imageUrl[0]
                                            }
                                            alt={medicine.name}
                                            className="w-full h-full object-contain transition-all duration-1000 group-hover:scale-110 drop-shadow-2xl"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-200 dark:text-slate-700">
                                            <FaPills
                                                size={100}
                                                className="opacity-20 translate-y-4"
                                            />
                                            <p className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted-light">
                                                No Visual Reference
                                            </p>
                                        </div>
                                    )}

                                    {/* Glass Overlay Badges */}
                                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-2xl shadow-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                                                {medicine.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Refined Thumbnails */}
                                {medicine.imageUrl && medicine.imageUrl.length > 1 && (
                                    <div className="flex justify-center gap-4 overflow-x-auto p-1 custom-scrollbar">
                                        {medicine.imageUrl.map((url, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveImgIndex(idx)}
                                                className={`z-50 relative w-20 h-20 rounded-2xl overflow-hidden transition-all duration-500 border-2 ${
                                                    activeImgIndex === idx
                                                        ? 'border-primary ring-4 ring-primary/10 scale-110 shadow-lg'
                                                        : 'border-transparent opacity-40 hover:opacity-100 hover:scale-105'
                                                }`}>
                                                <img
                                                    src={url}
                                                    alt="thumbnail"
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right Side: Essential Info */}
                            <div className="flex-1 flex flex-col justify-center space-y-8">
                                <div className="space-y-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span
                                            className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${
                                                medicine.isActive
                                                    ? 'bg-emerald-500/10 text-emerald-600'
                                                    : 'bg-slate-500/10 text-slate-500'
                                            }`}>
                                            {medicine.isActive
                                                ? t('medicines.active')
                                                : t('medicines.inactive')}
                                        </span>
                                        {medicine.category && (
                                            <span className="px-4 py-1 bg-primary/5 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                                                {medicine.category}
                                            </span>
                                        )}
                                    </div>
                                    <h1 className="text-5xl lg:text-7xl font-black text-text-light dark:text-text-dark tracking-tighter leading-tight">
                                        {medicine.name}
                                    </h1>
                                    <div className="flex items-center gap-4">
                                        <div className="h-0.5 w-12 bg-primary/30" />
                                        <p className="text-xl lg:text-3xl font-bold text-text-muted-light italic opacity-80 tracking-tight">
                                            {medicine.genericName}
                                        </p>
                                    </div>
                                </div>

                                {/* Sophisticated Dosage & Timing Card */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:max-w-xl">
                                    <div className="p-6 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-border-light dark:border-border-dark group transition-all duration-500 hover:bg-primary/5">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center justify-between">
                                                <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-border-light dark:border-border-dark text-primary">
                                                    <FaPills size={22} />
                                                </div>
                                                <span className="text-[10px] font-black text-text-muted-light uppercase tracking-widest">
                                                    Dosage
                                                </span>
                                            </div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-4xl font-black text-text-light dark:text-text-dark tracking-tighter">
                                                    {medicine.dosage.quantity}
                                                </span>
                                                <span className="text-lg font-bold text-text-muted-light uppercase tracking-tighter">
                                                    {medicine.dosage.unit}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-lg bg-slate-50 dark:bg-slate-800/30 border border-border-light dark:border-border-dark group transition-all duration-500 hover:bg-primary/5">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center justify-between">
                                                <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-border-light dark:border-border-dark text-amber-500">
                                                    <FaClock size={22} />
                                                </div>
                                                <span className="text-[10px] font-black text-text-muted-light uppercase tracking-widest">
                                                    Frequency
                                                </span>
                                            </div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-4xl font-black text-text-light dark:text-text-dark tracking-tighter">
                                                    {medicine.dosage.frequencyPerDay}
                                                </span>
                                                <span className="text-sm font-black text-text-muted-light uppercase tracking-widest leading-none">
                                                    {t('medicines.dosesDaily')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Column: Schedule & Safety (8 units) */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* Medication Schedule Timeline */}
                            <div className="p-8 rounded-lg bg-white dark:bg-slate-900 border border-border-light dark:border-border-dark overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 -translate-y-4 translate-x-4 pointer-events-none">
                                    <FaHistory size={180} />
                                </div>

                                <div className="relative z-1 space-y-8">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-2xl font-black text-text-light dark:text-text-dark tracking-tighter flex items-center gap-3">
                                            <div className="w-2 h-8 bg-amber-500 rounded-full" />
                                            {t('medicines.timingSchedule')}
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {medicine.takeInstructions.map((inst, i) => (
                                            <div
                                                key={i}
                                                className="group relative p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-border-light dark:border-border-dark transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 transition-colors group-hover:bg-amber-500 group-hover:text-white">
                                                        <FaClock size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-amber-600 group-hover:text-amber-500 uppercase tracking-widest transition-colors mb-0.5">
                                                            {t(
                                                                `medicines.enums.MealTime.${inst.mealTime}`,
                                                            )}
                                                        </p>
                                                        <p className="text-sm font-bold text-text-light dark:text-text-dark italic opacity-70">
                                                            {inst.relation
                                                                ? t(
                                                                      `medicines.enums.FoodRelation.${inst.relation}`,
                                                                  )
                                                                : t('common.na')}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="pt-4 border-t border-border-light dark:border-border-dark">
                                                    <div className="flex items-start gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                                                        <FaPrescription
                                                            size={14}
                                                            className="mt-0.5 shrink-0 text-text-muted-light"
                                                        />
                                                        <p className="text-sm leading-relaxed text-text-muted-light dark:text-text-muted-dark">
                                                            {inst.notes ||
                                                                t('medicines.noNotesProvided')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Medication Progress Bar */}
                                    <div className="p-6 rounded-3xl bg-secondary/5 border border-secondary/10">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-secondary">
                                                Treatment Period
                                            </span>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted-light">
                                                {moment(medicine.startDate).format('DD MMM YYYY')} –{' '}
                                                {medicine.endDate
                                                    ? moment(medicine.endDate).format('DD MMM YYYY')
                                                    : 'Ongoing'}
                                            </span>
                                        </div>
                                        <div className="h-2 w-full bg-white dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                                            <div className="h-full bg-secondary w-[65%] rounded-full shadow-[0_0_12px_rgba(var(--secondary),0.4)]" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Clinical Context & Safety Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-8 rounded-lg bg-white dark:bg-slate-900 border border-border-light dark:border-border-dark space-y-6">
                                    <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em] flex items-center gap-3">
                                        <FaShieldAlt size={16} />
                                        {t('medicines.storageProtocol')}
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {(medicine.storageConditions || []).map((cond, idx) => (
                                            <span
                                                key={idx}
                                                className="px-4 py-2 bg-primary/5 border border-primary/10 rounded-2xl text-xs font-black text-primary uppercase tracking-tight shadow-xs">
                                                {t(`medicines.enums.StorageCondition.${cond}`)}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-xs text-text-muted-light dark:text-text-muted-dark italic opacity-70 leading-relaxed">
                                        {medicine.storageNotes ||
                                            t('medicines.specialInstructionsPlaceholder')}
                                    </p>
                                </div>

                                <div className="p-8 rounded-lg bg-white dark:bg-slate-900 border border-border-light dark:border-border-dark space-y-6">
                                    <h4 className="text-xs font-black text-amber-500 uppercase tracking-[0.2em] flex items-center gap-3">
                                        <FaBox size={16} />
                                        {t('medicines.fullPackage')}
                                    </h4>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-text-muted-light uppercase tracking-widest">
                                                {t('medicines.unitsLeft')}
                                            </p>
                                            <p className="text-2xl font-black text-text-light dark:text-text-dark tracking-tighter">
                                                {medicine.package?.tabletsPerStrip || '-'}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-text-muted-light uppercase tracking-widest">
                                                {t('medicines.stripsPerBox')}
                                            </p>
                                            <p className="text-2xl font-black text-text-light dark:text-text-dark tracking-tighter">
                                                {medicine.package?.stripsPerBox || 1}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-border-light dark:border-border-dark">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            <p className="text-[10px] font-black text-text-muted-light uppercase tracking-widest">
                                                {t('medicines.expiryDate')}:{' '}
                                                {moment(medicine.expiryDate).format('DD MMM YYYY')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Health Context (4 units) */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Prescribing Authority Card */}
                            <div className="p-8 rounded-lg bg-linear-to-br from-indigo-500 to-primary text-white shadow-2xl shadow-primary/20 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 -rotate-12 translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                                    <FaHospital size={250} />
                                </div>

                                <div className="relative z-1 space-y-8">
                                    <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-80 border-b border-white/20 pb-4">
                                        Prescribing Authority
                                    </h3>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-5">
                                            <div className="w-14 h-14 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shrink-0 shadow-lg">
                                                <FaHospital size={24} />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">
                                                    {t('medicines.prescribingHospital')}
                                                </p>
                                                <h4 className="text-xl font-black tracking-tight leading-tight">
                                                    {/* TODO: Get doctor name from doctor store */}
                                                    {medicine.hospital?.doctorId ||
                                                        t('medicines.unknownProvider')}
                                                </h4>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-5">
                                            <div className="w-14 h-14 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shrink-0 shadow-lg">
                                                <FaVial size={24} />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">
                                                    {t('appointments.department')}
                                                </p>
                                                <h4 className="text-xl font-black tracking-tight leading-tight">
                                                    {medicine.hospital?.department ||
                                                        t('common.na')}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1">
                                        <p className="text-[9px] font-black uppercase tracking-widest opacity-60">
                                            Dispensed On
                                        </p>
                                        <p className="text-base font-bold tracking-tight">
                                            {moment(medicine.hospital?.dispenseDate).format(
                                                'DD MMMM YYYY',
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Risk Management & Warnings */}
                            {medicine.warnings && medicine.warnings.length > 0 && (
                                <div className="p-8 rounded-lg bg-red-500/5 dark:bg-red-950/20 border border-red-500/20 space-y-6">
                                    <div className="flex items-center gap-3 text-red-500">
                                        <FaExclamationTriangle size={20} />
                                        <h3 className="text-lg font-black uppercase tracking-tighter">
                                            {t('medicines.securitySafetyManifest')}
                                        </h3>
                                    </div>
                                    <div className="space-y-4">
                                        {medicine.warnings.map((warning, idx) => (
                                            <div
                                                key={idx}
                                                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-red-500/10 shadow-sm relative overflow-hidden">
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                                                <p className="text-sm font-bold text-red-600 dark:text-red-400 capitalize">
                                                    {warning.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Side Effects Minimalist Grid */}
                            {medicine.sideEffects && medicine.sideEffects.length > 0 && (
                                <div className="p-8 rounded-lg bg-white dark:bg-slate-900 border border-border-light dark:border-border-dark space-y-6">
                                    <h3 className="text-xs font-black text-text-muted-light uppercase tracking-[0.2em]">
                                        Possible Side Effects
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {medicine.sideEffects.map((effect, idx) => (
                                            <span
                                                key={idx}
                                                className="px-4 py-2 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-border-light dark:border-border-dark text-[10px] font-bold text-text-muted-light dark:text-text-muted-dark transition-all hover:bg-primary/5 hover:text-primary">
                                                {effect.description}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Refined Activity Log Footer */}
                    <div className="p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900/50 border border-border-light dark:border-border-dark flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                                    <FaHistory className="text-primary opacity-40" size={16} />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-text-muted-light">
                                        {t('common.recorded')}
                                    </p>
                                    <p className="text-xs font-bold text-text-light dark:text-text-dark uppercase">
                                        {moment(medicine.createdAt).format('DD MMM YYYY, HH:mm')}
                                    </p>
                                </div>
                            </div>
                            <div className="h-10 w-px bg-border-light dark:border-border-dark hidden md:block" />
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
                                    <FaClock className="text-accent opacity-40" size={16} />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-text-muted-light">
                                        {t('common.modified')}
                                    </p>
                                    <p className="text-xs font-bold text-text-light dark:text-text-dark uppercase">
                                        {moment(medicine.updatedAt).format('DD MMM YYYY, HH:mm')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 py-3 rounded-full bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark shadow-sm">
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                                Medical Record ID: {medicine._id}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </DetailLayout>
    );
}
