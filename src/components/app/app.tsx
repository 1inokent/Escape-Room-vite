import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import { useAppSelector } from '../hook';
import SpinnerLoader from '../spinner-loader/spinner-loader';
import ContactsPage from '../../pages/contacts-page/contacts-page';
import QuestPage from '../../pages/quest-page/quest-page';
import PrivateRoute from '../private-route/private-route';
import BookingPage from '../../pages/booking-page/booking-page';
import MyQuestPage from '../../pages/my-quest-page/my-quest-page';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
