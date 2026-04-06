// -Path: "TeaChoco-Hospital/client/src/store/useImgStore.ts"
import env from '../configs/env';
import { create } from 'zustand';
import { imgAPI } from '../services/img';

interface ImgStore {
    images: string[];
    isLoading: boolean;
    fetchImages: (force?: boolean) => Promise<void>;
    deleteImage: (url: string) => Promise<void>;
    uploadImage: (file: File) => Promise<string | null>;
}

export const useImgStore = create<ImgStore>((set, get) => ({
    images: [],
    isLoading: false,
    fetchImages: async (force = false) => {
        if (!force && get().images.length > 0) return;
        set({ isLoading: true });
        try {
            const res = await imgAPI.findAll();
            const urls = res.data.map((img) => `${env.apiUrl}/api/img/${img._id}`);
            set({ images: urls });
        } catch (error) {
            console.error('Failed to fetch images:', error);
        } finally {
            set({ isLoading: false });
        }
    },
    deleteImage: async (url: string) => {
        const imageId = url.split('/').pop();
        if (!imageId || imageId === 'undefined') return;
        try {
            await imgAPI.remove(imageId);
            set((state) => ({
                images: state.images.filter((img) => img !== url),
            }));
        } catch (error) {
            console.error('Delete failed:', error);
            throw error;
        }
    },
    uploadImage: async (file: File) => {
        try {
            const res = await imgAPI.create(file);
            const imageId = res.data?._id;

            if (imageId) {
                const imageUrl = `${env.apiUrl}/api/img/${imageId}`;
                set((state) => ({ images: [imageUrl, ...state.images] }));
                return imageUrl;
            }
            return null;
        } catch (error) {
            console.error('Upload failed:', error);
            throw error;
        }
    },
}));
