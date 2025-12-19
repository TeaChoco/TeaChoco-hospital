//-Path: "TeaChoco-Hospital/client/src/layout/Setup.tsx"
import i18n from '../i18n/i18n';
import { useAuth } from '../hooks/useAuth';
import { useSocket } from '../hooks/useSocket';
import { I18nextProvider } from 'react-i18next';
import ThemeModeProvider from './ThemeProvider';

export default function Setup({ children }: { children: React.ReactNode }) {
    useAuth();
    useSocket();

    return (
        <I18nextProvider i18n={i18n}>
            <ThemeModeProvider>{children}</ThemeModeProvider>
        </I18nextProvider>
    );
}
