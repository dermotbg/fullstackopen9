/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, resp) => {
  resp.send(diaryService.getEntries());
});

router.get('/:id', (req, resp) => {
  const diary = diaryService.findById(Number(req.params.id));
  diary ? resp.send(diary) : resp.sendStatus(404);
});

router.post('/', (req, resp) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body);
    const newDiary = diaryService.addDiary(newDiaryEntry);
    resp.json(newDiary);
  }
  catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error ' + error.message;
    }
    resp.status(400).send(errorMessage);
  } 
});

export default router;