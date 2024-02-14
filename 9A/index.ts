import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, resp) => {
    resp.send('Hello Full Stack!');
});

app.get('/bmi', (req, resp) => {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);

    if(!height || !weight) resp.json({ error: 'malformatted parameters' });
    
    resp.json({
        weight: weight,
        height: height, 
        bmi: calculateBmi(height, weight)
    });
});
 
app.post('/exercises', (req, resp) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if(!daily_exercises || !target ) return resp.status(400).json({ error: "parameters missing" });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if(!Array.isArray(daily_exercises) || isNaN(target)) return resp.status(400).json({ error: "malformatted parameters" });

    const result = calculateExercises(daily_exercises as number[], target as number);
    return resp.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});