import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../components/hook';
import BookingDate from '../../components/booking/booking-date';
import SpinnerLoader from '../../components/spinner-loader/spinner-loader';
import Map from '../../components/map/map';

import { fetchBookingByIdAction } from '../../store/api-actions';

import { Bookings } from '../../types/booking-types/booking-types';
import { QuestPage } from '../../types/quests-types/quest-page-types';
import BookingForm from '../../components/booking/booking-form';

function BookingPage():JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const bookingsById = useAppSelector<Bookings | null>((state) => state.reservedsQuest);
  const questPage = useAppSelector<QuestPage | null>((state) => state.questPage);
  const { id } = useParams();

  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          await dispatch(fetchBookingByIdAction(id));
        } catch (error) {
          navigate('404');
        }
      }
    };

    fetchData();
  }, [dispatch, id, navigate]);

  if (!bookingsById || !questPage) {
    return <SpinnerLoader />;
  }

  const selectedPlace = bookingsById.find((booking) => booking.id === selectedPlaceId) || bookingsById[0];

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet={`${questPage.coverImgWebp}`}
            />
            <img
              src={questPage.previewImg}
              srcSet={questPage.coverImg}
              alt={questPage.title}
            />
          </picture>
        </div>
        <div className="container container--size-s">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle subtitle--size-l page-content__subtitle">Бронирование квеста
            </h1>
            <p className="title title--size-m title--uppercase page-content__title">{questPage.title}</p>
          </div>

          <div className="page-content__item">
            <div className="booking-map">
              <div className="map">
                <Map
                  availableQuests={bookingsById}
                  selectedPlaceId={selectedPlace.id || ''}
                  onPlaceSelect={setSelectedPlaceId}
                />
              </div>
              <p className="booking-map__address">Вы&nbsp;выбрали: {selectedPlace.location.address}</p>
            </div>
          </div>

          <form className="booking-form" action="https://echo.htmlacademy.ru/" method="post">
            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Выбор даты и времени</legend>
              <BookingDate booking={selectedPlace} />
            </fieldset>

            <BookingForm quest={questPage} />

            <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
              <input
                type="checkbox"
                id="id-order-agreement"
                name="user-agreement"
                required
              />
              <span className="custom-checkbox__icon">
                <svg width="20" height="17" aria-hidden="true">
                  <use xlinkHref="#icon-tick"></use>
                </svg>
              </span>
              <span className="custom-checkbox__label">Я&nbsp;согласен с
                <a className="link link--active-silver link--underlined" href="#">
                  правилами обработки персональных данных
                </a>&nbsp;и пользовательским соглашением
              </span>
            </label>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default BookingPage;
