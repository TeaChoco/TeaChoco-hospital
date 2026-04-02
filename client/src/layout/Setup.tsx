//-Path: "TeaChoco-Hospital/client/src/layout/Setup.tsx"
import i18n from '../i18n/i18n';
import { useAuth } from '../hooks/useAuth';
import { useSocket } from '../hooks/useSocket';
import ThemeModeProvider from './ThemeProvider';
import { I18nextProvider } from 'react-i18next';

export default function Setup({ children }: { children: React.ReactNode }) {
    useAuth();
    const { id } = useSocket();

    return (
        <I18nextProvider i18n={i18n}>
            <ThemeModeProvider>
                <div className="fixed bottom-1 right-1 z-100">Socket ID: {id}</div>
                {children}
            </ThemeModeProvider>
        </I18nextProvider>
    );
}
