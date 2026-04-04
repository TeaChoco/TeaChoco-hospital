//-Path: "TeaChoco-Hospital/client/src/components/custom/Skeleton.tsx"
interface SkeletonProps {
    className?: string;
    variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
    width?: string | number;
    height?: string | number;
}

export default function Skeleton({ className = '', variant = 'text', width, height }: SkeletonProps) {
    const baseClass = 'bg-slate-200 dark:bg-slate-700 animate-pulse';

    const variantClasses = {
        text: 'rounded',
        circular: 'rounded-full',
        rectangular: '',
        rounded: 'rounded-xl',
    };

    const style = {
        width,
        height,
    };

    return <div className={`${baseClass} ${variantClasses[variant]} ${className}`} style={style} />;
}
