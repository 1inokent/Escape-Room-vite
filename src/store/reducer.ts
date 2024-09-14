import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, QUEST_LEVELS, QUEST_TYPES } from '../const';
import {
  getUserData,
  loadBookingById,
  loadQuestById,
  loadQuests,
  loadReservation,
  requireAuthorization,
  setDataLoading,
  setError,
  setSortingOptionLevel,
  setSortingOptionTypes,
} from './action';

import { Quests } from '../types/quests-types/quests-types';
import { QuestPage } from '../types/quests-types/quest-page-types';
import { Bookings } from '../types/booking-types/booking-types';
import { ReservetionsTypes } from '../types/reservetion-types/reservetion-types';

type initialStateProps = {
  quests: Quests;
  questPage: QuestPage | null;
  bookingsQuest: Bookings;
  reservedsQuests: ReservetionsTypes;
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
  bookingsQuest: [],
  reservedsQuests: [],
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
      state.bookingsQuest = action.payload;
    })
    .addCase(loadReservation, (state, action) => {
      state.reservedsQuests = action.payload;
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
