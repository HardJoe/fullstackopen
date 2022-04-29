import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  try {
    const heightNum: number = Number(height);
    const weightNum: number = Number(weight);
    if (isNaN(heightNum) || isNaN(weightNum)) {
      throw new Error();
    }
    const bmi: String = calculateBmi(heightNum, weightNum);
    res.json({
      weight: weightNum,
      height: heightNum,
      bmi,
    });
  } catch {
    res.json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
