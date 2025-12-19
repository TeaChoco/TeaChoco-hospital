//-Path: "TeaChoco-Hospital/client/src/components/layout/ContentLayout.tsx"
import { Outlet } from 'react-router-dom';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

export default function ContentLayout() {
    // const { isAuthenticated } = useAuth();

    // if (!isAuthenticated) return <Navigate to="/signin" />;

    return (
        <div className="flex flex-col gap-4">
            <Outlet />
        </div>
    );
}
