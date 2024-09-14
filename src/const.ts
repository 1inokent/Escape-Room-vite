import { Location } from './types/booking-types/booking-types';

enum AppRoute {
  Main = '/',
  Login = '/login',
  Contacts = '/contacts',
  Quest = '/quest/:id',
  Booking = '/quest/:id/booking',
  MyQuests = '/my-quests',
}

enum ApiRoute {
  Quest = '/quest',
  Login = '/login',
  Logout = '/logout',
  Booking = '/booking',
  Reservation = '/reservation',
}

enum SortingOptionLevelTitle {
  Any = 'Любой',
  Easy = 'Легкий',
  Medium = 'Средний',
  Hard = 'Сложный',
}
enum SortingOptionTypesTitle {
  All = 'Все квесты',
  Adventures = 'Приключения',
  Horror = 'Ужасы',
  Mystic = 'Мистика',
  Detective = 'Детектив',
  SciFi = 'Sci-fi',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const QUEST_TYPES = [
  { id: 'all', title: SortingOptionTypesTitle.All, icon: '#icon-all-quests' },
  {
    id: 'adventures',
    title: SortingOptionTypesTitle.Adventures,
    icon: '#icon-adventure',
  },
  { id: 'horror', title: SortingOptionTypesTitle.Horror, icon: '#icon-horror' },
  { id: 'mystic', title: SortingOptionTypesTitle.Mystic, icon: '#icon-mystic' },
  {
    id: 'detective',
    title: SortingOptionTypesTitle.Detective,
    icon: '#icon-detective',
  },
  { id: 'sci-fi', title: SortingOptionTypesTitle.SciFi, icon: '#icon-sci-fi' },
] as const;

const QUEST_LEVELS = [
  { id: 'any', title: SortingOptionLevelTitle.Any },
  { id: 'easy', title: SortingOptionLevelTitle.Easy },
  { id: 'medium', title: SortingOptionLevelTitle.Medium },
  { id: 'hard', title: SortingOptionLevelTitle.Hard },
] as const;

const DEFAULT_LOCATION_FOR_CONTACTS: Location = {
  Address: 'Санкт-Петербург, Набережная реки Карповка, д 5П',
  Coords: [59.9635, 30.3368],
} as const;

const AUTH_TOKEN_KEY = 'escape-room-token';

const PATH_MARKER_DEFAULT = '../../public/img/svg/pin-default.svg';
const PATH_MARKER_CURRENT = '../../public/img/svg/pin-active.svg';

export {
  AUTH_TOKEN_KEY,
  AppRoute,
  ApiRoute,
  QUEST_TYPES,
  QUEST_LEVELS,
  SortingOptionLevelTitle,
  SortingOptionTypesTitle,
  AuthorizationStatus,
  PATH_MARKER_DEFAULT,
  PATH_MARKER_CURRENT,
  DEFAULT_LOCATION_FOR_CONTACTS,
};
