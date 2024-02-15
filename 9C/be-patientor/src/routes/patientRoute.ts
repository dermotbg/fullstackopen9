import express from 'express';

import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, resp) => {
  resp.send(patientService.getPatients());
});

export default router;