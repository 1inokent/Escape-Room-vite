import { generatePath, Link } from 'react-router-dom';
import { AppRoute, QUEST_LEVELS } from '../../const';
import { Quest } from '../../types/quests-types/quests-types';

type QuestsCardProps = {
  quest: Quest;
}

function QuestsCard({quest}: QuestsCardProps):JSX.Element {
  const {
    id,
    title,
    peopleMinMax,
    level,
    previewImg,
    previewImgWebp
  } = quest;

  const translatedLevel = QUEST_LEVELS.find((questLevel) => questLevel.id === level)?.title || level;

  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source type="image/webp" srcSet={previewImgWebp} />
          <img src={previewImg}
            srcSet={`${previewImg} 2x`}
            width="344" height="232"
            alt={title}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link
            className="quest-card__link"
            to={generatePath(AppRoute.Quest, {id})}
          >
            {title}
          </Link>
        </div>
        <ul className="tags quest-card__tags">
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
      </div>
    </div>
  );
}

export default QuestsCard;
