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

const getPatientById = (id: string): Patient => {
  const foundPatient = patients.find(p => p.id === id);
  if(!foundPatient) throw new Error('Patient not found');
  return foundPatient;
};

const addPatient = (entry: NewPatientEntry) => {
  const newPatient: Patient = {
    id: id,
    entries: [],
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientById,
  addPatient
};