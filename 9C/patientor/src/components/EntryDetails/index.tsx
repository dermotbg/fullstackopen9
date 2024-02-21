import { Paper } from "@mui/material";
import HealthCheckEntry from "./components/HealthCheckEntry";
import HospitalEntry from "./components/HospitalEntry";
import OccupationEntry from "./components/OccupationEntry";
import { EntryProps } from "./types";

const EntryDetails = ({ entry, diagnoses }: EntryProps) => {
  switch (entry.type) {
    case 'Hospital':
      return (
        <Paper variant="outlined"> 
          <HospitalEntry entry={entry} diagnoses={diagnoses} />
        </Paper>
      );
    case 'OccupationalHealthcare':
      return (
        <Paper variant="outlined"> 
          <OccupationEntry entry={entry} diagnoses={diagnoses}  />
        </Paper>
      );
    case 'HealthCheck':
      return (
        <Paper variant="outlined"> 
          <HealthCheckEntry entry={entry} diagnoses={diagnoses}  />
        </Paper>
      );
    default:
      return null;
  }
};

export default EntryDetails;