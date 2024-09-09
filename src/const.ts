enum AppRoute {
  Main = '/',
  Login = '/login',
}

enum ApiRoute {
  Quest = '/quest',
  Login = '/login',
  Logout = '/logout',
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

const AUTH_TOKEN_KEY = 'escape-room-token';

export {
  AUTH_TOKEN_KEY,
  AppRoute,
  ApiRoute,
  QUEST_TYPES,
  QUEST_LEVELS,
  SortingOptionLevelTitle,
  SortingOptionTypesTitle,
  AuthorizationStatus,
};
