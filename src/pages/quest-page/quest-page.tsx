import { generatePath, useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../components/hook';
import { useEffect, useState } from 'react';
import { fetchQuestByIdAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../const';
import { translateQuestAttributes } from '../../utils';
import SpinnerLoader from '../../components/spinner-loader/spinner-loader';

function QuestPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const questPage = useAppSelector((state) => state.questPage);
  const isAuthorizedStatus = useAppSelector((state) => state.authorizationStatus);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id: paramId } = useParams();
  const id: string | null = paramId ?? null;

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchData = async () => {
      if (id) {
        try {
          await dispatch(fetchQuestByIdAction(id));
          setErrorMessage(null);
        } catch (error) {
          setErrorMessage('Ошибка при загрузке данных. Попробуйте перезагрузить страницу.');
        }
      }
    };
    fetchData();
  }, [dispatch, id]);

  if (!questPage) {
    return <SpinnerLoader />;
  }

  const {
    title,
    level,
    type,
    peopleMinMax,
    description,
    coverImg,
    coverImgWebp,
    previewImg,
  } = questPage;

  const { translatedLevel, translatedType } = translateQuestAttributes(level, type);

  const handleBookingClick = () => {
    const bookingPath = generatePath(AppRoute.Booking, {id});
    if (isAuthorizedStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login, { state: { from: bookingPath } });
    } else {
      navigate(bookingPath);
    }
  };

  return (
    <div className='wrapper'>
      <Header />
      <main className="decorated-page quest-page">
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet={coverImgWebp}
            />
            <img
              src={previewImg}
              srcSet={coverImg}
              alt={title}
            />
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="quest-page__content">
            <h1 className="title title--size-l title--uppercase quest-page__title">{title}</h1>
            <p className="subtitle quest-page__subtitle"><span className="visually-hidden">Жанр:</span>{translatedType}
            </p>
            <ul className="tags tags--size-l quest-page__tags">
              <li className="tags__item">
                <svg width="11" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-person"></use>
                </svg>{peopleMinMax[0]}&ndash;{peopleMinMax[1]}&nbsp;чел
              </li>
              <li className="tags__item">
                <svg width="14" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-level"></use>
                </svg>{translatedLevel}
              </li>
            </ul>
            <p className="quest-page__description">{description}</p>
            <button
              type='button'
              className="btn btn--accent btn--cta quest-page__btn"
              onClick={handleBookingClick}
            >
                Забронировать
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default QuestPage;
