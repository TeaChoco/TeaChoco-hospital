// -Path: "TeaChoco-Hospital/client/src/pages/home/Home.tsx"
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-4xl w-full space-y-8 animate-fade-in-up">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
                    {t('home.welcome')} <span className="linear-text">{t('navbar.appName')}</span>
                </h1>

                <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto leading-relaxed">
                    {t('home.description')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <button
                        onClick={() => navigate('/signin')}
                        className="btn btn-secondary text-lg">
                        {t('home.getStarted')}
                    </button>
                    <button className="btn btn-primary text-lg">{t('home.learnMore')}</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
                    <div className="card">
                        <h3 className="text-xl font-semibold mb-2 text-primary">
                            {t('home.smartManagement')}
                        </h3>
                        <p className="text-text-muted-light dark:text-text-muted-dark">
                            {t('home.smartManagementDesc')}
                        </p>
                    </div>
                    <div className="card">
                        <h3 className="text-xl font-semibold mb-2 text-accent">
                            {t('home.secureAccess')}
                        </h3>
                        <p className="text-text-muted-light dark:text-text-muted-dark">
                            {t('home.secureAccessDesc')}
                        </p>
                    </div>
                    <div className="card">
                        <h3 className="text-xl font-semibold mb-2 text-primary-dark">
                            {t('home.support')}
                        </h3>
                        <p className="text-text-muted-light dark:text-text-muted-dark">
                            {t('home.supportDesc')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
