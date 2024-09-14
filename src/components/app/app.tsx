import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import QuestPage from '../../pages/quest-page/quest-page';
import BookingPage from '../../pages/booking-page/booking-page';
import MyQuestPage from '../../pages/my-quest-page/my-quest-page';

import { AppRoute, AuthorizationStatus } from '../../const';
import SpinnerLoader from '../spinner-loader/spinner-loader';
import { useAppSelector } from '../hook';
import PrivateRoute from '../private-route/private-route';
import ErrorMessage from '../error-message/error-message';
import NotFoundScreen from '../not-found-screen/NotFoundScreen';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isDataLoading = useAppSelector((state) => state.isDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isDataLoading) {
    return (
      <SpinnerLoader />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main}>
          <Route index element={<MainPage />} />
          <Route path={AppRoute.Quest} element={<QuestPage />} />
          <Route path={AppRoute.Contacts} element={<ContactsPage />} />
          <Route path={AppRoute.Booking} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <BookingPage />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.MyQuests} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <MyQuestPage />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path='*' element={<NotFoundScreen />}/>
          <Route path='/404' element={<ErrorMessage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
