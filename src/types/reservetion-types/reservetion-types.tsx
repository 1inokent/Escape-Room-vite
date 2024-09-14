import { Quest} from '../quests-types/quests-types';
import { Location, Slot } from '../booking-types/booking-types';

export type ReservetionType = {
  date: Slot['date'];
  time: Slot['time'];
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  id: string;

  location: Location;
  quest: Quest;
  };

export type ReservetionsTypes = ReservetionType[]
