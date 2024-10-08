import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, QUEST_LEVELS, QUEST_TYPES } from '../const';

import { Quests } from '../types/quests-types/quests-types';
import { UserData } from '../types/user-types';
import { QuestPage } from '../types/quests-types/quest-page-types';
import { Bookings } from '../types/booking-types/booking-types';
import { ReservetionsTypes } from '../types/reservetion-types/reservetion-types';

const loadQuests = createAction<Quests>('quest/loadQuests');
const loadQuestById = createAction<QuestPage>('quest/loadQuestById');
const loadBookingById = createAction<Bookings>('booking/loadBookingById');
const loadReservation = createAction<ReservetionsTypes>(
  'myQuest/loadReservation'
);

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
const setDataLoading = createAction<boolean>('data/setDataLoading');
const setError = createAction<string | null>('setError');

export {
  loadQuests,
  setSortingOptionLevel,
  setSortingOptionTypes,
  requireAuthorization,
  getUserData,
  setDataLoading,
  loadQuestById,
  setError,
  loadBookingById,
  loadReservation,
};
