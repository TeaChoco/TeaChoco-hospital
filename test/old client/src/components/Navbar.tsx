//-Path: "TeaChoco-Hospital/client/src/components/Nav.tsx"
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    return (
        <header className="flex items-center justify-between px-4 md:px-8 py-4 sticky top-0 z-50 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-xl border-b border-border-light dark:border-border-dark transition-all duration-200">
            <Link to="/" className="text-2xl font-bold no-underline">
                <span className="linear-text">TeaChoco Hospital</span>
            </Link>
            <div className="flex items-center gap-2">
                <Link to="/signin" className="btn btn-primary">
                    Login
                </Link>
                <ThemeToggle />
            </div>
        </header>
    );
}
