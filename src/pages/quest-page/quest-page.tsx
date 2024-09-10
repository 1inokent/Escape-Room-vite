import { generatePath, Link, useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../components/hook';
import { useEffect } from 'react';
import { fetchQuestByIdAction } from '../../store/api-actions';
import ErrorMessage from '../../components/error-message/error-message';
import { AppRoute } from '../../const';
import { translateQuestAttributes } from '../../utils';

function QuestPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const questPage = useAppSelector((state) => state.questPage);
  const { id: paramId } = useParams();
  const id: string | null = paramId ?? null;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          await dispatch(fetchQuestByIdAction(id));
        } catch (error) {
          <ErrorMessage />;
        }
      }
    };
    fetchData();
  }, [dispatch, id]);

  if (!questPage) {
    return <div>Can`t find quest page <Link to={AppRoute.Main}>Go back main page</Link></div>;
  }

  const {
    title,
    level,
    type,
    peopleMinMax,
    description,
    coverImg,
    coverImgWebp
  } = questPage;

  const { translatedLevel, translatedType } = translateQuestAttributes(level, type);

  return (
    <div className='wrapper'>
      <Header />
      <main className="decorated-page quest-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet={coverImgWebp}
            />
            <img
              src="img/content/maniac/maniac-size-m.jpg"
              srcSet={coverImg}
              width="1366"
              height="768"
              alt=""
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
            <Link
              className="btn btn--accent btn--cta quest-page__btn"
              to={generatePath(AppRoute.Booking, { id })}
            >
                Забронировать
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default QuestPage;
