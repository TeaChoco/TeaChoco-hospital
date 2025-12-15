//-Path: "TeaChoco-Hospital/client/src/components/layout/DetailLayout.tsx"
import { useMemo } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

export default function DetailLayout<Data>({
    find,
    children,
}: {
    find: (id?: string) => Data | undefined;
    children?: (data: Data) => React.ReactNode;
}) {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const data = useMemo(() => find(id), [id]);

    if (!data)
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-text-muted-light dark:text-text-muted-dark">
                <h2 className="text-2xl font-bold mb-2">Not Found</h2>
                <button onClick={() => navigate(-1)} className="text-primary hover:underline">
                    Go Back
                </button>
            </div>
        );

    return (
        <>
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors duration-200">
                <FaArrowLeft />
            </button>
            {children?.(data)}
        </>
    );
}
