import { QUEST_LEVELS, QUEST_TYPES } from './const';

function translateQuestAttributes(level?: string, type?: string, day?: string) {
  const translatedLevel =
    QUEST_LEVELS.find((questLevel) => questLevel.id === level)?.title || level;
  const translatedType =
    QUEST_TYPES.find((questType) => questType.id === type)?.title || type;

  const translateDay = day === 'today' ? 'сегодня' : 'завтра';

  return {
    translatedLevel,
    translatedType,
    translateDay,
  };
}

export { translateQuestAttributes };
