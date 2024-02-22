import { Diagnosis, Gender, HealthCheckRating, NewEntry, NewPatientEntry, VisitType } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)){
    throw new Error(`Incorrect or missing name: "${name}"`);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)){
    throw new Error(`Incorrect or missing DOB: "${dateOfBirth}"`);
  }
  return dateOfBirth;
};

const isSsn = (ssn: string): boolean => {
  const regex = /^\d{6}-[a-zA-Z0-9]{3,6}$/;
  return regex.test(ssn);
};

const parseSsn = (ssn: unknown): string => {
  if(!ssn || !isString(ssn) || !isSsn(ssn)){
    throw new Error(`Incorrect or missing SSN: "${ssn}"`);
  }
  return ssn;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: "${gender}"`);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: "${occupation}"`);
  }
  return occupation;
};

export const isVisitType = (type: string): type is VisitType => {
  return Object.values(VisitType).map(v => v.toString()).includes(type);
};

export const parseVisitType = (visit: unknown): VisitType => {
  if(!visit || !isString(visit) || !isVisitType(visit)) {
    throw new Error(`Incorrect or missing visit type: "${visit}"`);
  } 
  return visit;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if(!object || typeof object !== 'object'){
    throw new Error('Incorrect or missing data');
  }
  
  if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object){
    const newPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields missing');
};


const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)){
    throw new Error(`Incorrect or missing specialist: "${specialist}"`);
  }
  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)){
    throw new Error(`Incorrect or missing description: "${description}"`);
  }
  return description;
};

const parseEmployer = (employer: unknown): string => {
  if (!employer || !isString(employer)){
    throw new Error(`Incorrect or missing employer: "${employer}"`);
  }
  return employer;
};

const parseDateOfVisit = (dateOfVisit: unknown): string => {
  if (!dateOfVisit || !isString(dateOfVisit) || !isDate(dateOfVisit)){
    throw new Error(`Incorrect or missing date of visit: "${dateOfVisit}"`);
  }
  return dateOfVisit;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const isNumber = (param: unknown): param is number => {
  return typeof param === 'number' || param instanceof Number;
};

export const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(r => r.toString()).includes(rating.toString());
};

export const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if((!rating && rating !== 0 ) || !isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing health check rating: "${rating}"`);
  } 
  return rating;
};

const parseSickLeave = (sickLeave: unknown): string => {
  if (!sickLeave || !isString(sickLeave) || !isDate(sickLeave)){
    throw new Error(`Incorrect or missing dates of sick leave: "${sickLeave}"`);
  }
  return sickLeave;
};

const isObject = (param: unknown): param is object => {
  return typeof param === 'object' || param instanceof Object;
};

const parseDateOfDischarge = (dateOfDischarge: unknown): string => {
  if (!dateOfDischarge || !isString(dateOfDischarge) || !isDate(dateOfDischarge)){
    throw new Error(`Incorrect or missing date of discharge: "${dateOfDischarge}" `);
  }
  return dateOfDischarge;
};

const parseDischargeCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)){
    throw new Error(`Incorrect or missing discharge criteria "${criteria}"`);
  }
  return criteria;
};

const toNewEntry = (object: unknown): NewEntry => {
  if(!object || typeof object !== 'object' || !(object instanceof Object)){
    throw new Error('Incorrect or missing data');
  }
  if('date' in object && 'description' in object && 'specialist' in object && 'diagnosisCodes' in object && 'type' in object){
    const baseEntry = {
      date: parseDateOfVisit(object.date),
      description: parseDescription(object.description),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    };
    switch(object.type) {
      case 'HealthCheck':
        if('healthCheckRating' in object){
          const healthCheckEntry :NewEntry = {
            ...baseEntry,
            type: VisitType.HealthCheck,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
          };
          return healthCheckEntry;
        }
        break;
      case 'OccupationalHealthcare':
        if('employerName' in object && 'sickLeave' in object && isObject(object.sickLeave) && 'startDate' in object.sickLeave && 'endDate' in object.sickLeave){
          const occupationalHealthcareEntry: NewEntry = {
            ...baseEntry,
            type: VisitType.OccupationalHealthcare,
            employerName: parseEmployer(object.employerName),
            sickLeave: {
              startDate: parseSickLeave(object.sickLeave.startDate),
              endDate: parseSickLeave(object.sickLeave.endDate)
            }
          };
          return occupationalHealthcareEntry;
      }
      break;
      case 'Hospital':
        if('discharge' in object && isObject(object.discharge) && 'date' in object.discharge && 'criteria' in object.discharge){
          const hospitalEntry: NewEntry = {
            ...baseEntry,
            type: VisitType.Hospital,
            discharge: {
              date: parseDateOfDischarge(object.discharge.date),
              criteria: parseDischargeCriteria(object.discharge.criteria)
            }
          };
          return hospitalEntry;
        }
        break;
      default:
        throw new Error(`Error: Incorrect or missing visit type "${object.type}"`);
      }
    }
  throw new Error('Incorrect or missing details');
};

export default {
  toNewPatientEntry,
  toNewEntry
};