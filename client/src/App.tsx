//-Path: "TeaChoco-Hospital/client/src/App.tsx"
import Setup from './layout/Setup';
import Home from './pages/home/Home';
import Layout from './layout/Layout';
import Signin from './pages/auth/Signin';
import NotFoundPage from './pages/NotFoundPage';
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
import AdminLayout from './components/admin/layout/Layout';
import AdminDataPage from './pages/admin/data/AdminDataPage';
import AdminUsersPage from './pages/admin/user/AdminUsersPage';
import DoctorDetailPage from './pages/doctor/DoctorDetailPage';
import HospitalEditPage from './pages/hospital/HospitalEditPage';
import MedicineEditPage from './pages/medicine/MedicineEditPage';
import AppointmentPage from './pages/appointment/AppointmentPage';
import AdminUserEditPage from './pages/admin/user/AdminUserEditPage';
import AdminDataEditPage from './pages/admin/data/AdminDataEditPage';
import HospitalDetailPage from './pages/hospital/HospitalDetailPage';
import MedicineDetailPage from './pages/medicine/MedicineDetailPage';
import AdminDataDetailPage from './pages/admin/data/AdminDataDetailPage';
import AppointmentEditPage from './pages/appointment/AppointmentEditPage';
import AppointmentDetailPage from './pages/appointment/AppointmentDetailPage';
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

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
                    { path: '*', element: <NotFoundPage /> },
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
            {
                path: 'admin',
                element: <AdminLayout />,
                children: [
                    { path: '*', element: <NotFoundPage /> },
                    { index: true, element: <Navigate to="users" replace /> },
                    { path: 'users', element: <AdminUsersPage /> },
                    { path: 'users/:id', element: <AdminUserEditPage /> },
                    { path: 'data/:uid?/:tab?', element: <AdminDataPage /> },
                    { path: 'data/:uid/:tab/:id', element: <AdminDataDetailPage /> },
                    { path: 'data/:uid/:tab/edit/:id', element: <AdminDataEditPage /> },
                ],
            },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
