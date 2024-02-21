import BaseEntry from "./BaseEntry";
import { EntryProps } from "../types";

export type Discharge = {
  date: string;
  criteria: string;
};


const HospitalEntry = ({ entry, diagnoses }: EntryProps) => {
 return(
  <BaseEntry entry={entry} diagnoses={diagnoses} />
 );
};

export default HospitalEntry;