// -Path: "TeaChoco-Hospital/client/src/services/img.ts"
import serverRest from './axios';
import type { ImgApi } from '../types/types';

export const imgAPI = {
    findOne: (id: string) => serverRest.get(`/api/img/${id}`),
    findAll: () => serverRest.get<ImgApi[]>('/api/img'),
    create: (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return serverRest.post('/api/img', formData, {
            headers: {
                'Content-Type': undefined,
            },
        });
    },
    update: (id: string, file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return serverRest.put(`/api/img/${id}`, formData, {
            headers: {
                'Content-Type': undefined,
            },
        });
    },
    remove: (id: string) => serverRest.delete(`/api/img/${id}`),
};
