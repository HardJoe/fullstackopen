export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export type Gender = 'male' | 'female' | 'other';

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;
