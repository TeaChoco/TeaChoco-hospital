//- Path: "TeaChoco-Hospital/client/src/layout/EditLayout.tsx"
import { useAtom } from 'jotai';
import Paper from '../custom/Paper';
import Editor from '../custom/Editor';
import Loading from '../custom/Loading';
import { Obj } from '@teachoco-dev/cli';
import { Allow } from '../../types/auth';
import { useAuth } from '../../hooks/useAuth';
import type { ApiData } from '../../types/types';
import { useEffect, useMemo, useState } from 'react';
import type { OutApiData, Title } from '../../types/types';
import { detailLayoutAtom } from '../../context/layoutAtom';
import { FaCircleExclamation, FaArrowLeft, FaCode, FaXmark } from 'react-icons/fa6';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

export default function EditLayout<Data extends ApiData<object>>({
    find,
    title,
    onSave,
    loading,
    newData,
    children,
}: {
    title: Title;
    loading?: boolean;
    newData: OutApiData<Data>;
    find: (id: string) => Data | undefined;
    onSave: (data: Data, id: string) => Promise<void | boolean>;
    children: (
        data: OutApiData<Data>,
        setData: React.Dispatch<React.SetStateAction<OutApiData<Data> | undefined>>,
    ) => React.ReactNode;
}) {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const [dataLoading, setDataLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [detailLayout, setDetailLayout] = useAtom(detailLayoutAtom);
    const findData = () => {
        if (!id) return;
        const found = find(id);
        if (found)
            return Obj.omit(
                found,
                '_id',
                'user_id',
                'createdAt',
                'updatedAt',
                'createdBy',
                'updatedBy',
                '__v',
            ) as OutApiData<Data>;
    };
    const [data, setData] = useState<OutApiData<Data> | undefined>(() => {
        if (id === 'new') return newData;
        return findData();
    });

    const canEdit = user?.allows?.some((allow) =>
        allow.edit.find((edit) => location.pathname.includes(edit) || edit === Allow.AUTH),
    );

    if (!canEdit && !authLoading) return <Navigate to={`/${location.pathname.split('/')[1]}`} />;

    useEffect(() => {
        if (!authLoading) {
            console.log('update');
            if (id === 'new') {
                setData(newData);
                setDataLoading(false);
            } else {
                setDataLoading(true);
                const found = findData();
                if (found) setData(found);
                setDataLoading(false);
            }
        }
    }, [id, newData, authLoading]);

    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault();
        if (id && data) {
            try {
                const save = {
                    ...data,
                    _id: id,
                    user_id: user?.user_id,
                    createdBy: user?.user_id,
                    updatedBy: user?.user_id,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    __v: 0,
                } as Data;
                console.log(data, save);

                const callback = await onSave(save, id);
                if (callback) navigate(toBack);
            } catch (error) {
                console.error(error);
                setError(
                    error instanceof Error
                        ? error.message
                        : typeof error === 'string'
                        ? error
                        : typeof error === 'object'
                        ? JSON.stringify(error)
                        : 'Something went wrong',
                );
            }
        }
    };

    const toBack = useMemo(() => {
        const base = title.toLowerCase();
        return id === 'new' ? `/${base}` : `/${base}/${id}`;
    }, [id, title]);

    if (loading || authLoading || dataLoading) return <Loading />;
    if (!data)
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
                <Paper
                    variant="100"
                    className="max-w-md w-full p-10 flex flex-col items-center text-center space-y-6 border-t-4 border-red-500 shadow-xl">
                    <div className="p-5 bg-red-50 dark:bg-red-900/20 rounded-full text-red-500 animate-pulse">
                        <FaCircleExclamation size={48} />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-black text-text-light dark:text-text-dark tracking-tight">
                            Record Not Found
                        </h2>
                        <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                            We couldn't retrieve the{' '}
                            <span className="text-primary font-bold lowercase">{title}</span> data
                            you're looking for. It might have been moved or deleted.
                        </p>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-primary w-full flex items-center justify-center gap-2 group">
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        Go Back to Previous Page
                    </button>
                </Paper>
            </div>
        );

    return (
        <>
            <div className="flex items-center gap-2 relative">
                <Link to={toBack} className={`btn-icon-dark`}>
                    <FaArrowLeft />
                </Link>
                <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
                    Edit {title}
                </h1>
                <button
                    onClick={() =>
                        setDetailLayout((prev) => ({ ...prev, editJson: !prev.editJson }))
                    }
                    className={`absolute right-0 btn-icon-dark ${
                        detailLayout.editJson ? 'btn-primary' : ''
                    }`}>
                    <FaCode />
                </button>
            </div>
            <form onSubmit={handleSave} className="space-y-6">
                {error && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                        <Paper
                            variant="100"
                            className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-4 shadow-lg shadow-red-500/5">
                            <div className="p-2 bg-red-500/20 rounded-xl text-red-500 animate-pulse shrink-0">
                                <FaCircleExclamation size={20} />
                            </div>
                            <div className="flex-1 space-y-1 py-1">
                                <p className="text-sm font-black text-red-600 dark:text-red-400 uppercase tracking-widest">
                                    Execution Error
                                </p>
                                <p className="text-sm font-medium text-red-500/80 leading-relaxed">
                                    {typeof error === 'object' ? JSON.stringify(error) : error}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setError(null)}
                                className="p-2 hover:bg-red-500/10 rounded-xl transition-colors text-red-500/50 hover:text-red-500">
                                <FaXmark size={18} />
                            </button>
                        </Paper>
                    </div>
                )}

                {detailLayout.editJson ? (
                    <Editor data={data} setData={setData} />
                ) : (
                    children(data, setData)
                )}

                <button type="submit" className="btn btn-primary w-full">
                    Save Changes
                </button>
            </form>
        </>
    );
}
