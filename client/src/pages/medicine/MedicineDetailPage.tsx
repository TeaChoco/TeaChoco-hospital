//-Path: "TeaChoco-Hospital/client/src/pages/medicine/MedicineDetailPage.tsx"
import {
    FaBox,
    FaVial,
    FaPills,
    FaClock,
    FaHistory,
    FaSyringe,
    FaHospital,
    FaShieldAlt,
    FaPrescription,
    FaExclamationTriangle,
} from 'react-icons/fa';
import moment from 'moment';
import { Allow } from '../../types/auth';
import { useMedicines } from '../../context/medicinesAtom';
import DetailLayout from '../../components/layout/DetailLayout';

export default function MedicineDetailPage() {
    const { medicines } = useMedicines();

    return (
        <DetailLayout datas={medicines} allow={Allow.MEDICINES}>
            {(medicine) => (
                <div className="bg-bg-card-light dark:bg-bg-card-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark overflow-hidden">
                    {/* Refined Premium Header Section - Compact & Elegant */}
                    <div className="relative p-6 md:p-8 pt-12 md:pt-16 min-h-[260px] flex flex-col justify-end overflow-hidden border-b border-border-light dark:border-border-dark">
                        {/* More Subtle Decorative Background */}
                        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background-light to-accent/5 dark:from-primary/10 dark:via-background-dark dark:to-accent/10" />
                        <div className="absolute top-[-10%] right-[-5%] w-[380px] h-[380px] bg-primary/10 blur-[100px] rounded-full animate-pulse" />
                        <div className="absolute bottom-[-15%] left-[-5%] w-[250px] h-[250px] bg-accent/5 blur-[80px] rounded-full" />

                        <div className="relative z-1 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 w-full">
                            <div className="flex-1 space-y-4">
                                {/* Status & Badges - Tighter Layout */}
                                <div className="flex flex-wrap items-center gap-2">
                                    <div
                                        className={`px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-xs ${
                                            medicine.isActive
                                                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                                                : 'bg-slate-500/10 text-slate-600 border-slate-500/20'
                                        }`}>
                                        {medicine.isActive ? 'Active' : 'Inactive'}
                                    </div>
                                    <div className="px-3 py-1 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-xl shadow-xs">
                                        <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">
                                            {medicine.type}
                                        </p>
                                    </div>
                                    {medicine.category && (
                                        <div className="px-3 py-1 bg-accent/5 border border-accent/10 rounded-xl">
                                            <p className="text-[9px] font-black text-accent uppercase tracking-[0.15em]">
                                                {medicine.category}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Identity Section */}
                                <div className="space-y-1.5">
                                    <h1 className="text-4xl md:text-5xl font-black text-text-light dark:text-text-dark tracking-tighter leading-none filter drop-shadow-sm">
                                        {medicine.name}
                                    </h1>
                                    <div className="flex items-center gap-2 pl-1">
                                        <div className="w-1 h-4 bg-primary/40 rounded-full" />
                                        <p className="text-lg font-bold text-text-muted-light dark:text-text-muted-dark tracking-tight italic opacity-80">
                                            {medicine.genericName}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Integrated Dosage Card - Smart Compact */}
                            <div className="shrink-0 w-full lg:w-auto">
                                <div className="relative p-0.5 rounded-3xl bg-linear-to-br from-white/50 to-white/10 dark:from-white/10 dark:to-transparent backdrop-blur-2xl border border-white/40 dark:border-white/5 shadow-lg group">
                                    <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full scale-50 group-hover:scale-100 transition-all duration-700 opacity-30" />
                                    <div className="relative px-6 py-4 rounded-[1.4rem] bg-white dark:bg-slate-900 border border-white/10 flex items-center gap-6">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="p-2.5 bg-primary/5 dark:bg-primary/20 rounded-2xl text-primary shadow-inner">
                                                <FaSyringe size={18} />
                                            </div>
                                            <span className="text-[8px] font-black text-primary uppercase tracking-tighter">
                                                {medicine.dosage.quantity} {medicine.dosage.unit}
                                            </span>
                                        </div>
                                        <div className="h-10 w-px bg-border-light dark:border-border-dark opacity-50" />
                                        <div className="flex flex-col">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-4xl font-black text-text-light dark:text-text-dark tracking-tighter leading-none">
                                                    {medicine.dosage.frequencyPerDay}
                                                </span>
                                                <span className="text-xl font-bold opacity-30">
                                                    x
                                                </span>
                                            </div>
                                            <span className="text-[9px] font-black text-text-muted-light dark:text-text-muted-dark uppercase tracking-widest leading-none mt-1">
                                                Doses Daily
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 md:p-10 space-y-12">
                        {/* Main Grid: Info & Media */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {/* Medicine Visual & Package */}
                            <div className="space-y-6">
                                <h3 className="text-xs font-black text-text-muted-light dark:text-text-muted-dark uppercase tracking-[0.2em] flex items-center gap-2">
                                    <div className="w-6 h-px bg-primary/30" />
                                    Product Visualization
                                </h3>

                                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800/40 border border-border-light dark:border-border-dark group shadow-sm">
                                    {medicine.imageUrl ? (
                                        <img
                                            src={medicine.imageUrl}
                                            alt={medicine.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-200 dark:text-slate-700">
                                            <FaPills size={100} className="animate-pulse" />
                                        </div>
                                    )}
                                    <div className="absolute bottom-4 right-4 p-4 bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-2xl border border-white/50 dark:border-white/10 shadow-lg">
                                        <p className="text-[10px] font-black text-text-muted-light dark:text-text-muted-dark uppercase mb-1">
                                            Expiry Date
                                        </p>
                                        <p className="text-sm font-bold text-text-light dark:text-text-dark">
                                            {moment(medicine.expiryDate).format('DD MMM YYYY')}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-5 rounded-2xl bg-secondary/5 border border-secondary/10 flex items-center justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-accent-secondary shadow-sm">
                                            <FaBox size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-text-muted-light dark:text-text-muted-dark uppercase leading-none mb-1">
                                                Full Package
                                            </p>
                                            <p className="text-sm font-bold text-text-light dark:text-text-dark">
                                                {medicine.package?.tabletsPerStrip || '-'} Units
                                                Left
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-text-muted-light dark:text-text-muted-dark uppercase mb-1">
                                            Units In Box
                                        </p>
                                        <p className="text-xs font-bold text-primary">
                                            {medicine.package?.stripsPerBox || 1} Strips / Box
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Administration & Clinical Context */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="space-y-6">
                                    <h3 className="text-xs font-black text-text-muted-light dark:text-text-muted-dark uppercase tracking-[0.2em] flex items-center gap-2">
                                        <div className="w-6 h-px bg-amber-500/30" />
                                        Administration Protocols
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {medicine.takeInstructions.map((inst, i) => (
                                            <div
                                                key={i}
                                                className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-border-light dark:border-border-dark hover:border-primary/40 transition-all shadow-sm group">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="p-3 bg-primary/5 dark:bg-primary/20 rounded-2xl text-primary group-hover:scale-110 transition-transform">
                                                        <FaClock size={16} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                                                            {inst.mealTime}
                                                        </p>
                                                        <p className="text-sm font-bold text-text-light dark:text-text-dark capitalize italic opacity-70">
                                                            {inst.relation?.replace('_', ' ')} Meal
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="h-px bg-border-light dark:border-border-dark mb-4" />
                                                <div className="flex items-center gap-3">
                                                    <FaPrescription
                                                        size={12}
                                                        className="text-text-muted-light"
                                                    />
                                                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                                                        {inst.notes ||
                                                            'Strict adherence to prescribed timing recommended.'}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xs font-black text-text-muted-light dark:text-text-muted-dark uppercase tracking-[0.2em] flex items-center gap-2">
                                        <div className="w-6 h-px bg-indigo-500/30" />
                                        Clinical Context & Safety
                                    </h3>

                                    <div className="p-8 rounded-2xl bg-linear-to-br from-indigo-500/5 to-primary/5 border border-primary/10 shadow-sm relative overflow-hidden group">
                                        <FaShieldAlt
                                            className="absolute right-[-20px] bottom-[-20px] text-primary/10 group-hover:rotate-12 transition-transform duration-700"
                                            size={150}
                                        />
                                        <div className="relative z-1 grid grid-cols-1 sm:grid-cols-3 gap-8">
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                                                    Storage Protocol
                                                </p>
                                                <div className="flex flex-wrap gap-2 pt-1">
                                                    {medicine.storageConditions.map((cond, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-3 py-1 bg-white dark:bg-slate-900 rounded-lg text-[10px] font-bold text-text-light dark:text-text-dark shadow-xs capitalize">
                                                            {cond.replace('_', ' ')}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                                                    Dispensed At
                                                </p>
                                                <div className="flex items-center gap-2 pt-1">
                                                    <FaHospital
                                                        size={14}
                                                        className="text-text-muted-light"
                                                    />
                                                    <p className="text-sm font-bold text-text-light dark:text-text-dark capitalize">
                                                        {medicine.hospital?.department ||
                                                            'Main Pharmacy'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                                                    Medicine Class
                                                </p>
                                                <div className="flex items-center gap-2 pt-1">
                                                    <FaVial
                                                        size={14}
                                                        className="text-text-muted-light"
                                                    />
                                                    <p className="text-sm font-bold text-text-light dark:text-text-dark capitalize">
                                                        {medicine.category || 'Standard Care'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Critical Warnings Section */}
                        {medicine.warnings && medicine.warnings.length > 0 && (
                            <div className="pt-10 border-t border-border-light dark:border-border-dark space-y-6">
                                <h3 className="text-xs font-black text-text-muted-light dark:text-text-muted-dark uppercase tracking-[0.2em] flex items-center gap-2">
                                    <div className="w-6 h-px bg-red-500/30" />
                                    Security & Safety Manifest
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {medicine.warnings.map((warning, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-5 p-6 rounded-2xl bg-red-50/50 dark:bg-red-900/10 border border-red-200/50 dark:border-red-800/30 group">
                                            <div className="p-3 bg-red-100 dark:bg-red-800 rounded-xl text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                                                <FaExclamationTriangle size={20} />
                                            </div>
                                            <p className="text-sm font-black text-red-700 dark:text-red-400 uppercase tracking-tight">
                                                {warning.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Metadata Footer */}
                    <div className="p-6 md:px-10 py-5 flex flex-col md:flex-row gap-6 border-t border-border-light dark:border-border-dark bg-slate-50/50 dark:bg-transparent">
                        <div className="flex items-center gap-3 text-text-muted-light dark:text-text-muted-dark">
                            <FaClock className="shrink-0 opacity-40" size={14} />
                            <p className="text-[10px] font-bold uppercase tracking-widest">
                                Registered:{' '}
                                <span className="text-text-light dark:text-text-dark ml-1 italic">
                                    {moment(medicine.createdAt).format('DD MMM YYYY, HH:mm')}
                                </span>
                            </p>
                        </div>
                        <div className="flex items-center gap-3 text-text-muted-light dark:text-text-muted-dark">
                            <FaHistory className="shrink-0 opacity-40" size={14} />
                            <p className="text-[10px] font-bold uppercase tracking-widest">
                                Modified:{' '}
                                <span className="text-text-light dark:text-text-dark ml-1 italic">
                                    {moment(medicine.updatedAt).format('DD MMM YYYY, HH:mm')}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </DetailLayout>
    );
}
