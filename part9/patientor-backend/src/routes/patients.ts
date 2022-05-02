import express from 'express';
import patientService from '../services/patientService';
import { NewPatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getNonSensitiveEntries();
  res.json(patients);
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json('Patient not found');
  }
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body as NewPatient;
  const newPatient = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(newPatient);
});

export default router;
