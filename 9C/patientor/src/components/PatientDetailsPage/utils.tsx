import { BaseFormValues, Discharge, EntryFormValues, VisitType, SickLeave } from "../../types";

export const dateInputProps = {
  fontFamily: 'Roboto, Helvetica, Arial , sans-serif',
  fontWeight: 400,
  fontSize: '1rem',
  lineHeight: '1.4375em',
  letterSpacing: '0.00938em',
  alignItems: 'center',
  border: 0,
  borderRadius: '4px',
  paddingLeft: '20px',
};

interface generateFormDataProps {
  baseData: BaseFormValues;
  visitType: string;
  healthCheckRating: number;
  userId: string;
  employerName: string;
  sickLeave: SickLeave;
  discharge: Discharge

}

export const generateFormData = (props: generateFormDataProps) => {

  let formData: EntryFormValues;

  switch (props.visitType) {
    case 'HealthCheck':
      formData = {
        ...props.baseData,
        type: VisitType.HealthCheck,
        healthCheckRating: props.healthCheckRating,
        userId: props.userId
        };
        break;
    case 'OccupationalHealthcare':
      formData = {
        ...props.baseData,
        type: VisitType.OccupationalHealthcare,
        employerName: props.employerName,
        sickLeave: props.sickLeave,
        userId: props.userId
      };
      break;
    case 'Hospital':
      formData = {
        ...props.baseData,
        type: VisitType.Hospital,
        userId: props.userId,
        discharge: props.discharge
      };
      break;
    default:
      throw new Error('Visit type not found');
  }
  return formData;
};