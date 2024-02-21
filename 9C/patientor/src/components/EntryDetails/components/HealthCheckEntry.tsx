import BaseEntry from "./BaseEntry";
import { EntryProps } from "../types";


const HealthCheckEntry = ({ entry, diagnoses }: EntryProps) => {
 return(
  <BaseEntry entry={entry} diagnoses={diagnoses} />
 );
};

export default HealthCheckEntry;