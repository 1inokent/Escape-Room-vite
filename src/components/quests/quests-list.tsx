import { Quests } from '../../types/quests-types/quests-types';
import QuestsCard from './quests-card';

type QuestsListProps = {
  quests: Quests;
}

function QuestsList({quests}: QuestsListProps):JSX.Element {
  return (
    <div className="cards-grid">
      {
        quests.map((quest) =>
          (
            <QuestsCard quest={quest} key={quest.id} />
          ))
      }
    </div>
  );
}

export default QuestsList;
