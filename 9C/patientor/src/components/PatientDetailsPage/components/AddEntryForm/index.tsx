import { Alert, Button, InputLabel, MenuItem, Paper, Select,Typography } from "@mui/material";
import { BaseFormValues, EntryFormValues, Patient, SickLeave } from "../../../../types";
import { SyntheticEvent, useState } from "react";
import patientService from '../../../../services/patients';
import axios from "axios";
import BaseEntryFields from "./components/BaseEntryFields";
import HealthCheckFields from "./components/HealthCheckFields";
import HospitalFields from "./components/HospitalFields";
import OccupationalHealthcareFields from "./components/OccupationalHealthcareFields";
import { generateFormData } from "./utils";

interface FormProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  patientId: string;
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}


const AddEntryForm = ({ visible, setVisible, patientId, patient, setPatient } : FormProps) => {

  // base entry state
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState<string>();
  const [visitType, setVisitType] = useState('HealthCheck');
  
  //HealthCheck state
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  //Occupational Healthcare State
  const [employer, setEmployer] = useState('');
  const [sickLeave, setSickLeave] = useState<SickLeave>({startDate: '', endDate: ''});

  //Hospital State
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const formOpen = visible ? 'block' : 'none';

  const submitEntry = async (event: SyntheticEvent) => {
    event.preventDefault();

    // create object with common fields
    const baseData: BaseFormValues = {
      description: description,
      date: date,
      specialist: specialist,
      diagnosisCodes: diagnosisCodes,
    };

    // extend object to extended fields
    const formData: EntryFormValues = generateFormData({
      baseData: baseData,
      visitType: visitType,
      healthCheckRating: healthCheckRating,
      userId: patientId,
      employerName: employer,
      sickLeave: sickLeave,
      discharge: {date: dischargeDate, criteria: dischargeCriteria},
    });

    try {
      const entry = await patientService.addEntry(formData);

      // set parent patient state to include new entry
      const updatedPatient: Patient = ({
        ...patient,
        entries: patient.entries.concat(entry)
      });
      setPatient(updatedPatient);
      
      //reset base form fields
      setDescription('');
      setDate('');
      setSpecialist('');
      setDiagnosisCodes([]);

      //reset additional fields
      setHealthCheckRating(0);
      setEmployer('');
      setSickLeave({startDate: '', endDate: ''});
      
      // close form
      setVisible(!visible);
    }

    catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Error: ', '');
          console.error(message);
          setError(message);
          setTimeout(() => {
            setError(undefined);
          }, 3000);
        } else {
          setError("Unrecognized axios error");
          setTimeout(() => {
            setError(undefined);
          }, 3000);
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
        setTimeout(() => {
          setError(undefined);
        }, 3000);
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

  // props for BaseEntryFields
  const baseFormProps = {
    description,
    setDescription,
    date,
    setDate,
    specialist,
    setSpecialist,
    diagnosisCodes,
    setDiagnosisCodes,
  };

  //additional fields display function 
  const setFields = () => {
    {switch (visitType) {
      case 'Hospital':
        return <HospitalFields dischargeDate={dischargeDate} dischargeCriteria={dischargeCriteria} setDischargeDate={setDischargeDate} setDischargeCriteria={setDischargeCriteria}/>;
      case 'HealthCheck':
        return <HealthCheckFields healthCheckRating={healthCheckRating} setHealthCheckRating={setHealthCheckRating}/>;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcareFields employer={employer} setEmployer={setEmployer} sickLeave={sickLeave} setSickLeave={setSickLeave}/>;
      default:
        return null;
    }}
  };

  return (
    <div style={{ display: formOpen }}>
      {error
        ? <Alert sx={{ marginTop: '10px' }} severity="error">{error}</Alert>
        : null
      }
      <Paper elevation={10} sx={{ borderRadius: '10px', padding: '4%', border: 'solid 1px', marginTop: '10px' }}>
        <Typography variant="h5" pb={3}> New Entry</Typography>

        <InputLabel id="select-visit-type">Visit Type</InputLabel>
        <Select
          labelId="type"
          value={visitType}
          variant="standard"
          label="Visit"
          onChange={(e) => setVisitType(e.target.value)}
          fullWidth
        >
          <MenuItem value={'HealthCheck'}>HealthCheck</MenuItem>
          <MenuItem value={'OccupationalHealthcare'}>Occupational HealthCare</MenuItem>
          <MenuItem value={'Hospital'}>Hospital</MenuItem>
        </Select>

        <form onSubmit={(event) => submitEntry(event)}>
          <BaseEntryFields formProps={baseFormProps}/>
          {setFields()}
          <Button variant="contained" type="submit" sx={{ margin: '10px' }} size="medium">Save</Button>
          <Button variant="contained" sx={{ margin: '10px' }} size="medium" color="error" onClick={() => cancelForm()}>Cancel</Button>
        </form>
      </Paper>
    </div>
  );
};

export default AddEntryForm;