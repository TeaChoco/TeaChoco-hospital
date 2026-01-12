// -Path: "TeaChoco-Hospital/client/src/components/layout/EditLayout.tsx"
import { useAtom } from 'jotai';
import Paper from '../custom/Paper';
import Editor from '../custom/Editor';
import Loading from '../custom/Loading';
import { Obj } from '@teachoco-dev/cli';
import { useAuth } from '../../hooks/useAuth';
import { useSwal } from '../../hooks/useSwal';
import { useTranslation } from 'react-i18next';
import type { ApiData } from '../../types/types';
import { useEffect, useMemo, useState } from 'react';
import type { OutApiData, Title } from '../../types/types';
import { detailLayoutAtom } from '../../context/layoutAtom';
import { FaTrash, FaCode, FaXmark, FaArrowLeft, FaCircleExclamation } from 'react-icons/fa6';
import { Link, Navigate, useLocation, useNavigate, useParams, useBlocker } from 'react-router-dom';
import type { Allows } from '../../types/auth';

/**
 * EditLayout component to provide a consistent layout for editing or creating data.
 * @param find Function to find data by id.
 * @param title Title of the data being edited.
 * @param onSave Callback function to save the data.
 * @param loading Loading state.
 * @param newData Default data for creating a new record.
 * @param children Children component that renders the form fields.
 */
export default function EditLayout<Data extends ApiData<object>>({
    find,
    title,
    onSave,
    loading,
    newData,
    onRemove,
    children,
}: {
    title: Title;
    loading?: boolean;
    newData: OutApiData<Data>;
    find: (id: string) => Data | undefined;
    onRemove: (id: string) => Promise<void | boolean>;
    onSave: (data: Data, id: string) => Promise<void | boolean>;
    children: (
        data: OutApiData<Data>,
        setData: React.Dispatch<React.SetStateAction<OutApiData<Data> | undefined>>,
    ) => React.ReactNode;
}) {
    const { id } = useParams();
    const { fire } = useSwal();
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);
    const { user, loading: authLoading } = useAuth();
    const [dataLoading, setDataLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<string>('');
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

    const canEdit = user?.allows?.some(
        (allow) => allow.user_id === user?.user_id && allow[title.toLowerCase() as keyof Allows],
    );

    const hasChanges = useMemo(() => {
        if (!data || !initialData) return false;
        return JSON.stringify(data) !== initialData;
    }, [data, initialData]);

    const blocker = useBlocker(
        ({ nextLocation }) =>
            !isSaving && hasChanges && nextLocation.pathname !== location.pathname,
    );

    const toBack = useMemo(() => {
        const base = title.toLowerCase();
        return id === 'new' ? `/${base}` : `/${base}/${id}`;
    }, [id, title]);

    if (!canEdit && !authLoading) return <Navigate to={`/${location.pathname.split('/')[1]}`} />;

    useEffect(() => {
        if (!authLoading) {
            const found = id === 'new' ? newData : findData();
            if (found) {
                setData(found);
                setInitialData(JSON.stringify(found));
            }
            setDataLoading(false);
        }
    }, [id, newData, authLoading]);

    useEffect(() => {
        if (blocker.state === 'blocked') {
            const proceed = window.confirm(t('editLayout.unsavedChanges'));
            if (proceed) blocker.proceed();
            else blocker.reset();
        }
    }, [blocker, t]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasChanges]);

    const handleRemove = async () => {
        if (id) {
            const result = await fire({
                title: t('editLayout.confirmDeleteTitle'),
                text: t('editLayout.confirmDeleteText', {
                    title: t(`navbar.${title.toLowerCase()}`),
                }),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: t('editLayout.confirmDeleteConfirm'),
                cancelButtonText: t('editLayout.confirmDeleteCancel'),
                confirmButtonColor: '#ef4444',
            });

            if (result.isConfirmed) {
                try {
                    const callback = await onRemove(id);
                    if (callback !== false) {
                        setInitialData('');
                        navigate(`/${title.toLowerCase()}`);
                    }
                } catch (error) {
                    console.error(error);
                    setError('Failed to delete record');
                }
            }
        }
    };

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

                setIsSaving(true);
                const callback = await onSave(save, id);
                if (callback) {
                    setInitialData(JSON.stringify(data));
                    navigate(toBack);
                }
                setIsSaving(false);
            } catch (error: any) {
                console.error(error);
                const serverError = error.response?.data?.message;
                setError(
                    Array.isArray(serverError)
                        ? serverError.join(', ')
                        : typeof serverError === 'string'
                        ? serverError
                        : error instanceof Error
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
                            {t('editLayout.recordNotFound')}
                        </h2>
                        <p className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                            {t('editLayout.notFoundInfo', {
                                title: t(`navbar.${title.toLowerCase()}`),
                            })}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-primary w-full flex items-center justify-center gap-2 group">
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        {t('editLayout.goBack')}
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
                    {t('editLayout.edit')} {t(`navbar.${title.toLowerCase()}`)}
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
                                    {t('editLayout.executionError')}
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

                <div className="flex flex-col gap-4">
                    {id !== 'new' && (
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="btn bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 flex items-center justify-center gap-2 px-6">
                            <FaTrash size={14} />
                            {t('editLayout.remove')}
                        </button>
                    )}
                    <button type="submit" className="btn btn-primary">
                        {id === 'new' ? t('editLayout.create') : t('editLayout.saveChanges')}
                    </button>
                </div>
            </form>
        </>
    );
}
