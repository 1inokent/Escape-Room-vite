import { createReducer } from '@reduxjs/toolkit';
import { Quests } from '../types/quests-types/quests';
import { loadQuests } from './action';

type initialStateProps = {
  quests: Quests;
};

const initialState: initialStateProps = {
  quests: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadQuests, (state, action) => {
    state.quests = action.payload;
  });
});

export { reducer };
