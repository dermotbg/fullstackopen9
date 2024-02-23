import { Box, TextField, Typography } from "@mui/material";
import { SickLeave } from "../../../types";
import { ChangeEvent, useState } from "react";
import { dateInputProps } from "../utils";


type occupationalProps = {
  employer: string;
  setEmployer: React.Dispatch<React.SetStateAction<string>>
  sickLeave: SickLeave;
  setSickLeave: React.Dispatch<React.SetStateAction<SickLeave>>
};

const OccupationalHealthcareFields = (props: occupationalProps) => {

  const [min, setMin] = useState('');

  const dateChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'startDate'){
      setMin(e.target.value);
      props.setSickLeave({ startDate: e.target.value, endDate: props.sickLeave.endDate });
    }
    else{
      props.setSickLeave({ startDate: props.sickLeave.startDate, endDate: e.target.value });
    }
  };

  return (
    <>
      <TextField 
        id="employer-field" 
        label="Employer" 
        variant="standard" 
        fullWidth={true} 
        margin="normal" 
        size='small' 
        value={props.employer} 
        onChange={(e) => props.setEmployer(e.target.value)}
      />
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} pt={1} pb={1}>

        <label htmlFor="start">
          <Typography sx={{ color: '#666666' }} >Start date:</Typography>
        </label>
        <input style={dateInputProps} id="start" type="date" name="startDate" onChange={(event) => dateChange(event)}/>

        <label htmlFor="end">
          <Typography sx={{ color: '#666666' }} >End date:</Typography>
        </label>
        <input style={dateInputProps} id="end" type="date" name="endDate" min={min} onChange={(event) => dateChange(event)}/>
        
      </Box>

    </>
  );
};

export default OccupationalHealthcareFields;