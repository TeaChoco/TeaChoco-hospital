//-Path: "TeaChoco-Hospital/client/src/pages/auth/SigninGoogle.tsx"
import env from '../../configs/env';
import GoogleSignin from '../../components/auth/GoogleSignin';

export default function SigninGoogle({
    queryError,
    querySource,
}: {
    queryError: string | null;
    querySource: string | null;
}) {
    return (
        <div>
            <h3 className="text-lg font-semibold text-center mb-4 text-text-light dark:text-text-dark transition-colors duration-200">
                Sign in with Google
            </h3>
            <GoogleSignin />

            {/* Debug Information (สำหรับ development) */}
            {env.mode === 'development' && queryError && (
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                    <p className="font-mono text-gray-600 dark:text-gray-400">
                        Debug: {queryError}
                    </p>
                    <p className="font-mono text-gray-500 dark:text-gray-500 mt-1">
                        Source: {querySource}
                    </p>
                </div>
            )}
        </div>
    );
}
