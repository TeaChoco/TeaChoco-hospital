//-Path: "TeaChoco-Hospital/client/src/components/layout/ContentLayout.tsx"
import { Outlet } from 'react-router-dom';

export default function ContentLayout() {
    return (
        <div className="flex flex-col gap-4">
            <Outlet />
        </div>
    );
}
