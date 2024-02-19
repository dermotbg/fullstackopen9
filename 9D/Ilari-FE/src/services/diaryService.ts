import axios from 'axios';

import { DiaryEntry, NewDiaryEntry } from '../types';

const baseurl = 'http://localhost:3000/api/diaries'

export const getAllEntries = () => {
  return axios.get<DiaryEntry[]>(baseurl).then(response => response.data)
}

export const createEntry = (diaryObject: NewDiaryEntry) => {
  return axios.post<DiaryEntry>(baseurl, diaryObject).then(response => response.data)
}