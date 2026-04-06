// -Path: "TeaChoco-Hospital/client/src/components/custom/InputMultiImg.tsx"
import {
    FaSync,
    FaLink,
    FaPlus,
    FaCheck,
    FaImage,
    FaTrash,
    FaCamera,
    FaSpinner,
    FaCloudUploadAlt,
} from 'react-icons/fa';
import Modal from './Modal';
import Input from './Input';
import Select from './Select';
import { useTranslation } from 'react-i18next';
import { useImgStore } from '../../store/useImgStore';
import { useState, useEffect, useId, useRef } from 'react';

export default function InputMultiImg({
    id,
    icon,
    label,
    value = [],
    setValue,
    required,
    className,
    placeholder,
    labelClassName,
}: {
    id?: string;
    label: string;
    value: string[];
    required?: boolean;
    className?: string;
    placeholder: string;
    icon?: React.ReactNode;
    labelClassName?: string;
    setValue: (value: string[]) => void;
}) {
    const generatedId = useId();
    const { t } = useTranslation();
    const inputId = id || generatedId;
    const [isOpen, setIsOpen] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');
    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const { images, isLoading, deleteImage, fetchImages, uploadImage } = useImgStore();
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
    const [activeTab, setActiveTab] = useState<'upload' | 'gallery' | 'camera'>('gallery');

    const getDevices = async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter((device) => device.kind === 'videoinput');
            setDevices(videoDevices);
            if (videoDevices.length > 0 && !selectedDeviceId) {
                const backCamera = videoDevices.find(
                    (device) =>
                        device.label.toLowerCase().includes('back') ||
                        device.label.toLowerCase().includes('environment') ||
                        device.label.toLowerCase().includes('rear'),
                );
                setSelectedDeviceId(backCamera?.deviceId || videoDevices[0].deviceId);
            }
        } catch (err) {
            console.error('Error getting devices:', err);
        }
    };

    useEffect(() => {
        if (isOpen && activeTab === 'camera') getDevices();
    }, [isOpen, activeTab]);

    useEffect(() => {
        if (isOpen) fetchImages();
    }, [isOpen]);

    useEffect(() => {
        const stopCamera = () => {
            if (cameraStream) {
                cameraStream.getTracks().forEach((track) => track.stop());
                setCameraStream(null);
            }
        };

        const startCamera = async () => {
            try {
                const constraints: MediaStreamConstraints = {
                    video: selectedDeviceId
                        ? { deviceId: { exact: selectedDeviceId } }
                        : { facingMode },
                    audio: false,
                };
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                setCameraStream(stream);
                if (videoRef.current) videoRef.current.srcObject = stream;
            } catch (err) {
                console.error('Error accessing camera:', err);
            }
        };

        if (isOpen && activeTab === 'camera') startCamera();
        else stopCamera();

        return () => stopCamera();
    }, [activeTab, isOpen, facingMode, selectedDeviceId]);

    const handleCameraCapture = async () => {
        if (!videoRef.current) return;
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0);
            canvas.toBlob(async (blob) => {
                if (blob) {
                    const file = new File([blob], `capture-${Date.now()}.jpg`, {
                        type: 'image/jpeg',
                    });
                    const imageUrl = await uploadImage(file);
                    if (imageUrl) handleSelectImage(imageUrl);
                }
            }, 'image/jpeg');
        }
    };

    const handleDeleteGalleryImage = async (event: React.MouseEvent, url: string) => {
        event.stopPropagation();
        if (confirm(t('common.confirmDelete'))) {
            try {
                await deleteImage(url);
                setValue(value.filter((img) => img !== url));
            } catch (error) {
                console.error('Delete flow failed:', error);
            }
        }
    };

    const uploadAndAdd = async (file: File) => {
        setIsUploading(true);
        try {
            const imageUrl = await uploadImage(file);
            if (imageUrl) handleSelectImage(imageUrl);
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSelectImage = (url: string) => {
        if (!value.includes(url)) {
            setValue([...value, url]);
        }
        setIsOpen(false);
    };

    const handleRemoveImage = (index: number) => {
        setValue(value.filter((_, idx) => idx !== index));
    };

    const handleEditUrl = (index: number, newUrl: string) => {
        setValue(value.map((url, idx) => (idx === index ? newUrl : url)));
    };

    const labelClass = `flex gap-2 text-sm font-bold tracking-tight text-text-light dark:text-text-dark mb-2 ml-1`;

    return (
        <div className={`flex flex-col ${className}`}>
            {label && (
                <label htmlFor={inputId} className={`${labelClass} ${labelClassName || ''}`}>
                    {icon}
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="space-y-4">
                {/* List of Image Cards */}
                <div className="grid grid-cols-1 gap-4">
                    {value.map((img, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 p-3 rounded-xl border border-border-light dark:border-border-dark bg-bg-card-light dark:bg-bg-card-dark group animate-in fade-in slide-in-from-left-4">
                            <div className="w-40 h-40 rounded-lg overflow-hidden shrink-0 border border-border-light/50 dark:border-border-dark/50 cursor-pointer bg-bg-light dark:bg-bg-dark relative">
                                <img
                                    src={img}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            'https://placehold.co/400x400?text=Invalid+URL';
                                    }}
                                />
                                <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[8px] text-white font-black uppercase tracking-widest">
                                    #{index + 1}
                                </div>
                            </div>
                            <div className="flex w-full flex-col justify-center h-40 gap-3">
                                <div className="space-y-1.5">
                                    <p className="text-[10px] font-black text-text-muted-light dark:text-text-muted-dark uppercase tracking-widest ml-1">
                                        <FaLink className="inline mr-2" size={10} />
                                        {t('common.imageUrl')}
                                    </p>
                                    <Input
                                        value={img}
                                        className="w-full"
                                        placeholder={t('common.enterUrl', 'Enter URL...')}
                                        onChange={(event) =>
                                            handleEditUrl(index, event.target.value)
                                        }
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="px-4 py-2 flex-1 text-xs font-black uppercase tracking-widest rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2">
                                        <FaTrash />
                                        {t('common.remove')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add More Area */}
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="w-full h-32 rounded-xl border-2 border-dashed border-border-light/40 dark:border-border-dark/40 hover:border-primary/60 dark:hover:border-primary/60 hover:bg-primary/5 transition-all flex items-center justify-center gap-4 text-text-muted-light dark:text-text-muted-dark group">
                    <div className="w-12 h-12 rounded-2xl bg-bg-light dark:bg-bg-dark flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform text-primary border border-border-light dark:border-border-dark">
                        <FaPlus className="text-xl" />
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="font-black text-xs uppercase tracking-[0.2em] text-text-light dark:text-text-dark">
                            {t('common.addMoreImages', 'Add More Images')}
                        </span>
                        <span className="text-[10px] opacity-60">
                            {placeholder || t('common.uploadOrSelectOrPaste')}
                        </span>
                    </div>
                </button>
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
                        <button
                            onClick={() => setActiveTab('camera')}
                            className={`flex items-center gap-2 px-6 py-3 font-bold text-sm transition-colors border-b-2 ${
                                activeTab === 'camera'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'
                            }`}>
                            <FaCamera className="text-lg" />
                            {t('common.camera', 'Camera')}
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
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) uploadAndAdd(file);
                                            }}
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
                        ) : activeTab === 'camera' ? (
                            <div className="flex flex-col gap-4 relative h-[500px] -m-1">
                                <div className="relative w-full h-full bg-black overflow-hidden rounded-xl shadow-2xl group/camera border border-white/5">
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        className="w-full h-full object-cover mirror"
                                    />

                                    <div className="absolute top-4 left-4 right-4 z-30 opacity-40 hover:opacity-100 transition-opacity">
                                        <div className="bg-black/60 backdrop-blur-md rounded-xl p-1 border border-white/10">
                                            <Select
                                                className="bg-transparent! border-none text-white py-2!"
                                                value={selectedDeviceId}
                                                onChange={(e) =>
                                                    setSelectedDeviceId(e.target.value)
                                                }
                                                options={devices.map((device) => ({
                                                    label:
                                                        device.label ||
                                                        `Camera ${device.deviceId.slice(0, 5)}`,
                                                    value: device.deviceId,
                                                }))}>
                                                {(Option, options) =>
                                                    options?.map((option) => (
                                                        <Option
                                                            key={option.value}
                                                            {...option}
                                                            className="text-black"
                                                        />
                                                    ))
                                                }
                                            </Select>
                                        </div>
                                    </div>

                                    {(isUploading || isLoading) && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-40">
                                            <div className="flex flex-col items-center gap-4">
                                                <FaSpinner className="text-4xl text-primary animate-spin" />
                                                <p className="font-bold text-white uppercase tracking-widest text-xs">
                                                    {t('common.processing', 'Processing...')}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-8 z-30 opacity-100 group-focus-within:opacity-100 transition-opacity">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFacingMode((prev) =>
                                                    prev === 'user' ? 'environment' : 'user',
                                                )
                                            }
                                            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl text-white hover:bg-white/30 transition-all flex items-center justify-center shadow-lg border border-white/20">
                                            <FaSync className="text-xl" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleCameraCapture}
                                            disabled={isUploading || isLoading}
                                            className="w-20 h-20 rounded-full bg-white p-1.5 shadow-2xl hover:scale-110 active:scale-95 transition-all disabled:opacity-50">
                                            <div className="w-full h-full rounded-full border-4 border-black/10 flex items-center justify-center">
                                                <div className="w-12 h-12 rounded-full bg-primary shadow-inner" />
                                            </div>
                                        </button>
                                        <div className="w-14 h-14" />
                                    </div>
                                    <div className="absolute inset-0 pointer-events-none border border-white/10" />
                                    <div className="absolute inset-x-0 top-1/3 border-t border-white/5 pointer-events-none" />
                                    <div className="absolute inset-x-0 top-2/3 border-t border-white/5 pointer-events-none" />
                                    <div className="absolute inset-y-0 left-1/3 border-l border-white/5 pointer-events-none" />
                                    <div className="absolute inset-y-0 left-2/3 border-l border-white/5 pointer-events-none" />
                                </div>
                            </div>
                        ) : isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <FaSpinner className="text-4xl text-primary animate-spin" />
                                <p className="font-bold text-text-muted-light dark:text-text-muted-dark">
                                    {t('common.loadingGallery')}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                {images.length > 0 ? (
                                    images.map((img, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => handleSelectImage(img)}
                                            className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                                                value.includes(img)
                                                    ? 'border-primary ring-2 ring-primary/30 shadow-lg'
                                                    : 'border-border-light/10 dark:border-border-dark/10 hover:border-primary/50'
                                            }`}>
                                            <img
                                                src={img}
                                                alt={`Gallery ${index}`}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div
                                                className={`absolute inset-0 transition-colors flex items-center justify-center ${
                                                    value.includes(img)
                                                        ? 'bg-primary/20'
                                                        : 'bg-black/0 group-hover:bg-black/10'
                                                }`}>
                                                {value.includes(img) && (
                                                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg transform scale-100 transition-transform">
                                                        <FaCheck />
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={(e) => handleDeleteGalleryImage(e, img)}
                                                className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-all duration-200 hover:scale-110 z-30">
                                                <FaTrash className="text-xs" />
                                            </button>
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
