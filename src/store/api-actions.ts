import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, Store } from '../types/store/store';
import { Quests } from '../types/quests-types/quests';
import { ApiRoute, AuthorizationStatus } from '../const';
import {
  getUserData,
  loadQuests,
  requireAuthorization,
  setDataLoading,
} from './action';
import { dropToken, getToken, saveToken } from '../service/token';
import { UserData } from '../types/user-types';
import { AuthData } from '../types/auth-data';

const fetchQuestsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: Store;
    extra: AxiosInstance;
  }
>('quest/fetchQuests', async (_arg, { dispatch, extra: api }) => {
  dispatch(setDataLoading(false));
  const { data } = await api.get<Quests>(ApiRoute.Quest);
  dispatch(setDataLoading(false));
  dispatch(loadQuests(data));
});

const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: Store;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const token = getToken();
    if (!token) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      return;
    }
    dispatch(setDataLoading(false));
    const { data } = await api.get<UserData>(ApiRoute.Login);
    dispatch(setDataLoading(false));
    dispatch(getUserData(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: Store;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<UserData>(ApiRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(checkAuthAction());
  }
);

const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: Store;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(ApiRoute.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});

export { fetchQuestsAction, checkAuthAction, logoutAction, loginAction };
