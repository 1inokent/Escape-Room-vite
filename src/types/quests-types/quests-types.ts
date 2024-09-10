import { QUEST_LEVELS, QUEST_TYPES } from '../../const';

export type Quest = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: (typeof QUEST_LEVELS)[number]['id'];
  type: (typeof QUEST_TYPES)[number]['id'];
  peopleMinMax: [number, number];
};

export type Quests = Quest[];
