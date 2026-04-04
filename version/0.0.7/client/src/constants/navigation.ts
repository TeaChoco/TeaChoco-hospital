//-Path: "TeaChoco-Hospital/client/src/constants/navigation.ts"
import { type TFunction } from 'i18next';
import { FaHospital, FaCalendarAlt, FaUserMd, FaPills, FaCalendar } from 'react-icons/fa';

export const getNavItems = (t: TFunction<'translation', undefined>) => [
    { path: '/hospitals', icon: FaHospital, label: t('navbar.hospitals') },
    { path: '/appointments', icon: FaCalendarAlt, label: t('navbar.appointments') },
    { path: '/doctors', icon: FaUserMd, label: t('navbar.doctors') },
    { path: '/medicines', icon: FaPills, label: t('navbar.medicines') },
    { path: '/calendar', icon: FaCalendar, label: t('navbar.calendar') },
];
