import BaseEntry from "./BaseEntry";
import { HealthCheckEntryProps } from "../types";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { Typography } from "@mui/material";

const HealthCheckEntry = ({ entry, diagnoses }: HealthCheckEntryProps) => {


  const RatingIcon = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return <HealthAndSafetyIcon color={'success'} />;
      case 1:
        return <HealthAndSafetyIcon color={'primary'} />;
      case 2:
        return <HealthAndSafetyIcon color={'warning'} />;
      case 3:
        return <HealthAndSafetyIcon color={'error'} />;
      default:
        return <p>Error: HealthCheck Rating not found</p>;
    }
  };

 return(
  <>
      <Typography variant="body1" pb={1} pt={3} pl={3}>
        Type of Visit: <MedicalInformationIcon/>
      </Typography> 
      <Typography variant="body1" pb={1} pl={3}>
        Status: <RatingIcon/>
      </Typography> 
      <BaseEntry entry={entry} diagnoses={diagnoses} />
  </>
 );
};

export default HealthCheckEntry;