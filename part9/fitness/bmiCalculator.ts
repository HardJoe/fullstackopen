interface Data {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): Data => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  }
  throw new Error('Provided values were not numbers!');
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = (weight / height ** 2) * 10000;

  if (bmi < 18.5) {
    return 'underweight';
  } else if (bmi < 25) {
    return 'normal (healthy weight)';
  } else if (bmi < 30) {
    return 'overweight';
  }
  return 'obesity';
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export { calculateBmi };
