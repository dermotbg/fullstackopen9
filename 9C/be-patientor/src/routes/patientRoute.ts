import express from 'express';

import patientService from '../services/patientService';
import toEntries from '../utils';

const router = express.Router();

router.get('/', (_req, resp) => {
  resp.send(patientService.getPatients());
});

router.get('/:id', (req, resp) => {
  const patient = patientService.getPatientById(req.params.id);
  if(patient){
    resp.send(patient);
  } else {
    resp.sendStatus(404);
  }
});

router.post('/', (req, resp) => {
  try{
    const newEntry = toEntries.toNewPatientEntry(req.body);
    const newPatient = patientService.addPatient(newEntry);
    resp.json(newPatient);
  }
  catch(error: unknown) {
    let errorMessage = 'Something went wrong.';
    if(error instanceof Error){
      errorMessage += ' Error ' + error.message;
    }
    resp.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, resp) => {
  try {
    const newEntry = toEntries.toNewEntry(req.body);
    const updatedEntry = patientService.addEntry(newEntry, req.params.id);
    resp.json(updatedEntry);
  }
  catch(error: unknown) {
    let errorMessage = 'Something went wrong.';
    if(error instanceof Error){
      errorMessage += ' Error: ' + error.message;
    }
    resp.status(400).send(errorMessage);
  }
});

export default router;