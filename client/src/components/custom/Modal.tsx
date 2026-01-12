//-Path: "TeaChoco-Hospital/client/src/components/custom/Modal.tsx"
import Paper from './Paper';
import { HiX } from 'react-icons/hi';
import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export default function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fadeIn"
                onClick={onClose}
            />

            {/* Content */}
            <div className={`relative z-10 w-full max-w-lg animate-scaleIn ${className}`}>
                <Paper className="overflow-hidden shadow-2xl rounded-2xl border border-border-light/50 dark:border-border-dark/50 bg-bg-paper-light dark:bg-bg-paper-dark">
                    <div className="flex items-center justify-between p-4 border-b border-border-light/20 dark:border-border-dark/20">
                        <h3 className="text-lg font-bold text-text-light dark:text-text-dark">
                            {title}
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-text-muted-light dark:text-text-muted-dark hover:text-red-500">
                            <HiX className="text-xl" />
                        </button>
                    </div>
                    <div className="p-4 md:p-6">{children}</div>
                </Paper>
            </div>
        </div>,
        document.body,
    );
}
