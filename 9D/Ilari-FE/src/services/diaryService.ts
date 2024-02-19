import axios from 'axios';

import { DiaryEntry } from '../types';

const baseurl = 'http://localhost:3000/api/diaries'

export const getAllEntries = () => {
  return axios.get<DiaryEntry[]>(baseurl).then(response => response.data)
}