import express from 'express'
import { calculateBmi } from './bmiCalculator'
const app = express()

app.get('/hello', (_req, resp) => {
    resp.send('Hello Full Stack!');
});

app.get('/bmi', (req, resp) => {
    const height: number = Number(req.query.height)
    const weight: number = Number(req.query.weight)

    if(!height || !weight) resp.json({ error: 'malformatted parameters' }) 
    
    resp.json({
        weight: weight,
        height: height, 
        bmi: calculateBmi(height, weight)
    });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});