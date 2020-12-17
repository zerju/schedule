import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../utils/constants/datetime';
import { IEvent } from '../../utils/interfaces/event';
import { ILocation } from '../../utils/interfaces/location';
import { IButtonProps } from '../button';
import Dialog from '../dialog';
import CalendarFields, { ISlotEvent } from './calendar-fields';
import CalendarHours from './calendar-hours';
import CalendarNavigation from './calendar-navigation';
import { addedEvents, currentUser, locations } from './constants';

interface ICalendarProps {}

const Calendar = (props: ICalendarProps) => {
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [eventFromToText, setEventFromToText] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [newAddedEvents, setNewAddedEvents] = useState(addedEvents);

  const createNewEvent = () => {
    const newEvents = newAddedEvents.slice();
    newEvents.push(selectedEvent as IEvent);
    setNewAddedEvents(newEvents);
    setShowAddEvent(false);
  };

  const dialogButtons: IButtonProps[] = [{ color: 'blue-border', children: 'create', onClick: () => createNewEvent() }];

  const onDateChange = (selectedDate: Dayjs) => {
    setCurrentDate(selectedDate);
  };
  /**@todo need to replace day with the custom settings for name of the courts/fields */
  const onSlotSelect = (slot: ISlotEvent, location: ILocation) => {
    const date = currentDate.format(DATE_FORMAT);
    setEventFromToText(`${date}, from ${slot.timeFrom} to ${slot.timeTo} on ${location.name}`);
    setShowAddEvent(true);
    console.log(location);
    const newEvent: IEvent = {
      user: currentUser,
      dateFrom: dayjs(`${date} ${slot.timeFrom}`).format(DATE_TIME_FORMAT),
      dateTo: dayjs(`${date} ${slot.timeTo}`).format(DATE_TIME_FORMAT),
      location: location,
      id: newAddedEvents.length + 1,
      description: 'This is for Jure',
    };
    console.log(newEvent);
    setSelectedEvent(newEvent);
  };

  const onDialogCancel = () => {
    setSelectedEvent(null);
    setShowAddEvent(false);
  };

  return (
    <div>
      <Dialog
        open={showAddEvent}
        actionButtons={dialogButtons}
        content={`Create a new event for ${eventFromToText}?`}
        headerText="create event"
        onClose={onDialogCancel}
      />
      <div className="ml-64 mt-12">
        <CalendarNavigation onDateChange={onDateChange} />
      </div>
      <div className="flex flex-row">
        <CalendarHours />
        <div className="flex-row flex">
          {/**@todo replace location with custom settings */}
          {locations.map((location, i) => (
            <CalendarFields
              currentDate={currentDate}
              addedEvents={newAddedEvents}
              key={location.id}
              location={location}
              onSlotSelect={(slot: ISlotEvent) => onSlotSelect(slot, location)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
