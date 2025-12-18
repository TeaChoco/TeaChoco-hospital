//-Path: "TeaChoco-Hospital/client/src/App.tsx"
import Setup from './layout/Setup';
import Layout from './layout/Laout';
import Home from './pages/home/Home';
import Signin from './pages/auth/Signin';
import { Routes, Route } from 'react-router-dom';
import ContentLayout from './layout/ContentLayout';
import DoctorsPage from './pages/doctor/DoctorsPage';
import CalendarFull from './pages/calendar/CalendarFull';
import CalendarPage from './pages/calendar/CalendarPage';
import MedicinesPage from './pages/medicine/MedicinesPage';
import HospitalsPage from './pages/hospital/HospitalsPage';
import DoctorDetailPage from './pages/doctor/DoctorDetailPage';
import AppointmentPage from './pages/appointment/AppointmentPage';
import MedicineDetailPage from './pages/medicine/MedicineDetailPage';
import HospitalDetailPage from './pages/hospital/HospitalDetailPage';
import AppointmentDetailPage from './pages/appointment/AppointmentDetailPage';
import HospitalEditPage from './pages/hospital/HospitalEditPage';
import AppointmentEditPage from './pages/appointment/AppointmentEditPage';
import DoctorEditPage from './pages/doctor/DoctorEditPage';
import MedicineEditPage from './pages/medicine/MedicineEditPage';

export default function App() {
    return (
        <Setup>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/" element={<ContentLayout />}>
                        <Route path="hospitals" element={<HospitalsPage />} />
                        <Route path="hospitals/:id" element={<HospitalDetailPage />} />
                        <Route path="hospitals/edit/:id" element={<HospitalEditPage />} />
                        <Route path="appointments" element={<AppointmentPage />} />
                        <Route path="appointments/:id" element={<AppointmentDetailPage />} />
                        <Route path="appointments/edit/:id" element={<AppointmentEditPage />} />
                        <Route path="doctors" element={<DoctorsPage />} />
                        <Route path="doctors/:id" element={<DoctorDetailPage />} />
                        <Route path="doctors/edit/:id" element={<DoctorEditPage />} />
                        <Route path="medicines" element={<MedicinesPage />} />
                        <Route path="medicines/:id" element={<MedicineDetailPage />} />
                        <Route path="medicines/edit/:id" element={<MedicineEditPage />} />
                        <Route path="calendar" element={<CalendarPage />} />
                    </Route>
                </Route>
                <Route path="calendar/full" element={<CalendarFull />} />
                <Route path="signin" element={<Signin />} />
            </Routes>
        </Setup>
    );
}
