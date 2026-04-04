//-Path: "TeaChoco-Hospital/client/src/components/calendar/Toolbar.tsx"
import {
    FaClock,
    FaListAlt,
    FaLayerGroup,
    FaChevronLeft,
    FaCalendarAlt,
    FaCalendarDay,
    FaChevronRight,
    FaCalendarWeek,
    FaCalendarCheck,
} from 'react-icons/fa';
import { useCallback } from 'react';
import { StepControl } from './StepControl';
import { useTranslation } from 'react-i18next';
import type { CalendarEvent } from './Calendar';
import { Link, useLocation } from 'react-router-dom';
import { RiFullscreenLine, RiFullscreenExitLine } from 'react-icons/ri';
import { Navigate, Views, type ToolbarProps, type View } from 'react-big-calendar';

export interface ToolbarProp extends ToolbarProps<CalendarEvent, object> {
    step: number;
    onStepChange: (step: number) => void;
    timeslots: number;
    onTimeslotsChange: (timeslots: number) => void;
}

const screenClass = 'btn-icon p-3 top-0 left-0 absolute lg:relative';

export default function Toolbar(props: ToolbarProp) {
    const { t } = useTranslation();
    const location = useLocation();
    const { label, onNavigate, onView, view, step, onStepChange, timeslots, onTimeslotsChange } =
        props;

    const goToBack = useCallback(() => onNavigate(Navigate.PREVIOUS), [onNavigate]);
    const goToNext = useCallback(() => onNavigate(Navigate.NEXT), [onNavigate]);
    const goToToday = useCallback(() => onNavigate(Navigate.TODAY), [onNavigate]);
    const handleViewChange = useCallback((newView: View) => onView(newView), [onView]);

    const handleStepIn = useCallback(() => onStepChange(step + 5), [step, onStepChange]);
    const handleStepOut = useCallback(() => {
        if (step > 5) onStepChange(step - 5);
    }, [step, onStepChange]);

    const handleTimeslotsIn = useCallback(
        () => onTimeslotsChange(timeslots + 1),
        [timeslots, onTimeslotsChange],
    );
    const handleTimeslotsOut = useCallback(() => {
        if (timeslots > 1) onTimeslotsChange(timeslots - 1);
    }, [timeslots, onTimeslotsChange]);

    const viewIcons = {
        [Views.MONTH]: FaCalendarAlt,
        [Views.WEEK]: FaCalendarWeek,
        [Views.DAY]: FaCalendarDay,
        [Views.AGENDA]: FaListAlt,
    } as const;

    const viewLabels = {
        [Views.MONTH]: t('calendar.month'),
        [Views.WEEK]: t('calendar.week'),
        [Views.DAY]: t('calendar.day'),
        [Views.AGENDA]: t('calendar.agenda'),
    } as const;

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center mb-4 p-4 bg-bg-card-light dark:bg-bg-card-dark rounded-lg border border-border-light dark:border-border-dark shadow-sm gap-2 transition-all duration-200">
            <div className="relative flex flex-col md:flex-row justify-center lg:justify-start items-center gap-2 w-full">
                {location.pathname.includes('calendar/full') ? (
                    <Link to="/calendar" className={`${screenClass} btn-accent`}>
                        <RiFullscreenExitLine />
                    </Link>
                ) : (
                    <Link to="/calendar/full" className={`${screenClass} btn-primary`}>
                        <RiFullscreenLine />
                    </Link>
                )}
                <div className="flex items-center gap-2">
                    <button
                        onClick={goToBack}
                        className="p-2 rounded-lg hover:bg-primary/20 hover:text-primary transition-colors text-text-light dark:text-text-dark"
                        title={t('calendar.previous')}>
                        <FaChevronLeft />
                    </button>
                    <button onClick={goToToday} className="btn btn-primary px-4 py-2 gap-2 text-sm">
                        <FaCalendarCheck />
                        <span>{t('calendar.today')}</span>
                    </button>
                    <button
                        onClick={goToNext}
                        className="p-2 rounded-lg hover:bg-primary/20 hover:text-primary transition-colors text-text-light dark:text-text-dark"
                        title={t('calendar.next')}>
                        <FaChevronRight />
                    </button>
                </div>
                <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">
                    {label}
                </h2>
            </div>
            <div className="flex flex-col md:flex-row w-full items-center gap-4 justify-center lg:justify-end">
                {(view === Views.WEEK || view === Views.DAY) && (
                    <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col items-center gap-1 justify-center">
                        <StepControl
                            min={5}
                            unit="m"
                            step={step}
                            setStep={onStepChange}
                            handleIn={handleStepIn}
                            handleOut={handleStepOut}
                            icon={<FaClock className="text-primary text-xs" />}
                        />
                        <StepControl
                            step={timeslots}
                            setStep={onTimeslotsChange}
                            handleIn={handleTimeslotsIn}
                            handleOut={handleTimeslotsOut}
                            icon={<FaLayerGroup className="text-primary text-xs" />}
                        />
                    </div>
                )}
                <div className="w-fit flex items-center justify-center gap-1 bg-bg-light dark:bg-bg-dark rounded-lg p-1 border border-border-light dark:border-border-dark transition-colors duration-200">
                    {([Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA] as const).map(
                        (viewType) => {
                            const Icon = viewIcons[viewType];
                            const isActive = view === viewType;
                            return (
                                <button
                                    key={viewType}
                                    onClick={() => handleViewChange(viewType)}
                                    className={`btn ${isActive ? 'btn-primary' : ''}`}>
                                    <Icon />
                                    <span className="hidden sm:inline">{viewLabels[viewType]}</span>
                                </button>
                            );
                        },
                    )}
                </div>
            </div>
        </div>
    );
}
