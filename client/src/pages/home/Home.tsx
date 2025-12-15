//-Path: "TeaChoco-Hospital/client/src/pages/Home.tsx"
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-4xl w-full space-y-8 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
                    Welcome to <span className="linear-text">TeaChoco Hospital</span>
                </h1>

                <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto leading-relaxed">
                    Experience modern healthcare management with a touch of elegance. Secure, fast,
                    and user-friendly.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <button onClick={() => navigate('/signin')} className="btn btn-primary text-lg">
                        Get Started
                    </button>
                    <button className="btn btn-secondary text-lg">Learn More</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
                    <div className="card">
                        <h3 className="text-xl font-semibold mb-2 text-primary">
                            Smart Management
                        </h3>
                        <p className="text-text-muted-light dark:text-text-muted-dark">
                            Efficient patient tracking and hospital resource optimization using
                            AI-driven insights.
                        </p>
                    </div>
                    <div className="card">
                        <h3 className="text-xl font-semibold mb-2 text-accent">Secure Access</h3>
                        <p className="text-text-muted-light dark:text-text-muted-dark">
                            Enterprise-grade security with multi-factor authentication and
                            role-based access control.
                        </p>
                    </div>
                    <div className="card">
                        <h3 className="text-xl font-semibold mb-2 text-primary-dark">
                            24/7 Support
                        </h3>
                        <p className="text-text-muted-light dark:text-text-muted-dark">
                            Round-the-clock technical support to ensure your hospital operations
                            never stop.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
