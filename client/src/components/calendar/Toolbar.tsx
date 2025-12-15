//-Path: "TeaChoco-Hospital/client/src/components/calendar/Toolbar.tsx"
import {
    FaPlus,
    FaClock,
    FaMinus,
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
import { useTranslation } from 'react-i18next';
import type { CalendarEvent } from './Calendar';
import { Navigate, Views, type ToolbarProps, type View } from 'react-big-calendar';

export interface ToolbarProp extends ToolbarProps<CalendarEvent, object> {
    step: number;
    onStepChange: (step: number) => void;
    timeslots: number;
    onTimeslotsChange: (timeslots: number) => void;
}

export default function Toolbar(props: ToolbarProp) {
    const { t } = useTranslation();
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
        <div className="flex flex-col justify-between items-center mb-4 p-4 bg-bg-card-light dark:bg-bg-card-dark rounded-lg border border-border-light dark:border-border-dark shadow-sm gap-4 transition-all duration-200">
            <div className="flex flex-col md:flex-row w-full">
                <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={goToBack}
                            className="p-2 rounded-lg hover:bg-primary/20 hover:text-primary transition-colors text-text-light dark:text-text-dark"
                            title={t('calendar.previous')}>
                            <FaChevronLeft />
                        </button>
                        <button
                            onClick={goToToday}
                            className="btn btn-primary px-4 py-2 gap-2 text-sm">
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
            </div>
            <div className="flex flex-col md:flex-row w-full">
                <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
                    {/* Step controls */}
                    <div
                        className="flex items-center bg-bg-light dark:bg-bg-dark rounded-lg border border-border-light dark:border-border-dark overflow-hidden"
                        title={t('calendar.step')}>
                        <button
                            onClick={handleStepOut}
                            disabled={step <= 5}
                            className={`p-2 transition-colors ${
                                step <= 5
                                    ? 'text-text-muted-light dark:text-text-muted-dark cursor-not-allowed'
                                    : 'text-text-light dark:text-text-dark hover:bg-primary/20 hover:text-primary'
                            }`}>
                            <FaMinus size={12} />
                        </button>
                        <div className="px-3 py-2 border-x border-border-light dark:border-border-dark min-w-[80px] text-center bg-bg-card-light dark:bg-bg-card-dark flex items-center justify-center gap-2">
                            <FaClock className="text-primary text-xs" />
                            <span className="text-sm font-medium text-text-light dark:text-text-dark">
                                {step}m
                            </span>
                        </div>
                        <button
                            onClick={handleStepIn}
                            className="p-2 transition-colors text-text-light dark:text-text-dark hover:bg-primary/20 hover:text-primary">
                            <FaPlus size={12} />
                        </button>
                    </div>

                    {/* Timeslots controls */}
                    <div
                        className="flex items-center bg-bg-light dark:bg-bg-dark rounded-lg border border-border-light dark:border-border-dark overflow-hidden"
                        title={t('calendar.timeslots')}>
                        <button
                            onClick={handleTimeslotsOut}
                            disabled={timeslots <= 1}
                            className={`p-2 transition-colors ${
                                timeslots <= 1
                                    ? 'text-text-muted-light dark:text-text-muted-dark cursor-not-allowed'
                                    : 'text-text-light dark:text-text-dark hover:bg-primary/20 hover:text-primary'
                            }`}>
                            <FaMinus size={12} />
                        </button>
                        <div className="px-3 py-2 border-x border-border-light dark:border-border-dark min-w-[60px] text-center bg-bg-card-light dark:bg-bg-card-dark flex items-center justify-center gap-2">
                            <FaLayerGroup className="text-primary text-xs" />
                            <span className="text-sm font-medium text-text-light dark:text-text-dark">
                                {timeslots}
                            </span>
                        </div>
                        <button
                            onClick={handleTimeslotsIn}
                            className="p-2 transition-colors text-text-light dark:text-text-dark hover:bg-primary/20 hover:text-primary">
                            <FaPlus size={12} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row w-full">
                <div className="flex items-center gap-1 bg-bg-light dark:bg-bg-dark rounded-lg p-1 border border-border-light dark:border-border-dark">
                    {([Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA] as const).map(
                        (viewType) => {
                            const Icon = viewIcons[viewType];
                            const isActive = view === viewType;
                            return (
                                <button
                                    key={viewType}
                                    onClick={() => handleViewChange(viewType)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
                                        isActive
                                            ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                            : 'text-text-light dark:text-text-dark hover:bg-primary/20 hover:text-primary'
                                    }`}>
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
