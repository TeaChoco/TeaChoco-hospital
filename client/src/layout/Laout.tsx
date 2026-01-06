//-Path: "TeaChoco-Hospital/client/src/layout/Laout.tsx"
import BottomNav from '../components/navbar/BottomNav';
import Background from './Background';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col pb-24 md:pb-0">
            <Background />
            <Navbar />
            <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full animate-fadeIn">
                <Outlet />
            </main>
            <footer className="text-center py-8 text-text-muted-light dark:text-text-muted-dark border-t border-border-light dark:border-border-dark hidden md:block">
                {/* Footer content if any */}
            </footer>

            {/* Mobile Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
