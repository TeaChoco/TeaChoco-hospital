//-Path: "TeaChoco-Hospital/client/src/services/api.ts"
import serverRest from './axios';
import type { Doctor } from '../types/doctor';
import type { Medicine } from '../types/medicine';
import type { Hospital } from '../types/hospital';
import type { Appointment } from '../types/appointment';

export const medicineAPI = {
    findAll: () => serverRest.get(`/api/medicines`),
    findOne: (id: string) => serverRest.get(`/api/medicines/${id}`),
    create: (medicine: Medicine) => serverRest.post(`/api/medicines`, medicine),
    update: (id: string, medicine: Medicine) => serverRest.put(`/api/medicines/${id}`, medicine),
    remove: (id: string) => serverRest.delete(`/api/medicines/${id}`),
};

export const hospitalAPI = {
    findOne: (id: string) => serverRest.get(`/api/hospitals/${id}`),
    findAll: () => serverRest.get(`/api/hospitals`),
    create: (hospital: Hospital) => serverRest.post(`/api/hospitals`, hospital),
    update: (id: string, hospital: Hospital) => serverRest.put(`/api/hospitals/${id}`, hospital),
    remove: (id: string) => serverRest.delete(`/api/hospitals/${id}`),
};

export const appointmentAPI = {
    findAll: () => serverRest.get(`/api/appointments`),
    findOne: (id: string) => serverRest.get(`/api/appointments/${id}`),
    create: (appointment: Appointment) => serverRest.post(`/api/appointments`, appointment),
    update: (id: string, appointment: Appointment) =>
        serverRest.put(`/api/appointments/${id}`, appointment),
    remove: (id: string) => serverRest.delete(`/api/appointments/${id}`),
};

export const doctorAPI = {
    findAll: () => serverRest.get(`/api/doctors`),
    findOne: (id: string) => serverRest.get(`/api/doctors/${id}`),
    create: (doctor: Doctor) => serverRest.post(`/api/doctors`, doctor),
    update: (id: string, doctor: Doctor) => serverRest.put(`/api/doctors/${id}`, doctor),
    remove: (id: string) => serverRest.delete(`/api/doctors/${id}`),
};
