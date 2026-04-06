//-Path: "TeaChoco-Hospital/client/src/components/layout/EditLayout.tsx"
import Paper from '../custom/Paper';
import Editor from '../custom/Editor';
import { Obj } from '@teachoco-dev/cli';
import { FiActivity } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useSwal } from '../../hooks/useSwal';
import type { Allows } from '../../types/auth';
import { useTranslation } from 'react-i18next';
import type { ApiData } from '../../types/types';
import ItemSkeleton from '../custom/ItemSkeleton';
import { useEffect, useMemo, useState } from 'react';
import type { OutApiData, Title } from '../../types/types';
import { useLayoutStore } from '../../store/useLayoutStore';
import { FaTrash, FaCode, FaXmark, FaArrowLeft, FaCircleExclamation } from 'react-icons/fa6';
import { Link, Navigate, useLocation, useNavigate, useParams, useBlocker } from 'react-router-dom';
import Activity from '../custom/Activity';

/**
 * EditLayout component to provide a consistent layout for editing or creating data.
 * @param find Function to find data by id.
 * @param title Title of the data being edited.
 * @param onSave Callback function to save the data.
 * @param loading Loading state.
 * @param newData Default data for creating a new record.
 * @param children Children component that renders the form fields.
 * @param Skeleton Skeleton component to show while loading.
 */
export default function EditLayout<Data extends ApiData<object>>({
    find,
    title,
    onSave,
    loading,
    newData,
    onRemove,
    children,
    Skeleton = ItemSkeleton,
}: {
    title: Title;
    loading?: boolean;
    newData: OutApiData<Data>;
    Skeleton?: () => React.JSX.Element;
    find: (id: string) => Data | undefined;
    onRemove: (id: string) => Promise<void | boolean>;
    onSave: (data: Data, id: string) => Promise<void | boolean>;
    children: (
        data: OutApiData<Data>,
        setData: React.Dispatch<React.SetStateAction<OutApiData<Data> | undefined>>,
    ) => React.ReactNode;
}) {
    const { fire } = useSwal();
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const { id, uid } = useParams();
    const [isSaving, setIsSaving] = useState(false);
    const { user, loading: authLoading } = useAuth();
    const [dataLoading, setDataLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [initialData, setInitialData] = useState<string>('');
    const { detailLayout, setDetailLayout } = useLayoutStore();

    /**
     * Finds and cleans the data, then merges it with newData to ensure all fields are present.
     * @param {string} searchId The ID to search for.
     * @returns {OutApiData<Data>} The merged data.
     */
    const getSafeData = (searchId?: string): OutApiData<Data> => {
        if (!searchId || searchId === 'new') return newData;
        const found = find(searchId);
        if (!found) return newData;

        // Merge newData with the found record (omitting meta fields)
        // This ensures new fields added to newData template exist in loaded records
        const cleaned = Obj.omit(
            found,
            '_id',
            'user_id',
            'createdAt',
            'updatedAt',
            'createdBy',
            'updatedBy',
            '__v',
        ) as OutApiData<Data>;

        return { ...newData, ...cleaned };
    };

    const [data, setData] = useState<OutApiData<Data> | undefined>(() => getSafeData(id));
    const [isNotFound, setIsNotFound] = useState(false);

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
        if (location.pathname.startsWith('/admin/data')) return `/admin/data/${uid}/${base}`;
        return `/${base}`;
    }, [id, title, location.pathname]);

    const toDetail = useMemo(() => {
        const base = title.toLowerCase();
        if (location.pathname.startsWith('/admin/data'))
            return `/admin/data/${uid}/${base}${id === 'new' ? '' : `/${id}`}`;
        return `/${base}${id === 'new' ? '' : `/${id}`}`;
    }, [id, title, location.pathname]);

    if (!canEdit && !authLoading) return <Navigate to={`/${location.pathname.split('/')[1]}`} />;

    useEffect(() => {
        if (!authLoading) {
            const safeData = getSafeData(id);
            setData(safeData);
            setInitialData(JSON.stringify(safeData));

            // Track if the record was actually found in edit mode
            if (id !== 'new' && !find(id!)) setIsNotFound(true);
            else setIsNotFound(false);

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
                        navigate(
                            location.pathname.startsWith('/admin/data')
                                ? '/admin/data'
                                : `/${title.toLowerCase()}`,
                        );
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
        setError(null);
        try {
            if (!id || !data || !user) throw new Error('Invalid data');
            const save = {
                ...data,
                _id: id,
                user_id: user.user_id,
                createdBy: user.user_id,
                updatedBy: user.user_id,
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
    };

    if (loading || authLoading || dataLoading) return <Skeleton />;
    if (!data) return <Skeleton />;

    return (
        <>
            <div className="flex items-center gap-2 relative">
                <Link to={toBack} className={`btn-icon-dark`}>
                    <FaArrowLeft />
                </Link>
                <h1 className="text-2xl font-bold text-text-light dark:text-text-dark">
                    {t('editLayout.edit')} {t(`navbar.${title.toLowerCase()}`)}
                </h1>
                <div className="absolute right-0 flex items-center gap-2">
                    <Activity visible={id !== 'new'}>
                        <Link to={toDetail} className={`btn-icon-dark`}>
                            <FiActivity size={15} />
                        </Link>
                    </Activity>
                    <button
                        onClick={() =>
                            setDetailLayout({ ...detailLayout, editJson: !detailLayout.editJson })
                        }
                        className={`btn-icon-dark ${detailLayout.editJson ? 'btn-primary' : ''}`}>
                        <FaCode />
                    </button>
                </div>
            </div>
            <form onSubmit={handleSave} className="space-y-6">
                {isNotFound && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                        <Paper
                            variant="100"
                            className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-lg shadow-amber-500/5">
                            <div className="p-4 bg-amber-500/20 rounded-2xl text-amber-500 animate-pulse shrink-0">
                                <FaCircleExclamation size={32} />
                            </div>
                            <div className="flex-1 space-y-2 text-center md:text-left py-1">
                                <p className="text-lg font-black text-amber-600 dark:text-amber-400 tracking-tight">
                                    {t('editLayout.recordNotFound')}
                                </p>
                                <p className="text-sm font-medium text-amber-500/80 leading-relaxed max-w-lg">
                                    {t('editLayout.notFoundInfo', {
                                        title: t(`navbar.${title.toLowerCase()}`),
                                    })}
                                </p>
                            </div>
                            <Link
                                to={toBack}
                                className="btn bg-amber-500 text-white hover:bg-amber-600 px-8 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-amber-500/20">
                                {t('editLayout.goBack')}
                            </Link>
                        </Paper>
                    </div>
                )}

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
