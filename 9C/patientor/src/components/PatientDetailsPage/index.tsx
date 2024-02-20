import { Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Patient } from "../../types";
import patientService from "../../services/patients";

import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

const PatientDetailsPage = () => {

  const [patient, setPatient] = useState<Patient>();
  const patientId: string = String(useParams().id);

  useEffect(() => {
    const fetchCurrentPatient = async (patientId: string) => {
      const patient = await patientService.getById(patientId);
      setPatient(patient);
    };
    void fetchCurrentPatient(patientId);
  },[]);
  
  if(!patient) return <div>Loading...</div>;
  return(
    <div className="App">
      <Typography variant="h6" pt={5}>
        {patient.name} 
        {patient.gender === 'male' ? <MaleIcon/> : patient.gender === 'female' ? <FemaleIcon/> : <TransgenderIcon/>}
      </Typography>
      <Typography variant="body1">
        SSN: {patient.ssn}
      </Typography>
      <Typography variant="body1">
        Occupation: {patient.occupation}
      </Typography>
    </div>
  );
};

export default PatientDetailsPage;