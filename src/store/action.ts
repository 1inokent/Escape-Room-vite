import { createAction } from '@reduxjs/toolkit';
import { Quests } from '../types/quests-types/quests';
import { AuthorizationStatus, QUEST_LEVELS, QUEST_TYPES } from '../const';
import { UserData } from '../types/user-types';

const loadQuests = createAction<Quests>('quest/loadQuests');

const setSortingOptionLevel = createAction<(typeof QUEST_LEVELS)[number]['id']>(
  'sorting/setSortingOptionLevel'
);
const setSortingOptionTypes = createAction<(typeof QUEST_TYPES)[number]['id']>(
  'sorting/setSortingOptionTypes'
);

const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);
const getUserData = createAction<UserData>('user/getUserData');

export {
  loadQuests,
  setSortingOptionLevel,
  setSortingOptionTypes,
  requireAuthorization,
  getUserData,
};
