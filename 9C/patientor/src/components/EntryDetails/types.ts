import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types";

export interface EntryProps {
  entry: Entry
  diagnoses: Diagnosis[]
}

export interface HealthCheckEntryProps extends EntryProps {
  entry: HealthCheckEntry
}

export interface HospitalEntryProps extends EntryProps {
  entry: HospitalEntry
}

export interface OccupationalHealthcareProps extends EntryProps {
  entry: OccupationalHealthcareEntry
}
