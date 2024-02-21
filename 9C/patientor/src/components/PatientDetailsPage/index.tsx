import { Divider, Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

import { Entry, Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";

import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

const PatientDetailsPage = () => {

  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const patientId: string = String(useParams().id);

  useEffect(() => {
    const fetchCurrentPatient = async (patientId: string) => {
      const patient = await patientService.getById(patientId);
      setPatient(patient);
    };
    void fetchCurrentPatient(patientId);
  },[]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAllDiagnoses();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
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
      <Typography variant="h6" pt={5}>
        Entries
      </Typography>
        {patient.entries.map((e: Entry) => {
          return (
            <div key={e.id}>
              <Typography variant="body1" >Date of Visit: {e.date}</Typography>
              <Typography variant="body1" >Notes: {e.description}</Typography>
              <ul>
                {e.diagnosisCodes?.map(c => {
                  return (
                    <li key={c}>
                      <Typography variant="body2" >{c}: {diagnoses?.map((d) => {
                          if (d.code === c){
                            return d.name;
                          }
                        })}
                      </Typography>
                    </li>
                  );
                })}
              </ul>
              <Divider/>
            </div>
          );
        })}
    </div>
  );
};

export default PatientDetailsPage;