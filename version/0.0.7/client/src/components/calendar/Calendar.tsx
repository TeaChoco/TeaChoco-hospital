//-Path: "TeaChoco-Hospital/client/src/components/calendar/Calendar.tsx"
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './Calendar.css';
import {
    Views,
    type View,
    type SlotInfo,
    momentLocalizer,
    type EventPropGetter,
    Calendar as BigCalendar,
    type stringOrDate,
} from 'react-big-calendar';
import moment from 'moment';
import Toolbar from './Toolbar';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import withDragAndDrop, {
    type EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop';
import type { Medicine } from '../../types/medicine';
import type { Appointment } from '../../types/appointment';

const localizer = momentLocalizer(moment);

const useWithDragAndDrop = (withDragAndDrop as any).default as typeof withDragAndDrop;
const DragAndDropCalendar = useWithDragAndDrop<CalendarEvent>(BigCalendar);

export interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    type: 'appointment' | 'medicine';
    resource?: Appointment | Medicine;
    resourceId?: string | number;
}

export default function Calendar({
    events,
    getNow,
    defaultDate,
    defaultView,
    endAccessor,
    defaultStep,
    onEventDrop,
    onSelectSlot,
    startAccessor,
    onSelectEvent,
    eventPropGetter,
    defaultTimeslots,
}: {
    defaultDate?: Date;
    defaultView?: View;
    defaultStep?: number;
    events: CalendarEvent[];
    defaultTimeslots?: number;
    getNow?: () => stringOrDate | undefined;
    onSelectSlot?: (slotInfo: SlotInfo) => void;
    eventPropGetter?: EventPropGetter<CalendarEvent>;
    onEventDrop?: (args: EventInteractionArgs<CalendarEvent>) => void;
    endAccessor?: keyof CalendarEvent | ((event: CalendarEvent) => Date);
    startAccessor?: keyof CalendarEvent | ((event: CalendarEvent) => Date);
    onSelectEvent?: (event: CalendarEvent, element: React.SyntheticEvent<HTMLElement>) => void;
}) {
    const { t } = useTranslation();
    const [date, setDate] = useState<Date>(new Date());
    const [step, setStep] = useState<number>(
        defaultStep || Number(localStorage.getItem('calendarStep')) || 15,
    );
    const [timeslots, setTimeslots] = useState<number>(
        defaultTimeslots || Number(localStorage.getItem('calendarTimeslots')) || 4,
    );
    const [view, setView] = useState<View>(
        defaultView || (localStorage.getItem('calendarView') as View) || Views.MONTH,
    );

    const defaultStartAccessor = (event: CalendarEvent) => event.start;
    const defaultEndAccessor = (event: CalendarEvent) => event.end;
    const onShowMore = (events: CalendarEvent[]) => {
        console.log('onShowMore', events);
    };

    useEffect(() => {
        localStorage.setItem('calendarView', view);
    }, [view]);

    useEffect(() => {
        localStorage.setItem('calendarStep', step.toString());
    }, [step]);

    useEffect(() => {
        localStorage.setItem('calendarTimeslots', timeslots.toString());
    }, [timeslots]);

    return (
        <DragAndDropCalendar
            selectable
            view={view}
            date={date}
            step={step}
            events={events}
            getNow={getNow}
            onView={setView}
            timeslots={timeslots}
            localizer={localizer}
            onShowMore={onShowMore}
            defaultDate={defaultDate}
            defaultView={defaultView}
            onEventDrop={onEventDrop}
            style={{ height: '100%' }}
            onSelectSlot={onSelectSlot}
            onSelectEvent={onSelectEvent}
            eventPropGetter={eventPropGetter}
            onNavigate={(date) => setDate(date)}
            endAccessor={endAccessor || defaultEndAccessor}
            startAccessor={startAccessor || defaultStartAccessor}
            views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
            components={{
                toolbar: (props) => (
                    <Toolbar
                        {...props}
                        step={step}
                        onStepChange={setStep}
                        timeslots={timeslots}
                        onTimeslotsChange={setTimeslots}
                    />
                ),
            }}
            messages={{
                date: t('calendar.date'),
                time: t('calendar.time'),
                event: t('calendar.event'),
                allDay: t('calendar.allDay'),
                week: t('calendar.week'),
                work_week: t('calendar.work_week'),
                day: t('calendar.day'),
                month: t('calendar.month'),
                previous: t('calendar.previous'),
                next: t('calendar.next'),
                yesterday: t('calendar.yesterday'),
                tomorrow: t('calendar.tomorrow'),
                today: t('calendar.today'),
                agenda: t('calendar.agenda'),
                showMore: (total) => t('calendar.showMore', { total }),
                noEventsInRange: t('calendar.noEventsInRange'),
            }}
        />
    );
}
