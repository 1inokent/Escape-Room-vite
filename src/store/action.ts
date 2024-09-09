import { createAction } from '@reduxjs/toolkit';
import { Quests } from '../types/quests-types/quests';

const loadQuests = createAction<Quests>('quest/loadQuests');

export { loadQuests };
