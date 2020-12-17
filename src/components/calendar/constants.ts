import dayjs from "dayjs";
import { DATE_TIME_FORMAT } from "../../utils/constants/datetime";
import { IEvent } from "../../utils/interfaces/event";
import { ILocation } from "../../utils/interfaces/location";
import { IUser } from "../../utils/interfaces/user";

export const hours = ['00:00', '01:00', '02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'];
export const locations: ILocation[] = [{id: 1, name: 'igrisce 1'}, {id: 2, name: 'igrisce 2'},{id: 3, name: 'igrisce 3'},{id: 4, name: 'igrisce 4'},{id: 5, name: 'igrisce 5'},{id: 6, name: 'igrisce 6'},{id: 7, name: 'igrisce 7'}];
export const firstDayOfTheWeek = 0;

export const currentUser: IUser = {
  id: 1,
  name: 'Jure',
  email: 'jure@test.com'
};

export const addedEvents: IEvent[] = [
  {
 id: 1,
 dateFrom: dayjs('2020-11-29T10:00:00Z').format(DATE_TIME_FORMAT),
 dateTo: dayjs('2020-11-29T10:00:00Z').add(2, 'hour').format(DATE_TIME_FORMAT),
 location: {id: 1, name: 'igrisce 1'},
 user: currentUser,
 description: 'This is for Jure'
},
  {
 id: 2,
 dateFrom: dayjs('2020-11-29T16:00:00Z').format(DATE_TIME_FORMAT),
 dateTo: dayjs('2020-11-29T16:00:00Z').add(2, 'hour').format(DATE_TIME_FORMAT),
 location: {id: 4, name: 'igrisce 4'},
 user: currentUser,
 description: 'This is for Jure'
},
];