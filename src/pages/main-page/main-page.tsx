import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
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
      <Header />
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

      <Footer />
    </div>
  );
}

export default MainPage;
