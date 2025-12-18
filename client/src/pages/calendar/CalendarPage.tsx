//-Path: "TeaChoco-Hospital/client/src/pages/calendar/CalendarPage.tsx"
import { useNavigate } from 'react-router-dom';
import Calendar from '../../components/calendar/Calendar';
import ListLayout from '../../components/layout/ListLayout';
import { useCalendarEvents } from '../../hooks/useCalendarEvents';

export default function CalendarPage() {
    const navigate = useNavigate();
    const events = useCalendarEvents();

    return (
        <ListLayout
            header="Health Calendar"
            description="Track your appointments and medication schedule">
            <div className="h-200 bg-bg-card-light dark:bg-bg-card-dark p-4 rounded-xl shadow-sm border border-border-light dark:border-border-dark text-text-light dark:text-text-dark transition-all duration-200">
                <Calendar
                    events={events}
                    onSelectEvent={(event) => {
                        if (event.type === 'appointment') navigate(`/appointments/${event.id}`);
                        else if (event.type === 'medicine')
                            if (event.resource && '_id' in event.resource)
                                navigate(`/medicines/${event.resource._id}`);
                    }}
                    eventPropGetter={(event) => {
                        let backgroundColor = '#3174ad';
                        if (event.type === 'medicine') backgroundColor = '#10b981';
                        else if (event.type === 'appointment') backgroundColor = '#3b82f6';

                        return {
                            style: {
                                opacity: 0.8,
                                color: 'white',
                                backgroundColor,
                                borderRadius: '6px',
                            },
                        };
                    }}
                />
            </div>
        </ListLayout>
    );
}
