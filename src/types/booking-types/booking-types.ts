export type Slot = {
  time: string;
  date: 'today' | 'tomorrow';
};

export type Slots = {
  today: Array<{
    time: string;
    isAvailable: boolean;
  }>;
  tomorrow: Array<{
    time: string;
    isAvailable: boolean;
  }>;
};

export type Coordinates = [number, number];

export type Location = {
  Address: string;
  Coords: Coordinates;
};

export type Booking = {
  id: string;
  location: Location;
  slots: Slots;
};

export type FormValuesProps = {
  date: Slot['date'];
  time: Slot['time'];
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  placeId: string;
};

export type Bookings = Booking[];
