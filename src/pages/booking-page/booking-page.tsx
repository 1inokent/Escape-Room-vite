import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../components/hook';
import { useEffect } from 'react';
import ErrorMessage from '../../components/error-message/error-message';
import { fetchBookingByIdAction, fetchQuestByIdAction } from '../../store/api-actions';
import { AppRoute } from '../../const';
import { translateQuestAttributes } from '../../utils';
import { Bookings } from '../../types/booking-types/booking-types';
import { QuestPage } from '../../types/quests-types/quest-page-types';
import BookingDate from '../../components/booking/booking-date';
import SpinnerLoader from '../../components/spinner-loader/spinner-loader';

function BookingPage():JSX.Element {
  const dispatch = useAppDispatch();
  const bookingsById = useAppSelector<Bookings | null>((state) => state.reservedsQuest);
  const questPage = useAppSelector<QuestPage | null>((state) => state.questPage);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          await dispatch(fetchQuestByIdAction(id));
          await dispatch(fetchBookingByIdAction(id));
        } catch (error) {
          <ErrorMessage />;
        }
      }
    };

    fetchData();
  }, [dispatch, id]);

  if (!bookingsById || !questPage) {
    return <SpinnerLoader />;
  }

  if (!bookingsById) {
    return <div>Can`t find quest page <Link to={AppRoute.Main}>Go back main page</Link></div>;
  }

  const { translatedType } = translateQuestAttributes(questPage.type);

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet={questPage.coverImgWebp}
            />
            <img
              src={questPage.coverImg}
              srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x"
              width="1366"
              height="1959"
              alt={questPage.title}
            />
          </picture>
        </div>
        <div className="container container--size-s">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle subtitle--size-l page-content__subtitle">Бронирование квеста
            </h1>
            <p className="title title--size-m title--uppercase page-content__title">{translatedType}</p>
          </div>
          <div className="page-content__item">
            <div className="booking-map">
              <div className="map">
                <div className="map__container"></div>
              </div>
              <p className="booking-map__address">Вы&nbsp;выбрали: наб. реки Карповки&nbsp;5, лит&nbsp;П, м. Петроградская</p>
            </div>
          </div>

          <form className="booking-form" action="https://echo.htmlacademy.ru/" method="post">
            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Выбор даты и времени</legend>
              {
                bookingsById.map((booking) => (
                  <div key={booking.id}>
                    <BookingDate booking={booking} />
                  </div>
                ))
              }
            </fieldset>

            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Контактная информация</legend>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="name">Ваше имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Имя"
                  required
                  pattern="[А-Яа-яЁёA-Za-z'- ]{1,}"
                />
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
                <input
                  type="tel"
                  id="tel"
                  name="tel"
                  placeholder="Телефон"
                  required
                  pattern="[0-9]{10,}"
                />
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="person">Количество участников</label>
                <input
                  type="number"
                  id="person"
                  name="person"
                  placeholder="Количество участников"
                  required
                />
              </div>
              <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
                <input
                  type="checkbox"
                  id="children"
                  name="children"
                  checked
                />
                <span className="custom-checkbox__icon">
                  <svg width="20" height="17" aria-hidden="true">
                    <use xlinkHref="#icon-tick"></use>
                  </svg>
                </span><span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
              </label>
            </fieldset>

            <button className="btn btn--accent btn--cta booking-form__submit" type="submit">Забронировать</button>
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
