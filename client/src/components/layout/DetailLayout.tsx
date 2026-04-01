//-Path: "TeaChoco-Hospital/client/src/components/layout/DetailLayout.tsx"
import { useMemo } from 'react';
import Paper from '../custom/Paper';
import Editor from '../custom/Editor';
import Loading from '../custom/Loading';
import type { Title } from '../../types/types';
import { useTranslation } from 'react-i18next';
import { useLayoutStore } from '../../store/useLayoutStore';
import { FaArrowLeft, FaCode, FaPen } from 'react-icons/fa';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

export default function DetailLayout<Data extends { _id: string }>({
    title,
    datas,
    children,
}: {
    title: Title;
    datas?: Data[];
    children?: (data: Data) => React.ReactNode;
}) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { id, uid } = useParams();
    const { detailLayout, setDetailLayout } = useLayoutStore();

    const toBack = useMemo(() => {
        const base = title.toLowerCase();
        if (location.pathname.startsWith('/admin/data')) return `/admin/data/${uid}/${base}`;
        return `/${base}${id === 'new' ? '' : `/${id}`}`;
    }, [id, title, location.pathname]);

    const editTo = useMemo(() => {
        const base = title.toLowerCase();
        if (location.pathname.startsWith('/admin/data'))
            return `/admin/data/${uid}/${base}/edit/${id}`;
        return `/${base}/edit/${id}`;
    }, [id, title, location.pathname]);

    const data = useMemo(() => datas?.find((data) => data._id === id), [id, datas]);

    if (!datas) return <Loading />;

    if (!data)
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-text-muted-light dark:text-text-muted-dark">
                <h2 className="text-2xl font-bold mb-6">{t('common.notFound')}</h2>
                <button onClick={() => navigate(-1)} className="btn btn-secondary">
                    {t('common.goBack')}
                </button>
            </div>
        );

    return (
        <div className="relative">
            <Link to={toBack} className="btn-icon-dark absolute top-2 left-2 z-1">
                <FaArrowLeft />
            </Link>
            <div className="absolute top-2 right-2 flex gap-2 z-1">
                <Link to={editTo} className="btn-icon-dark">
                    <FaPen />
                </Link>
                <button
                    onClick={() =>
                        setDetailLayout({ ...detailLayout, isJson: !detailLayout.isJson })
                    }
                    className={`btn-icon-dark ${detailLayout.isJson ? 'btn-primary' : ''}`}>
                    <FaCode />
                </button>
            </div>
            {detailLayout.isJson ? (
                <Paper className="pt-16">
                    <Editor data={data} readOnly />
                </Paper>
            ) : (
                children?.(data)
            )}
        </div>
    );
}
