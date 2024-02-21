import BaseEntry from "./BaseEntry";
import { EntryProps } from "../types";


const OccupationEntry = ({ entry, diagnoses }: EntryProps) => {
 return(
  <BaseEntry entry={entry} diagnoses={diagnoses} />
 );
};

export default OccupationEntry;