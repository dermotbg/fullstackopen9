import diaries from '../../data/entries';

import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry} from '../types';

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  // still must map out sensitive areas as typescript will still let them through if omitted from type
  return diaries.map(({ id, date, weather, visibility }) => ({
    id, 
    date,
    weather,
    visibility
  }));
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find((f) => f.id === id);
  return entry;
};

const addDiary = (entry: NewDiaryEntry) => {
  const newDiary: DiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  };
  diaries.push(newDiary);
  return newDiary;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addDiary,
  findById
};