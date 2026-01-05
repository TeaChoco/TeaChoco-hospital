// -Path: "TeaChoco-Hospital/client/src/pages/calendar/CalendarPage.tsx"
import { Resource } from '../../types/auth';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/custom/Loading';
import ListLayout from '../../components/layout/ListLayout';
import { useCalendarEvents } from '../../hooks/useCalendarEvents';
import Calendar, { type CalendarEvent } from '../../components/calendar/Calendar';

export default function CalendarPage() {
    const { user } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { appointmentEvents, medicineEvents } = useCalendarEvents();

    if (!appointmentEvents || !medicineEvents) return <Loading />;

    const events: CalendarEvent[] = [...appointmentEvents, ...medicineEvents];

    const canEdit = user?.allows?.some((allow) => allow.calendars?.edit);

    return (
        <ListLayout
            datas={events}
            resource={Resource.CALENDARS}
            header={t('calendarPage.header')}
            buttons={(NewButton) => (
                <>
                    <NewButton to={`/appointments/edit/new`} visible={canEdit}>
                        {t('calendarPage.newAppointment')}
                    </NewButton>
                    <NewButton to={`/medicines/edit/new`} visible={canEdit}>
                        {t('calendarPage.newMedicine')}
                    </NewButton>
                </>
            )}
            description={t('calendarPage.description')}>
            <div className="h-200 bg-bg-card-light dark:bg-bg-card-dark p-4 rounded-xl shadow-sm border border-border-light dark:border-border-dark text-text-light dark:text-text-dark transition-all duration-200">
                <Calendar
                    events={events}
                    onSelectSlot={(slotInfo) => {
                        console.log('onSelectSlot', slotInfo);
                    }}
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
