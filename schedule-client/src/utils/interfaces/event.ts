import { ILocation } from './location';

import { IUser } from './user';

export interface IEvent {
  dateFrom: string;
  dateTo: string;
  location: ILocation;
  user: IUser;
  id: number;
  description: string;
}