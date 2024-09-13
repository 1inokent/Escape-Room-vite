import { createReducer } from '@reduxjs/toolkit';
import { Quests } from '../types/quests-types/quests-types';
import {
  getUserData,
  loadBookingById,
  loadQuestById,
  loadQuests,
  requireAuthorization,
  setDataLoading,
  setError,
  setSortingOptionLevel,
  setSortingOptionTypes,
} from './action';
import { AuthorizationStatus, QUEST_LEVELS, QUEST_TYPES } from '../const';
import { QuestPage } from '../types/quests-types/quest-page-types';
import { Bookings } from '../types/booking-types/booking-types';

type initialStateProps = {
  quests: Quests;
  questPage: QuestPage | null;
  reservedsQuest: Bookings | null;
  sortingOptionLevel: (typeof QUEST_LEVELS)[number]['id'];
  sortingOptionTypes: (typeof QUEST_TYPES)[number]['id'];
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
  isDataLoading: boolean;
  error: string | null;
};

const initialState: initialStateProps = {
  quests: [],
  questPage: null,
  reservedsQuest: null,
  sortingOptionLevel: QUEST_LEVELS[0].id,
  sortingOptionTypes: QUEST_TYPES[0].id,
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null,
  isDataLoading: true,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadQuests, (state, action) => {
      state.quests = action.payload;
    })
    .addCase(loadQuestById, (state, action) => {
      state.questPage = action.payload;
    })
    .addCase(loadBookingById, (state, action) => {
      state.reservedsQuest = action.payload;
    })
    .addCase(setSortingOptionLevel, (state, action) => {
      state.sortingOptionLevel = action.payload;
    })
    .addCase(setSortingOptionTypes, (state, action) => {
      state.sortingOptionTypes = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(getUserData, (state, action) => {
      const { email } = action.payload;
      state.userEmail = email;
    })
    .addCase(setDataLoading, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
