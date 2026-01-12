//-Path: "TeaChoco-Hospital/client/src/hooks/useSwal.ts"
import { useAtomValue } from 'jotai';
import { darkModeAtom } from '../context/themeAtom';
import Swal, { type SweetAlertOptions } from 'sweetalert2';

/**
 * useSwal hook to provide a consistent SweetAlert2 configuration across the application.
 * It automatically applies theme-based colors and styling.
 */
export function useSwal() {
    const isDark = useAtomValue(darkModeAtom);

    const fire = (options: SweetAlertOptions) => {
        return Swal.fire({
            ...options,
            background: isDark ? '#1e293b' : '#ffffff',
            color: isDark ? '#f8fafc' : '#1e293b',
            confirmButtonColor: options.confirmButtonColor || '#2dd4bf',
            cancelButtonColor: options.cancelButtonColor || '#6b7280',
            customClass: {
                actions: 'gap-2',
                popup: 'rounded-3xl border border-border-light dark:border-border-dark shadow-2xl',
                title: 'text-2xl font-black tracking-tight',
                htmlContainer: 'text-sm font-medium leading-relaxed',
                confirmButton: 'btn btn-primary px-8 py-3 rounded-2xl font-bold',
                cancelButton:
                    'btn bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-text-muted-light dark:text-text-muted-dark px-8 py-3 rounded-2xl font-bold',
                ...(options.customClass as object),
            },
            buttonsStyling: false,
        });
    };

    return { fire, swal: Swal };
}
