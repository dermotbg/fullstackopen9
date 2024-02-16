import patients from '../../data/patients';

import { NewPatientEntry, NonSensitivePatient, Patient } from '../types';

import { v1 as uuid } from 'uuid';

const id: string = uuid();

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry) => {
  const newPatient: Patient = {
    id: id,
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient
};