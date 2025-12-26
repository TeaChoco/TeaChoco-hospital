//-Path: "motiva/client/src/types/types.ts"

export enum Title {
    MEDICINES = 'Medicines',
    HOSPITALS = 'Hospitals',
    DOCTORS = 'Doctors',
    APPOINTMENTS = 'Appointments',
}

export type QueryOptions = Partial<Record<string, string | boolean | number | undefined | null>>;
