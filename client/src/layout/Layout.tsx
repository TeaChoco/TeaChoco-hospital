//-Path: "TeaChoco-Hospital/client/src/layout/Layout.tsx"
import Footer from './Footer';
import Background from './Background';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import BottomNav from '../components/navbar/BottomNav';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col pb-24 md:pb-0">
            <Background />
            <Navbar />
            <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full animate-fadeIn">
                <Outlet />
            </main>
            <Footer />

            {/* Mobile Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
