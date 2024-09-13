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

export type Bookings = Booking[];
