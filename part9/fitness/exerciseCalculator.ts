interface Data {
  target: number;
  hours: Array<number>;
}

const parseArguments = (args: Array<string>): Data => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (isNaN(Number(args[2]))) {
    throw new Error('Provided target was not a number!');
  }

  const target = Number(args[2]);
  const hours = [];

  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided hours were not numbers!');
    }
    hours.push(Number(args[i]));
  }

  return { target, hours };
};

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
  const targetMet: number = hours.filter((h) => h > target).length;
  let rating: number;
  let ratingDescription: string;
  if (targetMet / periodLength <= 0.33) {
    rating = 1;
    ratingDescription = "You should get those legs workin'.";
  } else if (targetMet / periodLength <= 0.66) {
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

try {
  const { hours, target } = parseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export { calculateExercises };
