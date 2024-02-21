import BaseEntry from "./BaseEntry";
import { HospitalEntryProps } from "../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Typography } from "@mui/material";

export type Discharge = {
  date: string;
  criteria: string;
};


const HospitalEntry = ({ entry, diagnoses }: HospitalEntryProps) => {
 return(
  <>
    <Typography variant="body1" pb={1} pt={3} pl={3}>
        Type of Visit: <LocalHospitalIcon color={'error'} />
    </Typography> 
    <BaseEntry entry={entry} diagnoses={diagnoses} />
    <Typography variant="body1" pb={1} pt={3} pl={3}>
        Discharged: {entry.discharge.date}
    </Typography> 
    <Typography variant="body1" pb={1} pl={3}>
        Result: {entry.discharge.criteria}
    </Typography> 
  </>
 );
};

export default HospitalEntry;