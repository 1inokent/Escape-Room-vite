import { createAction } from '@reduxjs/toolkit';
import { Quests } from '../types/quests-types/quests';
import { QUEST_LEVELS, QUEST_TYPES } from '../const';

const loadQuests = createAction<Quests>('quest/loadQuests');

const setSortingOptionLevel = createAction<(typeof QUEST_LEVELS)[number]['id']>(
  'sorting/setSortingOptionLevel'
);
const setSortingOptionTypes = createAction<(typeof QUEST_TYPES)[number]['id']>(
  'sorting/setSortingOptionTypes'
);

export { loadQuests, setSortingOptionLevel, setSortingOptionTypes };
