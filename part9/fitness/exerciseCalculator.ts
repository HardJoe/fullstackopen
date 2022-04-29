interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
  const periodLength: number = hours.length;
  const trainingHours: Array<number> = hours.filter((h) => h > 0);
  const trainingDays: number = trainingHours.length;
  const totalHours = trainingHours.reduce((a, b) => a + b, 0);
  const success: boolean = target > totalHours;
  const targetMet: Array<number> = hours.filter((h) => h > target);
  let rating: number;
  let ratingDescription: string;
  if (targetMet.length <= 2) {
    rating = 1;
    ratingDescription = "You should get those legs workin'.";
  } else if (totalHours - target <= 5) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better.';
  } else {
    rating = 3;
    ratingDescription = "You're doing really good. Keep it up!";
  }
  const average: number = totalHours / periodLength;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
