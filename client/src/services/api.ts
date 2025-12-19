//-Path: "TeaChoco-Hospital/client/src/services/user.ts"
import serverRest from './axios';

export const medicineAPI = {
    findAll: () => serverRest.get(`/api/medicines`),
    findOne: (id: string) => serverRest.get(`/api/medicines/${id}`),
    create: (medicine: any) => serverRest.post(`/api/medicines`, medicine),
    update: (id: string, medicine: any) => serverRest.put(`/api/medicines/${id}`, medicine),
    remove: (id: string) => serverRest.delete(`/api/medicines/${id}`),
};

export const hospitalAPI = {
    findAll: () => serverRest.get(`/api/hospitals`),
    findOne: (id: string) => serverRest.get(`/api/hospitals/${id}`),
    create: (hospital: any) => serverRest.post(`/api/hospitals`, hospital),
    update: (id: string, hospital: any) => serverRest.put(`/api/hospitals/${id}`, hospital),
    remove: (id: string) => serverRest.delete(`/api/hospitals/${id}`),
};

export const appointmentAPI = {
    findAll: () => serverRest.get(`/api/appointments`),
    findOne: (id: string) => serverRest.get(`/api/appointments/${id}`),
    create: (appointment: any) => serverRest.post(`/api/appointments`, appointment),
    update: (id: string, appointment: any) =>
        serverRest.put(`/api/appointments/${id}`, appointment),
    remove: (id: string) => serverRest.delete(`/api/appointments/${id}`),
};

export const doctorAPI = {
    findAll: () => serverRest.get(`/api/doctors`),
    findOne: (id: string) => serverRest.get(`/api/doctors/${id}`),
    create: (doctor: any) => serverRest.post(`/api/doctors`, doctor),
    update: (id: string, doctor: any) => serverRest.put(`/api/doctors/${id}`, doctor),
    remove: (id: string) => serverRest.delete(`/api/doctors/${id}`),
};
