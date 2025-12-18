//-Path: "TeaChoco-Hospital/client/src/components/layout/DetailLayout.tsx"
import { useMemo } from 'react';
import type { Allow } from '../../types/auth';
import { FaArrowLeft, FaPen } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function DetailLayout<Data>({
    find,
    allow,
    children,
}: {
    allow: Allow;
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
                <button onClick={() => navigate(-1)} className="btn btn-secondary">
                    Go Back
                </button>
            </div>
        );

    return (
        <div className="relative">
            <Link to={`/${allow}`} className="btn-icon-dark absolute top-2 left-2 z-1">
                <FaArrowLeft />
            </Link>
            <Link to={`/${allow}/edit/${id}`} className="btn-icon-dark absolute top-2 right-2 z-1">
                <FaPen />
            </Link>
            {children?.(data)}
        </div>
    );
}
