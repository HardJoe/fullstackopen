import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  try {
    const heightNum = Number(height);
    const weightNum = Number(weight);
    if (isNaN(heightNum) || isNaN(weightNum)) {
      throw new Error('malformatted parameters');
    }
    const bmi = calculateBmi(heightNum, weightNum);
    res.json({
      weight: weightNum,
      height: heightNum,
      bmi,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      return;
    }
  }
});

interface ExerciseRequest {
  dailyExercises: unknown;
  target: unknown;
}

app.post('/exercise', (req, res) => {
  try {
    const { dailyExercises, target } = req.body as ExerciseRequest;
    if (!(dailyExercises && target)) {
      throw new Error('parameters missing');
    }
    if (!Array.isArray(dailyExercises)) {
      throw new Error('malformatted parameters');
    }
    const dailyExercisesNum = dailyExercises.map(Number);
    const targetNum = Number(target);
    if (dailyExercisesNum.includes(NaN) || isNaN(targetNum)) {
      throw new Error('malformatted parameters');
    }
    res.json(calculateExercises(dailyExercisesNum, targetNum));
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      return;
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
