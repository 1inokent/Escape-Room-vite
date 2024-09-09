import { createReducer } from '@reduxjs/toolkit';
import { Quests } from '../types/quests-types/quests';
import {
  getUserData,
  loadQuests,
  requireAuthorization,
  setSortingOptionLevel,
  setSortingOptionTypes,
} from './action';
import { AuthorizationStatus, QUEST_LEVELS, QUEST_TYPES } from '../const';

type initialStateProps = {
  quests: Quests;
  sortingOptionLevel: (typeof QUEST_LEVELS)[number]['id'];
  sortingOptionTypes: (typeof QUEST_TYPES)[number]['id'];
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
};

const initialState: initialStateProps = {
  quests: [],
  sortingOptionLevel: QUEST_LEVELS[0].id,
  sortingOptionTypes: QUEST_TYPES[0].id,
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadQuests, (state, action) => {
      state.quests = action.payload;
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
    });
});

export { reducer };
