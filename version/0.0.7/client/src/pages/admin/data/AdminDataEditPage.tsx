//-Path: "TeaChoco-Hospital/client/src/pages/admin/AdminDataEditPage.tsx"
import { useParams } from 'react-router-dom';
import { TabKey } from '../../../types/admin';
import DoctorEditPage from '../../doctor/DoctorEditPage';
import HospitalEditPage from '../../hospital/HospitalEditPage';
import MedicineEditPage from '../../medicine/MedicineEditPage';
import AppointmentEditPage from '../../appointment/AppointmentEditPage';
import { useMemo } from 'react';

export default function AdminDataEditPage() {
    const { tab } = useParams<{ tab: TabKey }>();

    const editPage = useMemo(() => {
        switch (tab) {
            case TabKey.DOCTORS:
                return <DoctorEditPage />;
            case TabKey.HOSPITALS:
                return <HospitalEditPage />;
            case TabKey.MEDICINES:
                return <MedicineEditPage />;
            case TabKey.APPOINTMENTS:
                return <AppointmentEditPage />;
            default:
                return <div className="p-10 text-center">Data Type Not Found: {tab}</div>;
        }
    }, [tab]);

    return <div className="flex flex-col gap-6 tems-center justify-center">{editPage}</div>;
}
