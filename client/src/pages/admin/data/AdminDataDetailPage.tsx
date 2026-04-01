//-Path: "TeaChoco-Hospital/client/src/pages/admin/AdminDataDetailPage.tsx"
import { useParams } from 'react-router-dom';
import { TabKey } from '../../../types/admin';
import DoctorDetailPage from '../../doctor/DoctorDetailPage';
import HospitalDetailPage from '../../hospital/HospitalDetailPage';
import MedicineDetailPage from '../../medicine/MedicineDetailPage';
import AppointmentDetailPage from '../../appointment/AppointmentDetailPage';

export default function AdminDataDetailPage() {
    const { tab } = useParams<{ tab: TabKey }>();

    switch (tab) {
        case TabKey.DOCTORS:
            return <DoctorDetailPage />;
        case TabKey.HOSPITALS:
            return <HospitalDetailPage />;
        case TabKey.MEDICINES:
            return <MedicineDetailPage />;
        case TabKey.APPOINTMENTS:
            return <AppointmentDetailPage />;
        default:
            return <div className="p-10 text-center">Data Type Not Found: {tab}</div>;
    }
}
