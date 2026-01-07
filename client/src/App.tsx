//-Path: "TeaChoco-Hospital/client/src/App.tsx"
import Setup from './layout/Setup';
import Layout from './layout/Layout';
import Home from './pages/home/Home';
import Signin from './pages/auth/Signin';
import AllowPage from './pages/profile/AllowPage';
import ContentLayout from './layout/ContentLayout';
import DoctorsPage from './pages/doctor/DoctorsPage';
import ProfilePage from './pages/profile/ProfilePage';
import CalendarFull from './pages/calendar/CalendarFull';
import CalendarPage from './pages/calendar/CalendarPage';
import ProfileLayout from './pages/profile/ProfileLayout';
import MedicinesPage from './pages/medicine/MedicinesPage';
import HospitalsPage from './pages/hospital/HospitalsPage';
import DoctorEditPage from './pages/doctor/DoctorEditPage';
import DoctorDetailPage from './pages/doctor/DoctorDetailPage';
import HospitalEditPage from './pages/hospital/HospitalEditPage';
import MedicineEditPage from './pages/medicine/MedicineEditPage';
import AppointmentPage from './pages/appointment/AppointmentPage';
import HospitalDetailPage from './pages/hospital/HospitalDetailPage';
import MedicineDetailPage from './pages/medicine/MedicineDetailPage';
import AppointmentEditPage from './pages/appointment/AppointmentEditPage';
import AppointmentDetailPage from './pages/appointment/AppointmentDetailPage';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Setup>
                <Outlet />
            </Setup>
        ),
        children: [
            {
                path: '/',
                element: <Layout />,
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                    {
                        path: '/',
                        element: <ContentLayout />,
                        children: [
                            { path: 'hospitals', element: <HospitalsPage /> },
                            { path: 'hospitals/:id', element: <HospitalDetailPage /> },
                            { path: 'hospitals/edit/:id', element: <HospitalEditPage /> },
                            { path: 'appointments', element: <AppointmentPage /> },
                            { path: 'appointments/:id', element: <AppointmentDetailPage /> },
                            { path: 'appointments/edit/:id', element: <AppointmentEditPage /> },
                            { path: 'doctors', element: <DoctorsPage /> },
                            { path: 'doctors/:id', element: <DoctorDetailPage /> },
                            { path: 'doctors/edit/:id', element: <DoctorEditPage /> },
                            { path: 'medicines', element: <MedicinesPage /> },
                            { path: 'medicines/:id', element: <MedicineDetailPage /> },
                            { path: 'medicines/edit/:id', element: <MedicineEditPage /> },
                            { path: 'calendar', element: <CalendarPage /> },
                            {
                                path: 'profile',
                                element: <ProfileLayout />,
                                children: [
                                    { index: true, element: <ProfilePage /> },
                                    { path: 'allow', element: <AllowPage /> },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                path: 'calendar/full',
                element: <CalendarFull />,
            },
            {
                path: 'signin/:tab?',
                element: <Signin />,
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
