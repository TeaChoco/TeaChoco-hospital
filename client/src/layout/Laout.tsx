//-Path: "TeaChoco-Hospital/client/src/layout/Laout.tsx"
import Background from './Background';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Background />
            <Navbar />
            <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
                <Outlet />
            </main>
            <footer className="text-center py-8 text-text-muted-light dark:text-text-muted-dark border-t border-border-light dark:border-border-dark"></footer>
        </div>
    );
}
