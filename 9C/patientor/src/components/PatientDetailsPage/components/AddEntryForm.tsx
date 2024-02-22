import { Alert, Button, Paper, TextField, Typography } from "@mui/material";
import { EntryFormValues, Patient, VisitType } from "../../../types";
import { SyntheticEvent, useState } from "react";
import patientService from '../../../services/patients';
import axios from "axios";
import BaseEntryFields from "./BaseEntryFields";

interface FormProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  patientId: string;
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}


const AddEntryForm = ({ visible, setVisible, patientId, patient, setPatient } : FormProps) => {

  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState('');

  const formOpen = visible ? 'block' : 'none';

  const submitEntry = async (event: SyntheticEvent) => {
    event.preventDefault();

    const formData: EntryFormValues = {
      type: VisitType.HealthCheck,
      description: description,
      date: date,
      specialist: specialist,
      diagnosisCodes: diagnosisCodes,
      healthCheckRating: healthCheckRating,
      userId: patientId
    };

    try{
      const entry = await patientService.addEntry(formData);

      // set parent patient state to include new entry
      const updatedPatient: Patient = ({
        ...patient,
        entries: patient.entries.concat(entry)
      });
      setPatient(updatedPatient);
      
      //reset form fields
      setDescription('');
      setDate('');
      setSpecialist('');
      setHealthCheckRating(0);
      setDiagnosisCodes([]);
      
      // close form
      setVisible(!visible);
    }

    catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const cancelForm = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating(0);
    setDiagnosisCodes([]);
    setVisible(!visible);
  };

  const formProps = {
    description,
    setDescription,
    date,
    setDate,
    specialist,
    setSpecialist,
    diagnosisCodes,
    setDiagnosisCodes,
  };



  return (
    <div style={{ display: formOpen }}>
      {error 
        ? <Alert severity="error">{error}</Alert>
        : null
      }
      <Paper elevation={10} sx={{ borderRadius: '10px', padding: '4%', border: 'solid 1px', marginTop: '10px' }}>
        <Typography variant="h5" pt={3}> New HealthCheck Entry</Typography>
        <form onSubmit={(event) => submitEntry(event)}>
          <BaseEntryFields formProps={formProps}/>
        {/* TODO: add loadable components for each individual visit type & type selector */}
          <TextField id="healthCheck-rating-field" label="HealthCheck Rating" variant="standard" fullWidth={true} margin="normal" size='small' type="number" value={healthCheckRating} onChange={(e) => setHealthCheckRating(Number(e.target.value))}/>

          <Button variant="contained" type="submit" sx={{ margin: '10px' }} size="medium">Save</Button>
          <Button variant="contained" sx={{ margin: '10px' }} size="medium" color="error" onClick={() => cancelForm()}>Cancel</Button>
        </form>
      </Paper>
    </div>
  );
};

export default AddEntryForm;