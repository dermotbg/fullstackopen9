import express from 'express';
const app = express();
import cors from 'cors';

app.use(
  express.json(),
  cors()
);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/patients', (_req, res) => {
  console.log('patients requested'),
  res.send('patients');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});