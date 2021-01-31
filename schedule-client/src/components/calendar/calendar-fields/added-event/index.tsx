import dayjs from 'dayjs';
import React from 'react';
import { TIME_FORMAT } from '../../../../utils/constants/datetime';
import { IEvent } from '../../../../utils/interfaces/event';

export interface IAddedEventProps {
  event?: IEvent | null;
}

const AddedEvent = (props: IAddedEventProps) => {
  const { event } = props;
  let slotCount = 0;
  if (!event) {
    return null;
  }
  let currentToTime = dayjs(event.dateFrom);
  const timeTo = dayjs(event.dateTo);
  while (true) {
    currentToTime = currentToTime.add(30, 'minute');
    ++slotCount;
    if (timeTo.isSame(currentToTime)) {
      break;
    }
  }
  return (
    <div
      title={event.description}
      className="bg-blue-600 rounded-sm flex flex-col items-center"
      style={{ height: `calc(${2 * slotCount}rem + 1px)` }}
    >
      <span className="text-white">{`${dayjs(event.dateFrom).format(TIME_FORMAT)} - ${dayjs(event.dateTo).format(TIME_FORMAT)}`}</span>
      <span className="text-white">{event.user.name}</span>
    </div>
  );
};

export default AddedEvent;
