import { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <header className="flex items-center justify-between px-4 md:px-8 py-4 sticky top-0 z-50 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-xl border-b border-border-light dark:border-border-dark transition-all duration-200">
            <Link to="/" className="text-2xl font-bold no-underline">
                <span className="linear-text">TeaChoco Hospital</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
                <Link
                    to="/medicines"
                    className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">
                    Medicines
                </Link>
                <Link
                    to="/doctors"
                    className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">
                    Doctors
                </Link>
                <Link
                    to="/hospitals"
                    className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">
                    Hospitals
                </Link>
                <Link
                    to="/calendar"
                    className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">
                    Calendar
                </Link>
            </div>
            <div className="flex items-center gap-2">
                <div className="hidden md:block">
                    <Link to="/signin" className="btn btn-primary">
                        Login
                    </Link>
                </div>
                <ThemeToggle />
                <button
                    className="md:hidden p-2 text-slate-600 dark:text-slate-200"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-bg-light dark:bg-bg-dark border-b border-border-light dark:border-border-dark p-4 flex flex-col gap-4 md:hidden shadow-lg animate-in slide-in-from-top-2">
                    <Link
                        to="/medicines"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-base font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 py-2">
                        Medicines
                    </Link>
                    <Link
                        to="/doctors"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-base font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 py-2">
                        Doctors
                    </Link>
                    <Link
                        to="/hospitals"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-base font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 py-2">
                        Hospitals
                    </Link>
                    <Link
                        to="/calendar"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-base font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 py-2">
                        Calendar
                    </Link>
                    <div className="pt-2 border-t border-border-light dark:border-border-dark">
                        <Link
                            to="/signin"
                            onClick={() => setIsMenuOpen(false)}
                            className="btn btn-primary w-full mt-2">
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
