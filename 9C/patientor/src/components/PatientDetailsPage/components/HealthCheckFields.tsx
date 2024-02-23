import { TextField } from "@mui/material";

const HealthCheckFields = ({ healthCheckRating, setHealthCheckRating }: {healthCheckRating: number, setHealthCheckRating: React.Dispatch<React.SetStateAction<number>>}) => {

  return(
    <>
      <TextField 
        id="healthCheck-rating-field" 
        label="HealthCheck Rating" 
        variant="standard" 
        fullWidth={true}
        margin="normal" 
        size='small' 
        type="number" 
        value={healthCheckRating} 
        onChange={(e) => setHealthCheckRating(Number(e.target.value))}
      />
    </>
  );
};

export default HealthCheckFields;