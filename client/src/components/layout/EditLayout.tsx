//- Path: "TeaChoco-Hospital/client/src/layout/EditLayout.tsx"
import { Allow } from '../../types/auth';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import type { Title } from '../../types/types';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

export default function EditLayout<Data>({
    find,
    title,
    newData,
    children,
}: {
    title: Title;
    newData: Data;
    children: (
        data: Data,
        setData: React.Dispatch<React.SetStateAction<Data | undefined>>,
    ) => React.ReactNode;
    find: (id: string) => Promise<Data | undefined>;
}) {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { user, loading: authLoading } = useAuth();
    const [data, setData] = useState<Data | undefined>(undefined);

    const canEdit = user?.allows?.some((allow) =>
        allow.edit.find((edit) => location.pathname.includes(edit) || edit === Allow.AUTH),
    );

    if (!canEdit && !authLoading) return <Navigate to={`/${location.pathname.split('/')[1]}`} />;

    const getData = async () => {
        setLoading(true);
        if (id) {
            const found = await find(id);
            setData(found);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (id === 'new') {
            setData(newData);
            setLoading(false);
        } else getData();
    }, [id]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(-1);
    };

    if (loading) return <div>Loading...</div>;
    if (!data) return <div>not found</div>;

    return (
        <>
            <div className="flex items-center gap-2">
                <Link to={`/${title.toLowerCase()}/${id}`} className="btn-icon">
                    <FaArrowLeft />
                </Link>
                <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">{title}</h1>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
                {children(data, setData)}
                <div className="flex gap-4">
                    <button type="button" onClick={() => navigate(-1)} className="btn">
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Save Changes
                    </button>
                </div>
            </form>
        </>
    );
}
