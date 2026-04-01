//-Path: "TeaChoco-Hospital/client/src/types/types.ts"

export enum Title {
    MEDICINES = 'Medicines',
    HOSPITALS = 'Hospitals',
    DOCTORS = 'Doctors',
    APPOINTMENTS = 'Appointments',
}

export type QueryOptions = Partial<Record<string, string | boolean | number | undefined | null>>;

export type ApiMeta = {
    _id: string;
    user_id: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    __v: number;
};

export type ApiData<Data extends object> = Data & ApiMeta;

export type OutApiData<DataApi extends ApiData<object>> = Omit<DataApi, keyof ApiMeta>;

export type ImgApi = ApiMeta & {
    name: string;
    mimetype: string;
    data: BufferSource;
};
