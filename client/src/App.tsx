//-Path: "TeaChoco-Hospital/client/src/App.tsx"
import Home from './pages/Home';
import Setup from './layout/Setup';
import Signin from './pages/Signin';
import Layout from './layout/Laout';
import { Routes, Route } from 'react-router-dom';
import { MedicinesPage } from './pages/MedicinesPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { HospitalsPage } from './pages/HospitalsPage';
import { CalendarPage } from './pages/CalendarPage';
import { MedicineDetailPage } from './pages/MedicineDetailPage';
import { DoctorDetailPage } from './pages/DoctorDetailPage';
import { HospitalDetailPage } from './pages/HospitalDetailPage';
import { AppointmentDetailPage } from './pages/AppointmentDetailPage';

export default function App() {
    return (
        <Setup>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="medicines" element={<MedicinesPage />} />
                    <Route path="medicines/:id" element={<MedicineDetailPage />} />
                    <Route path="doctors" element={<DoctorsPage />} />
                    <Route path="doctors/:id" element={<DoctorDetailPage />} />
                    <Route path="hospitals" element={<HospitalsPage />} />
                    <Route path="hospitals/:id" element={<HospitalDetailPage />} />
                    <Route path="calendar" element={<CalendarPage />} />
                    <Route path="appointments/:id" element={<AppointmentDetailPage />} />
                </Route>
                <Route path="signin" element={<Signin />} />
            </Routes>
        </Setup>
    );
}
