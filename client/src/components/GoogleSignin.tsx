//-Path: "TeaChoco-Hospital/client/src/components/GoogleSignin.tsx"
import { useAuth } from '../hooks/useAuth';
import { GoogleLogin } from '@react-oauth/google';

interface GoogleSigninProps {
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

const GoogleSignin: React.FC<GoogleSigninProps> = ({ onSuccess, onError }) => {
    const { setLoading, login, setError } = useAuth();

    const handleLoginSuccess = async (credentialResponse: any) => {
        setLoading(true);

        try {
            // จำลองการส่ง credential ไปยัง backend
            // ใน production ให้เรียก API เพื่อ verify credential
            const response = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    credential: credentialResponse.credential,
                }),
            });

            if (response.ok) {
                const data = await response.json();

                // จำลอง user data จาก Google (ใน production ควรมาจาก backend)
                const mockUser = {
                    id: 'google-user-id',
                    email: 'user@example.com',
                    name: 'Google User',
                    avatar: 'https://via.placeholder.com/150',
                };

                const mockToken = 'mock-jwt-token-from-backend';

                login(mockUser, mockToken);
                onSuccess?.();
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Login failed';
            setError(errorMessage);
            onError?.(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginError = () => {
        setError('Google login failed');
        onError?.('Google login failed');
    };

    return (
        <div className="w-full max-w-sm">
            <GoogleLogin
                useOneTap
                width="100%"
                size="large"
                text="signin_with"
                theme="filled_blue"
                shape="rectangular"
                onError={handleLoginError}
                onSuccess={handleLoginSuccess}
            />
        </div>
    );
};

export default GoogleSignin;
