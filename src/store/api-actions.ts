import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute, AuthorizationStatus } from '../const';
import { dropToken, getToken, saveToken } from '../service/token';
import {
  getUserData,
  loadBookingById,
  loadQuestById,
  loadQuests,
  loadReservation,
  requireAuthorization,
  setDataLoading,
  setError,
} from './action';

import { AppDispatch, Store } from '../types/store/store';
import { Quests } from '../types/quests-types/quests-types';
import { UserData } from '../types/user-types';
import { AuthData } from '../types/auth-data';
import { QuestPage } from '../types/quests-types/quest-page-types';
import {
  Bookings,
  FormValuesProps,
} from '../types/booking-types/booking-types';
import { ReservetionsTypes } from '../types/reservetion-types/reservetion-types';

const fetchQuestsAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: Store;
    extra: AxiosInstance;
  }
>('quest/fetchQuests', async (_arg, { dispatch, extra: api }) => {
  try {
    dispatch(setDataLoading(false));
    const { data } = await api.get<Quests>(ApiRoute.Quest);
    dispatch(loadQuests(data));
  } catch (error) {
    dispatch(
      setError(
        error instanceof Error ? error.message : 'Failed to fetch booking'
      )
    );
  } finally {
    dispatch(setDataLoading(false));
  }
});

const fetchQuestByIdAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: Store;
    extra: AxiosInstance;
  }
>('quest/fetchQuestById', async (id: string, { dispatch, extra: api }) => {
  try {
    dispatch(setDataLoading(false));
    const { data } = await api.get<QuestPage>(`${ApiRoute.Quest}/${id}`);
    dispatch(loadQuestById(data));
  } catch (error) {
    dispatch(
      setError(error instanceof Error ? error.message : 'Failed to fetch quest')
    );
  } finally {
    dispatch(setDataLoading(false));
  }
});

const fetchBookingByIdAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: Store;
    extra: AxiosInstance;
  }
>(
  'booking/fetchBookingByIdAction',
  async (id: string, { dispatch, extra: api }) => {
    try {
      dispatch(setDataLoading(false));
      const { data } = await api.get<Bookings>(
        `${ApiRoute.Quest}/${id}${ApiRoute.Booking}`
      );
      dispatch(loadBookingById(data));
    } catch (error) {
      dispatch(
        setError(
          error instanceof Error ? error.message : 'Failed to fetch booking'
        )
      );
    } finally {
      dispatch(setDataLoading(false));
    }
  }
);

const fetchReservationAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: Store;
    extra: AxiosInstance;
  }
>('myQuest/fetchReservationAction', async (_arg, { dispatch, extra: api }) => {
  try {
    dispatch(setDataLoading(false));
    const { data } = await api.get<ReservetionsTypes>(ApiRoute.Reservation);

    dispatch(loadReservation(data));
  } catch (error) {
    dispatch(
      setError(
        error instanceof Error ? error.message : 'Failed to fetch reservation'
      )
    );
  } finally {
    dispatch(setDataLoading(false));
  }
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
    dispatch(getUserData(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  } finally {
    dispatch(setDataLoading(false));
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

const bookingSendAction = createAsyncThunk<
  void,
  { id: string; bookingData: FormValuesProps },
  {
    dispatch: AppDispatch;
    state: Store;
    extra: AxiosInstance;
  }
>(
  'booking/bookingSendAction',
  async ({ id, bookingData }, { dispatch, extra: api }) => {
    try {
      dispatch(setDataLoading(false));
      await api.post(`${ApiRoute.Quest}/${id}${ApiRoute.Booking}`, bookingData);
    } catch (error) {
      dispatch(
        setError(
          error instanceof Error ? error.message : 'Failed to send booking data'
        )
      );
    } finally {
      dispatch(setDataLoading(false));
    }
  }
);

const deleteBookingAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: Store;
    extra: AxiosInstance;
  }
>('booking/deleteBookingAction', async (id, { dispatch, extra: api }) => {
  try {
    dispatch(setDataLoading(false));
    await api.delete(`${ApiRoute.Reservation}/${id}`);
    await dispatch(fetchReservationAction());
  } catch (error) {
    dispatch(
      setError(
        error instanceof Error ? error.message : 'Failed to delete booking'
      )
    );
  } finally {
    dispatch(setDataLoading(false));
  }
});

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

export {
  fetchQuestsAction,
  checkAuthAction,
  logoutAction,
  loginAction,
  fetchQuestByIdAction,
  fetchBookingByIdAction,
  fetchReservationAction,
  bookingSendAction,
  deleteBookingAction,
};
