import { useEffect, useState } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../components/hook';
import { deleteBookingAction, fetchReservationAction } from '../../store/api-actions';
import { translateQuestAttributes } from '../../utils';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useNavigate } from 'react-router-dom';

function MyQuestPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const reservations = useAppSelector((state) => state.reservedsQuests);
  const isAutorized = useAppSelector((state) => state.authorizationStatus);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isAutorized !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Main);
    }
  }, [isAutorized, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchReservationAction());
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage('Ошибка при загрузке данных. Попробуйте перезагрузить страницу.');
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDeleteBooking = (id: string) => {
    dispatch(deleteBookingAction(id));
  };

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"
            />
            <img
              src="img/content/maniac/maniac-bg-size-m.jpg"
              srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x"
              width="1366"
              height="1959"
              alt=""
            />
          </picture>
        </div>
        <div className="container">

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="page-content__title-wrapper">
            <h1 className="title title--size-m page-content__title">Мои бронирования</h1>
          </div>

          <div className="cards-grid">
            {
              reservations.map((reservation) => {
                const {
                  translatedLevel,
                  translateDay
                } = translateQuestAttributes(reservation.quest.level, reservation.date);

                return (
                  <div key={reservation.id} className="quest-card">
                    <div className="quest-card__img">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={`${reservation.quest.previewImgWebp}, ${reservation.quest.previewImgWebp} 2x`}
                        />
                        <img
                          src={reservation.quest.previewImg}
                          srcSet={`${reservation.quest.previewImg} 2x`}
                          width="344"
                          height="232"
                          alt={reservation.quest.title}
                        />
                      </picture>
                    </div>
                    <div className="quest-card__content">
                      <div className="quest-card__info-wrapper">
                        <a className="quest-card__link" href={`quest/${reservation.quest.id}`}>{reservation.quest.title}</a>
                        <span className="quest-card__info">
                      [{translateDay},&nbsp;{reservation.time}. {reservation.location.address}]
                        </span>
                      </div>
                      <ul className="tags quest-card__tags">
                        <li className="tags__item">
                          <svg width="11" height="14" aria-hidden="true">
                            <use xlinkHref="#icon-person"></use>
                          </svg>{reservation.peopleCount}&nbsp;чел
                        </li>
                        <li className="tags__item">
                          <svg width="14" height="14" aria-hidden="true">
                            <use xlinkHref="#icon-level"></use>
                          </svg>{translatedLevel}
                        </li>
                      </ul>
                      <button
                        className="btn btn--accent btn--secondary quest-card__btn"
                        type="button"
                        onClick={() => handleDeleteBooking(reservation.id)}
                      >
                        Отменить
                      </button>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default MyQuestPage;
