enum AppRoute {
  Main = '/',
}

enum ApiRoute {
  Quest = '/quest',
}

const QUEST_TYPES = [
  { id: 'all', title: 'Все квесты', icon: '#icon-all-quests' },
  { id: 'adventures', title: 'Приключения', icon: '#icon-adventure' },
  { id: 'horror', title: 'Ужасы', icon: '#icon-horror' },
  { id: 'mystic', title: 'Мистика', icon: '#icon-mystic' },
  { id: 'detective', title: 'Детектив', icon: '#icon-detective' },
  { id: 'sci-fi', title: 'Sci-fi', icon: '#icon-sci-fi' },
] as const;

const QUEST_LEVELS = [
  { id: 'any', title: 'Любой' },
  { id: 'easy', title: 'Легкий' },
  { id: 'medium', title: 'Средний' },
  { id: 'hard', title: 'Сложный' },
] as const;

const AUTH_TOKEN_KEY = 'escape-room-token';

export { AUTH_TOKEN_KEY, AppRoute, ApiRoute, QUEST_TYPES, QUEST_LEVELS };
