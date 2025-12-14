//-Path: "TeaChoco-Hospital/client/src/components/GoogleSignin.tsx"
import { useState } from 'react';
import { CiMail } from 'react-icons/ci';
import { useTranslation } from 'react-i18next';
import { TbLoaderQuarter } from 'react-icons/tb';
import { FcGoogle, FcGlobe } from 'react-icons/fc';

export default function GoogleSignin({
    onSignIn,
    variant = 'default',
    className = '',
    showDivider = true,
    showEmailOption = false,
    languageSelector = false,
}: {
    onSignIn?: () => Promise<void> | void;
    variant?: 'default' | 'compact' | 'full';
    className?: string;
    showDivider?: boolean;
    showEmailOption?: boolean;
    languageSelector?: boolean;
}) {
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    const handleGoogleSignIn = async () => {
        if (isLoading) return;

        try {
            setIsLoading(true);
            const googleAuthUrl = import.meta.env.VITE_API_URL + '/user/auth/google';
            console.log(googleAuthUrl);

            window.location.href = googleAuthUrl;

            // หรือถ้ามี custom handler
            if (onSignIn) await onSignIn();
        } catch (error) {
            console.error('Sign in error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
        setCurrentLanguage(lang);
    };

    // Variant styles
    const variantStyles = {
        default: 'w-full max-w-sm',
        compact: 'w-full max-w-xs',
        full: 'w-full',
    };

    const buttonStyles = {
        default: 'px-6 py-3 text-base',
        compact: 'px-4 py-2.5 text-sm',
        full: 'px-8 py-4 text-lg',
    };

    return (
        <div className={`${variantStyles[variant]} ${className}`}>
            {/* Language Selector */}
            {languageSelector && (
                <div className="flex justify-end mb-4">
                    <div className="flex items-center gap-1 p-1 bg-bg-card-light dark:bg-bg-card-dark rounded-full border border-border-light dark:border-border-dark">
                        <button
                            onClick={() => handleLanguageChange('th')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                                currentLanguage === 'th'
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-primary'
                            }`}>
                            <FcGlobe className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">ไทย</span>
                        </button>
                        <button
                            onClick={() => handleLanguageChange('en')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                                currentLanguage === 'en'
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-primary'
                            }`}>
                            <FcGlobe className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">EN</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Main Google Sign-in Button */}
            <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className={`w-full btn btn-primary relative overflow-hidden group ${buttonStyles[variant]} disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]`}>
                {/* Animated Background */}
                <div className="absolute inset-0 bg-linear-to-r from-primary via-accent to-accent-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                {/* Loading State */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50">
                        <TbLoaderQuarter className="w-5 h-5 animate-spin text-primary" />
                    </div>
                )}

                <div
                    className={`flex items-center justify-center gap-3 ${
                        isLoading ? 'opacity-0' : 'opacity-100'
                    }`}>
                    {/* Google Icon */}
                    <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full p-0.5">
                        <FcGoogle className="w-4 h-4" />
                    </div>

                    {/* Text */}
                    <span className="font-semibold">
                        {isLoading ? t('login.google.signingIn') : t('login.google.signIn')}
                    </span>
                </div>

                {/* Ripple Effect */}
                <span className="absolute inset-0 scale-0 rounded-full bg-white/30 group-active:scale-100 transition-transform duration-300" />
            </button>

            {/* Divider */}
            {showDivider && (
                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-border-light dark:bg-border-dark" />
                    <span className="px-4 text-sm text-text-muted-light dark:text-text-muted-dark">
                        {t('login.or')}
                    </span>
                    <div className="flex-1 h-px bg-border-light dark:bg-border-dark" />
                </div>
            )}

            {/* Email Option */}
            {showEmailOption && (
                <button
                    className={`w-full mt-4 flex items-center justify-center gap-3 ${buttonStyles[variant]} btn btn-secondary hover:border-primary/50 transition-all duration-200`}>
                    <CiMail className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                    <span className="font-medium">{t('login.email')}</span>
                </button>
            )}

            {/* Info Text */}
            <div className="mt-6 text-center">
                <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
                    {currentLanguage === 'th'
                        ? 'การเข้าสู่ระบบจะเชื่อมต่อกับบัญชี Google ของคุณ'
                        : 'Sign in will connect with your Google account'}
                </p>
            </div>
        </div>
    );
}
