import { QUEST_LEVELS, QUEST_TYPES } from './const';

function translateQuestAttributes(level?: string, type?: string) {
  const translatedLevel =
    QUEST_LEVELS.find((questLevel) => questLevel.id === level)?.title || level;
  const translatedType =
    QUEST_TYPES.find((questType) => questType.id === type)?.title || type;

  return {
    translatedLevel,
    translatedType,
  };
}

export { translateQuestAttributes };
