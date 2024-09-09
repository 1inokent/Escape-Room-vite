import { useAppSelector } from '../../components/hook';
import QuestsList from '../../components/quests/quests-list';
import SortingOptions from '../../components/sorting-options/sorting-options';
import { QUEST_LEVELS, QUEST_TYPES, } from '../../const';

function MainPage(): JSX.Element {
  const quests = useAppSelector((state) => state.quests);
  const selectedOptionLevel = useAppSelector((state) => state.sortingOptionLevel);
  const selectedOptionTypes = useAppSelector((state) => state.sortingOptionTypes);

  const filteredQuests = quests.filter((quest) => {
    const matchesType = selectedOptionTypes === QUEST_TYPES[0].id || quest.type === selectedOptionTypes;
    const matchesLevel = selectedOptionLevel === QUEST_LEVELS[0].id || quest.level === selectedOptionLevel;
    return matchesLevel && matchesType;
  });

  return (
    <div className="wrapper">
      <main className="page-content">
        <div className="container">

          <div className="page-content__title-wrapper">
            <h1 className="subtitle page-content__subtitle">квесты в Санкт-Петербурге
            </h1>
            <h2 className="title title--size-m page-content__title">Выберите тематику</h2>
          </div>

          <SortingOptions />

          <h2 className="title visually-hidden">Выберите квест</h2>

          <QuestsList quests={filteredQuests} />
        </div>
      </main>

      <footer className="footer">
        <div className="container container--size-l">
          <div className="socials">
            <ul className="socials__list">
              <li className="socials__item">
                <a className="socials__link" href="#" aria-label="Skype" target="_blank" rel="nofollow noopener noreferrer">
                  <svg className="socials__icon socials__icon--default" width="28" height="28" aria-hidden="true">
                    <use xlinkHref="#icon-skype-default"></use>
                  </svg>
                  <svg className="socials__icon socials__icon--interactive" width="28" height="28" aria-hidden="true">
                    <use xlinkHref="#icon-skype-interactive"></use>
                  </svg>
                </a>
              </li>
              <li className="socials__item">
                <a className="socials__link" href="#" aria-label="ВКонтакте" target="_blank" rel="nofollow noopener noreferrer">
                  <svg className="socials__icon socials__icon--default" width="28" height="28" aria-hidden="true">
                    <use xlinkHref="#icon-vk-default"></use>
                  </svg>
                  <svg className="socials__icon socials__icon--interactive" width="28" height="28" aria-hidden="true">
                    <use xlinkHref="#icon-vk-interactive"></use>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;
