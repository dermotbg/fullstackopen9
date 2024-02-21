export interface BaseEntry {
  id: string;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>
}

//HealthCheckEntry
export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRish' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}
export interface HealthCheckEntry extends BaseEntry {
  type: VisitType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

// OccupationalHealthcareEntry
export type sickLeave = {
  startDate: string;
  endDate: string;
};

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: VisitType.OccupationalHealthcare;
  employerName: string;
  sickLeave?: sickLeave;
}

//HospitalEntry
export type Discharge = {
  date: string;
  criteria: string;
};

export interface HospitalEntry extends BaseEntry {
  type: VisitType.Hospital;
  discharge: Discharge;
}

export type Entry = | HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;


export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export enum VisitType {
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
  HealthCheck = 'HealthCheck'
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>;
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<Patient, 'id' | 'entries'>;