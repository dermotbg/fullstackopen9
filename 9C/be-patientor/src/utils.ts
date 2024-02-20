import { Entry, Gender, NewPatientEntry, VisitType } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)){
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)){
    throw new Error('Incorrect or missing DOB');
  }
  return dateOfBirth;
};

const isSsn = (ssn: string): boolean => {
  const regex = /^\d{6}-[a-zA-Z0-9]{3,6}$/;
  return regex.test(ssn);
};

const parseSsn = (ssn: unknown): string => {
  if(!ssn || !isString(ssn) || !isSsn(ssn)){
    throw new Error('Incorrect or missing SSN.');
  }
  return ssn;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const isVisitType = (type: string): type is VisitType => {
  return Object.values(VisitType).map(v => v.toString()).includes(type);
};

const parseVisitType = (visit: unknown): VisitType => {
  if(!visit || !isString(visit) || !isVisitType(visit)) {
    throw new Error('Incorrect or missing visit type');
  } 
  return visit;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if(!object || typeof object !== 'object'){
    throw new Error('Incorrect or missing data');
  }
  
  if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object 
    && Array.isArray(object.entries) && object.entries.every(entry => 'type' in entry)){
    const newPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: object.entries.map((e: Entry) => {
        return {
          ...e,
          type: parseVisitType(e.type)
        };

      })
    };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields missing');
};


export default toNewPatientEntry;