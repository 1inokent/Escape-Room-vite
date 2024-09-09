import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, Store } from '../types/store/store';
import { Quests } from '../types/quests-types/quests';
import { ApiRoute } from '../const';
import { loadQuests } from './action';

const fetchQuestsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: Store;
    extra: AxiosInstance;
  }
>('quest/fetchQuests', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<Quests>(ApiRoute.Quest);
  dispatch(loadQuests(data));
});

export { fetchQuestsAction };
