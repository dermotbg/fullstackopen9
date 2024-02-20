import express from 'express';

import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, resp) => {
  resp.send(patientService.getPatients());
});

router.get('/:id', (req, resp) => {
  resp.send(patientService.getPatientById(req.params.id));
});

router.post('/', (req, resp) => {
  try{
    const newEntry = toNewPatientEntry(req.body);
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

export default router;