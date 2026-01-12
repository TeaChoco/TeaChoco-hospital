//-Path: "TeaChoco-Hospital/client/src/pages/profile/ProfileLayout.tsx"
import { useAuth } from '../../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProfileLayout() {
    const { loading, isAuthenticated } = useAuth();

    if (!isAuthenticated && !loading) return <Navigate to="/signin" />;
    return (
        <>
            <Outlet />
        </>
    );
}
