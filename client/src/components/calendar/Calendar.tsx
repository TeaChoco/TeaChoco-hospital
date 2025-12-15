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
} from 'react-big-calendar';
import moment from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import withDragAndDrop, {
    type EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop';
import type { Medicine } from '../../types/medicine';
import type { Appointment } from '../../types/appointment';
import Toolbar from './Toolbar';

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
    defaultDate,
    defaultView,
    endAccessor,
    onEventDrop,
    onSelectSlot,
    startAccessor,
    onSelectEvent,
    eventPropGetter,
    defaultStep = 15,
    defaultTimeslots = 4,
}: {
    defaultDate?: Date;
    defaultView?: View;
    defaultStep?: number;
    defaultTimeslots?: number;
    events: CalendarEvent[];
    onSelectSlot?: (slotInfo: SlotInfo) => void;
    eventPropGetter?: EventPropGetter<CalendarEvent>;
    onEventDrop?: (args: EventInteractionArgs<CalendarEvent>) => void;
    endAccessor?: keyof CalendarEvent | ((event: CalendarEvent) => Date);
    startAccessor?: keyof CalendarEvent | ((event: CalendarEvent) => Date);
    onSelectEvent?: (event: CalendarEvent, element: React.SyntheticEvent<HTMLElement>) => void;
}) {
    const { t } = useTranslation();
    const [step, setStep] = useState(defaultStep);
    const [timeslots, setTimeslots] = useState(defaultTimeslots);
    const [date, setDate] = useState<Date>(new Date());
    const [view, setView] = useState<View>(defaultView || Views.MONTH);

    const defaultStartAccessor = (event: CalendarEvent) => event.start;
    const defaultEndAccessor = (event: CalendarEvent) => event.end;

    return (
        <DragAndDropCalendar
            selectable
            view={view}
            date={date}
            step={step}
            events={events}
            onView={setView}
            timeslots={timeslots}
            localizer={localizer}
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
