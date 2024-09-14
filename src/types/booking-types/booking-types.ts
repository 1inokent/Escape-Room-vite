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
  address: string;
  coords: Coordinates;
};

export type Booking = {
  id: string;
  location: Location;
  slots: Slots;
};

export type BookingPayload = {
  date: Slot['date'];
  time: Slot['time'];
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  placeId: string;
};

export type Bookings = Booking[];
