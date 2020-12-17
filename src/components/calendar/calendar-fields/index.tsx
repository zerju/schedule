import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import { DATE_FORMAT } from '../../../utils/constants/datetime';
import { IEvent } from '../../../utils/interfaces/event';
import { ILocation } from '../../../utils/interfaces/location';
import { hours } from '../constants';
import AddedEvent from './added-event';

dayjs.extend(isBetween);

export interface ISlotEvent {
  timeFrom: string;
  timeTo: string;
  action: 'add' | 'edit' | 'delete';
}

export interface ICalendarFieldsProps {
  onSlotSelect: (slot: ISlotEvent) => void;
  location: ILocation;
  addedEvents?: IEvent[];
  currentDate: Dayjs;
}

const CalendarFields = (props: ICalendarFieldsProps) => {
  const { onSlotSelect } = props;

  const [selectModeActive, setSelectModeActive] = useState(false);
  const [selectedSlotIndexes, setSelectedSlotIndexes] = useState(new Set());
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [timeFromIndex, setTimeFromIndex] = useState(0);
  const [timeToIndex, setTimeToIndex] = useState(0);
  const [hasExitedWhileSelecting, setHasExitedWhileSelecting] = useState(false);

  useEffect(() => {
    const body = document.body;
    const handleMouseUp = (): void => {
      if (selectModeActive && hasExitedWhileSelecting) {
        selectModeEndAction();
      }
    };
    body.addEventListener('mouseup', handleMouseUp);
    return () => body.removeEventListener('mouseup', handleMouseUp);
  });

  const add30Minutes = (hour: string): string => {
    if (hour.includes(':00')) {
      return hour.replace(':00', ':30');
    } else {
      return hour.replace(':30', ':00');
    }
  };

  const handleExitingField = () => {
    if (selectModeActive) {
      setHasExitedWhileSelecting(true);
    }
  };

  const handleEnteringField = () => {
    if (selectModeActive) {
      setHasExitedWhileSelecting(false);
    }
  };

  const selectModeEndAction = (): void => {
    if (!selectModeActive) {
      return;
    }
    const newSlot: ISlotEvent = {
      action: 'add',
      timeFrom,
      timeTo,
    };
    onSlotSelect(newSlot);
    setSelectModeActive(false);
    setSelectedSlotIndexes(new Set());
    setTimeFrom('');
    setTimeTo('');
    setTimeToIndex(0);
    setTimeFromIndex(0);
    setHasExitedWhileSelecting(false);
  };

  const selectModeStartAction = (index: number) => {
    let hour = hours[(index / 10) | 0];
    const stringIndex = index.toString();
    if (stringIndex[stringIndex.length - 1] === '1') {
      hour = add30Minutes(hour);
    }
    setTimeFrom(hour);
    setTimeFromIndex(index);
    setTimeTo(add30Minutes(hour));
    setTimeToIndex(index);
    setSelectedSlotIndexes((indexes) => indexes.add(index));
    setSelectModeActive(true);
  };

  const handleMouseOver = (indexOver: number, isFullHour: boolean): void => {
    // if user is holding down the mouse button
    if (selectModeActive && !hasExitedWhileSelecting) {
      // if user did not already hover over this slot
      setSelectedSlotIndexes((indexes) => indexes.add(indexOver));
      let hoveredTime;
      if (isFullHour) {
        hoveredTime = hours[(indexOver / 10) | 0];
      } else {
        hoveredTime = add30Minutes(hours[(indexOver / 10) | 0]);
      }
      if (hoveredTime > timeTo) {
        setTimeTo(add30Minutes(hoveredTime));
        setTimeToIndex(indexOver);
      }
    }
  };

  useEffect(() => {
    const handleMissedSlots = (): void => {
      if (timeFromIndex === timeToIndex) {
        return;
      }
      for (let i = timeFromIndex; i <= timeToIndex; i += 10) {
        const nextFullIndex = +`${(i / 10).toString().split('.')[0]}0`;
        setSelectedSlotIndexes((indexes) => indexes.add(nextFullIndex));
        const nextHalfIndex = +`${(i / 10).toString().split('.')[0]}1`;
        if (nextHalfIndex <= timeToIndex) {
          setSelectedSlotIndexes((indexes) => indexes.add(nextHalfIndex));
        }
      }
    };
    handleMissedSlots();
  }, [timeFromIndex, timeToIndex, setSelectedSlotIndexes]);

  const checkIfHasEvent = (hour: string, isAddEvent = false): boolean | IEvent => {
    if (!props.addedEvents || props.addedEvents.length === 0) {
      return false;
    }
    const suppliedHour = dayjs(`${props.currentDate.format(DATE_FORMAT)} ${hour}`);

    for (const event of props.addedEvents) {
      if (event.location.id !== props.location.id) {
        continue;
      }
      if (!isAddEvent && suppliedHour.isBetween(event.dateFrom, event.dateTo, null, '[)')) {
        return true;
      }
      if (isAddEvent && suppliedHour.isSame(dayjs(event.dateFrom))) {
        return event;
      }
    }

    return false;
  };
  /** @todo need to reevaluate how to render calendar fields and events */
  return (
    <div
      onMouseLeave={handleExitingField}
      onMouseEnter={handleEnteringField}
      onMouseUp={selectModeEndAction}
      className={`w-32 mb-10 mt-10 ml-0 border-black-400 border-l-0 border-r`}
    >
      {/* Header */}
      <div className={`w-full border-t border-b-2 border-black-400 bg-white h-12 border-l-0 border-r`}>
        <div className="text-lg text-center uppercase">{props.location.name}</div>
      </div>
      {/* Event containers */}
      <div>
        {hours.map((hour, j) => (
          <div key={hour} className={`box-border border-b flex-center max-h-20 w-full p-0 ${j % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
            {!checkIfHasEvent(hour) && (
              <div
                onMouseDown={() => selectModeStartAction(+`${j}0`)}
                onMouseUp={selectModeEndAction}
                className={`cursor-pointer hover:bg-gray-300 h-8 w-full flex ${selectedSlotIndexes.has(+`${j}0`) ? 'bg-gray-300' : ''}`}
                onMouseEnter={() => handleMouseOver(+`${j}0`, true)}
              ></div>
            )}
            {!checkIfHasEvent(add30Minutes(hour)) && (
              <div
                onMouseDown={() => selectModeStartAction(+`${j}1`)}
                onMouseUp={selectModeEndAction}
                onMouseEnter={() => handleMouseOver(+`${j}1`, false)}
                className={`cursor-pointer hover:bg-gray-300 border-t border-gray border-dashed h-8 w-full ${
                  selectedSlotIndexes.has(+`${j}1`) ? 'bg-gray-300' : ''
                }`}
              ></div>
            )}
            {/* Added events */}
            {(checkIfHasEvent(hour, true) || checkIfHasEvent(add30Minutes(hour), true)) && (
              <AddedEvent event={checkIfHasEvent(hour, true) as IEvent} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarFields;
