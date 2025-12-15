import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './Calendar.css';
import {
    Views,
    type View,
    momentLocalizer,
    type EventPropGetter,
    Calendar as BigCalendar,
} from 'react-big-calendar';
import moment from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Medicine } from '../../types/medicine';
import type { Appointment } from '../../types/appointment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

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
    defaultView,
    endAccessor,
    startAccessor,
    onSelectEvent,
    eventPropGetter,
}: {
    defaultView?: View;
    events: CalendarEvent[];
    startAccessor?: keyof CalendarEvent | ((event: CalendarEvent) => Date) | undefined;
    endAccessor?: keyof CalendarEvent | ((event: CalendarEvent) => Date) | undefined;
    eventPropGetter: EventPropGetter<CalendarEvent> | undefined;
    onSelectEvent?: (event: CalendarEvent, element: React.SyntheticEvent<HTMLElement>) => void;
}) {
    const { t } = useTranslation();
    const [view, setView] = useState<View>(defaultView || Views.MONTH);

    const defaultStartAccessor = (event: CalendarEvent) => event.start;
    const defaultEndAccessor = (event: CalendarEvent) => event.end;

    return (
        <DragAndDropCalendar
            view={view}
            events={events}
            onView={setView}
            localizer={localizer}
            defaultView={defaultView}
            onSelectSlot={(slotInfo) => {
                console.log(slotInfo);
            }}
            onSelectEvent={onSelectEvent}
            eventPropGetter={eventPropGetter}
            endAccessor={endAccessor || defaultEndAccessor}
            startAccessor={startAccessor || defaultStartAccessor}
            views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
            messages={{
                today: t('calendar.today'),
                previous: t('calendar.previous'),
                next: t('calendar.next'),
                month: t('calendar.month'),
                week: t('calendar.week'),
                day: t('calendar.day'),
                agenda: t('calendar.agenda'),
                date: t('calendar.date'),
                time: t('calendar.time'),
                event: t('calendar.event'),
                noEventsInRange: t('calendar.noEventsInRange'),
                showMore: (total) => t('calendar.showMore', { total }),
                allDay: t('calendar.allDay'),
            }}
        />
    );
}
