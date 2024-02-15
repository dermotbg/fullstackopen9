import express from 'express';

import diagnosesService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, resp) => {
  resp.send(diagnosesService.getDiagnoses());
});

export default router;