//-Path: "TeaChoco-Hospital/client/src/components/GoogleSignin.tsx"
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useTranslation } from 'react-i18next';
import { TbLoaderQuarter } from 'react-icons/tb';

export default function GoogleSignin() {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        if (isLoading) return;
        try {
            setIsLoading(true);
            const googleAuthUrl = import.meta.env.VITE_API_URL + '/user/auth/google';
            window.location.href = googleAuthUrl;
        } catch (error) {
            console.error('Sign in error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className={`w-full btn btn-primary relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]`}>
            <div className="absolute inset-0 bg-linear-to-r from-primary via-accent to-accent-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50">
                    <TbLoaderQuarter className="w-5 h-5 animate-spin text-primary" />
                </div>
            )}

            <div
                className={`flex items-center justify-center gap-3 ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                }`}>
                <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full p-0.5">
                    <FcGoogle className="w-4 h-4" />
                </div>
                <span className="font-semibold">
                    {isLoading ? t('auth.google.signingIn') : t('auth.google.signIn')}
                </span>
            </div>

            <span className="absolute inset-0 scale-0 rounded-full bg-white/30 group-active:scale-100 transition-transform duration-300" />
        </button>
    );
}
