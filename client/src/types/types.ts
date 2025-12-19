//-Path: "motiva/client/src/types/types.ts"
import type { Allow } from './auth';

export enum Title {
    MEDICINES = 'Medicines',
    HOSPITALS = 'Hospitals',
    DOCTORS = 'Doctors',
    APPOINTMENTS = 'Appointments',
}

export type QueryOptions = Partial<Record<string, string | boolean | number | undefined | null>>;

export interface RequestSocketData {
    request: { socketId: string };
}

export interface ResponseSocketData {
    token: string;
    response: { socketId: string; reads: Allow[]; edits: Allow[] };
}
