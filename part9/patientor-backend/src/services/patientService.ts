import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../types';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ ssn: _ssn, ...rest }) => rest);
};

const findById = (id: string): NonSensitivePatient | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    return undefined;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn, ...rest } = patient;
  return rest;
};

const addPatient = (newPatient: NewPatient) => {
  const id = uuidv4();
  const newPatientEntry = { ...newPatient, id };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addPatient,
};
