import React, { useEffect, useState } from 'react';
import { Dayjs, default as dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import Button from '../../button';
import { DAYS_OF_THE_WEEK } from '../../../utils/constants/datetime';
dayjs.extend(isoWeek);

export interface ICalendarNavigationProps {
  onDateChange: (currentDate: Dayjs) => void;
}

const CalendarNavigation = (props: ICalendarNavigationProps) => {
  const { onDateChange } = props;
  const [shownDate, setShownDate] = useState(dayjs());
  const nextDay = () => {
    setShownDate(shownDate.add(1, 'day'));
  };
  const previousDay = () => {
    setShownDate(shownDate.subtract(1, 'day'));
  };
  const setToday = () => {
    setShownDate(dayjs());
  };
  useEffect(() => {
    onDateChange(shownDate); // eslint-disable-next-line
  }, [shownDate]);
  return (
    <div className="max-w-md flex flex-col items-center self-center">
      <p className="mb-5 capitalize">{`${DAYS_OF_THE_WEEK[shownDate.isoWeekday() - 1]}, ${shownDate.format('DD MMMM YYYY')}`}</p>
      <div className="flex flex-row">
        <Button onClick={() => previousDay()}>&lt; Previous day</Button>
        <Button onClick={() => setToday()}>Today</Button>
        <Button onClick={() => nextDay()}>Next day &gt;</Button>
      </div>
    </div>
  );
};

export default CalendarNavigation;
