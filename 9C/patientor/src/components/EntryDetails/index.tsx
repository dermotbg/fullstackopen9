import HealthCheckEntry from "./components/HealthCheckEntry";
import HospitalEntry from "./components/HospitalEntry";
import OccupationEntry from "./components/OccupationEntry";
import { EntryProps } from "./types";



const EntryDetails = ({ entry, diagnoses }: EntryProps) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationEntry entry={entry} diagnoses={diagnoses}  />;
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses}  />;
    default:
      return null;
  }
};

export default EntryDetails;