//-Path: "TeaChoco-Hospital/client/src/layout/Setup.tsx"
import i18n from '../i18n/i18n';
import { useAuth } from '../hooks/useAuth';
import { I18nextProvider } from 'react-i18next';

export default function Setup({ children }: { children: React.ReactNode }) {
    useAuth()
    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
