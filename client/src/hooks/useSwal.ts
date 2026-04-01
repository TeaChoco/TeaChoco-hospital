//-Path: "TeaChoco-Hospital/client/src/hooks/useSwal.ts"
import { useTheme } from './useTheme';
import Swal, { type SweetAlertOptions } from 'sweetalert2';

/**
 * useSwal hook to provide a consistent SweetAlert2 configuration across the application.
 * It automatically applies theme-based colors and styling.
 */
export function useSwal() {
    const { isDark } = useTheme();

    const fire = (options: SweetAlertOptions) => {
        return Swal.fire({
            ...options,
            color: isDark ? '#f8fafc' : '#1e293b',
            background: isDark ? '#1e293b' : '#ffffff',
            cancelButtonColor: options.cancelButtonColor || '#6b7280',
            confirmButtonColor: options.confirmButtonColor || '#2dd4bf',
            customClass: {
                actions: 'gap-2',
                title: 'text-2xl font-black tracking-tight',
                htmlContainer: 'text-sm font-medium leading-relaxed',
                confirmButton: 'btn btn-primary px-8 py-3 rounded-2xl font-bold',
                popup: 'rounded-3xl border border-border-light dark:border-border-dark shadow-2xl',
                cancelButton:
                    'btn bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-text-muted-light dark:text-text-muted-dark px-8 py-3 rounded-2xl font-bold',
                ...(options.customClass as object),
            },
            buttonsStyling: false,
        });
    };

    return { fire, swal: Swal };
}
