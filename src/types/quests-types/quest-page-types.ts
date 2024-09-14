import { Quest } from './quests-types';

export interface QuestPage extends Quest {
  description: string;
  coverImg: string;
  coverImgWebp: string;
}
export { Quest };

