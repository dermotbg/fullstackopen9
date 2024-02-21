import BaseEntry from "./BaseEntry";
import { OccupationalHealthcareProps } from "../types";
import ConstructionIcon from '@mui/icons-material/Construction';
import { Typography } from "@mui/material";


const OccupationEntry = ({ entry, diagnoses }: OccupationalHealthcareProps) => {
 return(
  <>
    <Typography variant="body1" pb={1} pt={3} pl={3}>
        Type of Visit: <ConstructionIcon />
    </Typography> 
    <BaseEntry entry={entry} diagnoses={diagnoses} />
    <Typography variant="body1" pb={1} pt={3} pl={3}>
        Employer: {entry.employerName}
    </Typography>
    {entry.sickLeave?.startDate 
    ?
      <>
        <Typography variant="body1" pb={1} pl={3}>
            Sick Leave start: {entry.sickLeave?.startDate}
        </Typography> 
        <Typography variant="body1" pb={1} pl={3}>
            Sick Leave end: {entry.sickLeave?.endDate}
        </Typography> 
      </>
    : null}
  </>
 );
};

export default OccupationEntry;