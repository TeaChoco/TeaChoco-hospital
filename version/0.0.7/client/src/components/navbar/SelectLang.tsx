//-Path: "TeaChoco-Hospital/client/src/components/layout/SelectLang.tsx"
import { useState } from 'react';
import { CiGlobe } from 'react-icons/ci';
import { useTranslation } from 'react-i18next';

export default function SelectLang() {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        setOpen(false);
    };

    return (
        <div className="relative group">
            <button className="btn-icon-dark" onClick={() => setOpen((prev) => !prev)}>
                <CiGlobe />
            </button>
            <div
                className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
                    open ? 'visible opacity-100' : 'invisible opacity-0'
                }`}>
                <button
                    onClick={() => changeLanguage('en')}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        i18n.language === 'en'
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-600 dark:text-gray-300'
                    }`}>
                    🇺🇸 English
                </button>
                <button
                    onClick={() => changeLanguage('th')}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        i18n.language === 'th'
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-gray-600 dark:text-gray-300'
                    }`}>
                    🇹🇭 ไทย
                </button>
            </div>
        </div>
    );
}
