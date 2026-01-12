//-Path: "TeaChoco-Hospital/client/src/pages/calendar/CalendarFull.tsx"
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/custom/Loading';
import Calendar from '../../components/calendar/Calendar';
import { useCalendarEvents } from '../../hooks/useCalendarEvents';

export default function CalendarFull() {
    const navigate = useNavigate();
    const { appointmentEvents, medicineEvents } = useCalendarEvents();

    if (!appointmentEvents || !medicineEvents) return <Loading />;

    const events = [...appointmentEvents, ...medicineEvents];

    return (
        <div className="h-screen max-h-screen">
            <Calendar
                events={events}
                onSelectEvent={(event) => {
                    if (event.type === 'appointment') navigate(`/appointments/${event.id}`);
                    else if (event.type === 'medicine') {
                        if (event.resource && '_id' in event.resource)
                            navigate(`/medicines/${event.resource._id}`);
                    }
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
    );
}
