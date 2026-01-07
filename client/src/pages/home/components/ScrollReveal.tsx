//-Path: "TeaChoco-Hospital/client/src/pages/home/components/ScrollReveal.tsx"
import { useScrollReveal } from '../../../hooks/useScrollReveal';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';

interface ScrollRevealProps {
    delay?: number;
    className?: string;
    duration?: number;
    children: React.ReactNode;
    direction?: RevealDirection;
}

const directionStyles: Record<RevealDirection, { hidden: string; visible: string }> = {
    up: {
        hidden: 'translate-y-16 opacity-0',
        visible: 'translate-y-0 opacity-100',
    },
    down: {
        hidden: '-translate-y-16 opacity-0',
        visible: 'translate-y-0 opacity-100',
    },
    left: {
        hidden: 'translate-x-16 opacity-0',
        visible: 'translate-x-0 opacity-100',
    },
    right: {
        hidden: '-translate-x-16 opacity-0',
        visible: 'translate-x-0 opacity-100',
    },
    fade: {
        hidden: 'opacity-0',
        visible: 'opacity-100',
    },
    scale: {
        hidden: 'scale-90 opacity-0',
        visible: 'scale-100 opacity-100',
    },
};

/**
 * A wrapper component that animates its children when they scroll into view
 */
export default function ScrollReveal({
    delay = 0,
    children,
    className = '',
    duration = 700,
    direction = 'up',
}: ScrollRevealProps) {
    const [ref, isVisible] = useScrollReveal<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });

    const styles = directionStyles[direction];

    return (
        <div
            ref={ref}
            className={`transition-all ${isVisible ? styles.visible : styles.hidden} ${className}`}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
            {children}
        </div>
    );
}
