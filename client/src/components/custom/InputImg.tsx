//-Path: "TeaChoco-Hospital/client/src/components/custom/InputImg.tsx"
import Modal from './Modal';
import Input from './Input';
import env from '../../configs/env';
import { imgAPI } from '../../services/img';
import { useState, useEffect, useId } from 'react';
import { useTranslation } from 'react-i18next';
import { FaImage, FaCloudUploadAlt, FaCheck, FaSpinner, FaTrash } from 'react-icons/fa';

export default function InputImg({
    id,
    icon,
    label,
    value,
    setValue,
    required,
    className,
    placeholder,
    labelClassName,
}: {
    id?: string;
    label: string;
    value: string;
    required?: boolean;
    className?: string;
    placeholder: string;
    icon?: React.ReactNode;
    labelClassName?: string;
    setValue: (value?: string) => void;
}) {
    const { t } = useTranslation();
    const generatedId = useId();
    const inputId = id || generatedId;
    const [isOpen, setIsOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [dbImages, setDbImages] = useState<string[]>([]);
    const [isLoadingGallery, setIsLoadingGallery] = useState(false);
    const [activeTab, setActiveTab] = useState<'upload' | 'gallery'>('gallery');

    useEffect(() => {
        if (isOpen) {
            const fetchImages = async () => {
                setIsLoadingGallery(true);
                try {
                    const res = await imgAPI.findAll();
                    const urls = res.data.map((img) => `${env.apiUrl}/api/img/${img._id}`);
                    setDbImages(urls);
                } catch (error) {
                    console.error('Failed to fetch images:', error);
                } finally {
                    setIsLoadingGallery(false);
                }
            };
            fetchImages();
        }
    }, [isOpen]);

    const handleSelectImage = (url: string) => {
        setValue(url);
        setIsOpen(false);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        try {
            const res = await imgAPI.create(file);
            const imageId = res.data?._id;

            if (imageId) {
                const imageUrl = `${env.apiUrl}/api/img/${imageId}`;
                setDbImages([imageUrl, ...dbImages]);
                handleSelectImage(imageUrl);
            }
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setIsUploading(false);
        }
    };

    // Styles matching Input.tsx for consistency
    const labelClass = `flex gap-2 text-sm font-bold tracking-tight text-text-light dark:text-text-dark mb-2 ml-1`;

    const hasValidValue = value && value !== 'undefined' && !value.endsWith('/undefined');

    return (
        <div className={`flex flex-col ${className}`}>
            {label && (
                <label htmlFor={inputId} className={`${labelClass} ${labelClassName || ''}`}>
                    {icon}
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="flex flex-col gap-3">
                {hasValidValue ? (
                    <div className="flex items-start gap-4 p-3 rounded-xl border border-border-light dark:border-border-dark bg-bg-card-light dark:bg-bg-card-dark">
                        <div
                            className="w-40 h-40 rounded-lg overflow-hidden shrink-0 border border-border-light/50 dark:border-border-dark/50 cursor-pointer bg-bg-light dark:bg-bg-dark"
                            onClick={() => setIsOpen(true)}>
                            <img
                                src={value}
                                alt="Selected"
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                            <div className="flex w-full flex-col justify-center h-40 gap-2">
                            <Input
                                value={value}
                                className="w-full"
                                placeholder={t('common.changeImage')}
                                onChange={(event) => setValue(event.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setIsOpen(true)}
                                className="px-4 py-2 w-full text-sm font-bold rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex items-center gap-2">
                                <FaImage />
                                {t('common.changeImage')}
                            </button>
                            <button
                                type="button"
                                onClick={() => setValue(undefined)}
                                className="px-4 py-1.5 w-full text-sm font-semibold rounded-lg text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-2">
                                <FaTrash />
                                {t('common.remove')}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        <Input
                            value={value}
                            className="w-full"
                            placeholder={t('common.changeImage')}
                            onChange={(event) => setValue(event.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setIsOpen(true)}
                            className="w-full h-24 rounded-xl border-2 border-dashed border-border-light/40 dark:border-border-dark/40 hover:border-primary/60 dark:hover:border-primary/60 hover:bg-primary/5 transition-all flex items-center justify-center gap-3 text-text-muted-light dark:text-text-muted-dark group">
                            <div className="w-10 h-10 rounded-full bg-bg-light dark:bg-bg-dark flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                <FaCloudUploadAlt className="text-xl text-primary" />
                            </div>
                            <span className="font-semibold text-sm">
                                {placeholder || t('common.uploadOrSelect')}
                            </span>
                        </button>
                    </div>
                )}
            </div>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={t('common.selectImage')}
                className="max-w-3xl">
                <div className="space-y-6">
                    {/* Tabs */}
                    <div className="flex border-b border-border-light/20 dark:border-border-dark/20">
                        <button
                            onClick={() => setActiveTab('gallery')}
                            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm transition-colors border-b-2 ${
                                activeTab === 'gallery'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'
                            }`}>
                            <FaImage className="text-lg" />
                            {t('common.gallery')}
                        </button>
                        <button
                            onClick={() => setActiveTab('upload')}
                            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm transition-colors border-b-2 ${
                                activeTab === 'upload'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'
                            }`}>
                            <FaCloudUploadAlt className="text-lg" />
                            {t('common.uploadNew')}
                        </button>
                    </div>

                    {/* Content */}
                    <div className="min-h-[300px] max-h-[500px] overflow-y-auto custom-scrollbar p-1">
                        {activeTab === 'upload' ? (
                            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border-light/30 dark:border-border-dark/30 rounded-2xl bg-bg-light/50 dark:bg-bg-dark/50 hover:bg-bg-light hover:dark:bg-bg-dark transition-colors gap-6 text-center group cursor-pointer relative h-full min-h-[300px]">
                                {isUploading ? (
                                    <div className="flex flex-col items-center gap-4 animate-pulse">
                                        <FaSpinner className="text-4xl text-primary animate-spin" />
                                        <p className="font-bold text-text-light dark:text-text-dark">
                                            {t('common.uploadingToDb')}
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            onChange={handleFileUpload}
                                        />
                                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/20">
                                            <FaCloudUploadAlt className="text-4xl" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="font-bold text-lg text-text-light dark:text-text-dark">
                                                {t('common.clickToUpload')}
                                            </p>
                                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark max-w-xs mx-auto">
                                                {t('common.uploadInfo')}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : isLoadingGallery ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <FaSpinner className="text-4xl text-primary animate-spin" />
                                <p className="font-bold text-text-muted-light dark:text-text-muted-dark">
                                    {t('common.loadingGallery')}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {dbImages.length > 0 ? (
                                    dbImages.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSelectImage(img)}
                                            className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                                                value === img
                                                    ? 'border-primary ring-2 ring-primary/30'
                                                    : 'border-border-light/10 dark:border-border-dark/10 hover:border-primary/50'
                                            }`}>
                                            <img
                                                src={img}
                                                alt={`Gallery ${index}`}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div
                                                className={`absolute inset-0 transition-colors flex items-center justify-center ${
                                                    value === img
                                                        ? 'bg-primary/20'
                                                        : 'bg-black/0 group-hover:bg-black/10'
                                                }`}>
                                                {value === img && (
                                                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transform scale-100 transition-transform">
                                                        <FaCheck />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    ))
                                ) : (
                                    <div className="col-span-full py-20 text-center">
                                        <p className="text-text-muted-light dark:text-text-muted-dark">
                                            {t('common.noImages')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
}
