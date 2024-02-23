import { Box, Button, List, ListItem, TextField, Typography } from "@mui/material";
import { BaseEntryExId } from "../../../types";
import { useState } from "react";
import { dateInputProps } from "../utils";

export interface BaseEntryFields extends BaseEntryExId {
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  setDiagnosisCodes: React.Dispatch<React.SetStateAction<string[]>>;
}

//needs to push diag code to array 

const BaseEntryFields = ({formProps}: {formProps: BaseEntryFields}) => {

  const [diagCode, setDiagCode] = useState('');

  const addCode = () => {
    const codes = formProps.diagnosisCodes as string[];
    formProps.setDiagnosisCodes(codes.concat(diagCode));
    setDiagCode('');
  };

  return (
    <>
      <Box display={'flex'} flexDirection={'row'} mb={-1} pt={2}>
        <label htmlFor="date">
            <Typography sx={{ color: '#666666' }} >Date:</Typography>
        </label>
        <input style={dateInputProps} id="date-field" value={formProps.date} type="date" name="date" onChange={(e) => formProps.setDate(e.target.value)}/>
      </Box>
      <TextField id="description-field" label="Description" variant="standard" fullWidth={true} margin="normal" size='small' value={formProps.description} onChange={(e) => formProps.setDescription(e.target.value)}/>
        {/* <TextField id="date-field" label="Date" variant="standard" fullWidth={true} margin="normal" size='small' value={formProps.date} onChange={(e) => formProps.setDate(e.target.value)}/> */}
        <TextField id="specialist-field" label="Specialist" variant="standard" fullWidth={true} margin="normal" size='small' value={formProps.specialist} onChange={(e) => formProps.setSpecialist(e.target.value)}/>
        <TextField id="diagnoses-codes-field" label="Diagnoses Codes" variant="standard" fullWidth={true} margin="normal" size='small' value={diagCode} onChange={(e) => setDiagCode(e.target.value)}/>
        {(formProps.diagnosisCodes || []).length > 0 
            ? 
          <List>
            {formProps.diagnosisCodes?.map((c) => {
              return <ListItem key={c}> <Typography>{c}</Typography></ListItem>;
            })}
          </List>
          : null
          }
        <Button type="button" onClick={addCode}>Add Diagnosis Code</Button>
    </>
  );
};

export default BaseEntryFields;