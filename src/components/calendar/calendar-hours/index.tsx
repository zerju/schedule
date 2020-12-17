import React from 'react';
import { hours } from '../constants';

const CalendarHours = () => {
  return (
    <div className="w-24  mb-10 mt-10 ml-10 border-black-400 border-r-2">
      <div className="items-center w-full border border-r-0 border-b-2 border-black-400 bg-white h-12">
        <p className="text-lg text-center uppercase">time</p>
      </div>
      <div>
        {hours.map((hour, i) => (
          <div
            key={hour}
            className={`box-border border-l border-b flex-center max-h-20 w-full p-0 bg-white ${i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
          >
            <div className="h-8 w-full flex">
              <p className="text-xs">{hour}</p>
            </div>
            <div className="border-t border-gray border-dashed h-8 w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarHours;
