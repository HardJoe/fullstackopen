const calculateBmi = (h: number, w: number): string => {
  const bmi: number = (w / h ** 2) * 10000;

  if (bmi < 18.5) {
    return 'underweight';
  } else if (bmi < 25) {
    return 'normal (healthy weight)';
  } else if (bmi < 30) {
    return 'overweight';
  }
  return 'obesity';
};

console.log(calculateBmi(180, 74));
