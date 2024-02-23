import { Box, TextField, Typography } from "@mui/material";
import { dateInputProps } from "../utils";

interface HospitalFieldsProps {
  dischargeDate: string;
  setDischargeDate: React.Dispatch<React.SetStateAction<string>>;
  dischargeCriteria: string;
  setDischargeCriteria: React.Dispatch<React.SetStateAction<string>>
}

const HospitalFields = (props: HospitalFieldsProps) => {
  return(
    <>
      <Box display={'flex'} flexDirection={'row'}  pt={1} pb={1}>
        <label htmlFor="start">
            <Typography sx={{ color: '#666666' }}>Discharge Date:</Typography>
        </label>
        <input style={dateInputProps} id="discharge" value={props.dischargeDate} type="date" name="dischargeDate" onChange={(e) => props.setDischargeDate(e.target.value)}/>
      </Box>
      <TextField 
        id="criteria-field" 
        label="Discharge Criteria" 
        variant="standard" 
        fullWidth={true} 
        size='small' 
        value={props.dischargeCriteria} 
        onChange={(e) => props.setDischargeCriteria(e.target.value)}
      />
    </>
  );
};

export default HospitalFields;