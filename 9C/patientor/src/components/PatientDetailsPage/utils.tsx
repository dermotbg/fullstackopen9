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

export const fullDiagnosesCodes = [
    {
      "code": "M24.2",
      "name": "Disorder of ligament",
    },
    {
      "code": "M51.2",
      "name": "Other specified intervertebral disc displacement",
    },
    {
      "code": "S03.5",
      "name":
        "Sprain and strain of joints and ligaments of other and unspecified parts of head",
    },
    {
      "code": "J10.1",
      "name":
        "Influenza with other respiratory manifestations, other influenza virus codeentified",
    },
    {
      "code": "J06.9",
      "name": "Acute upper respiratory infection, unspecified",
    },
    {
      "code": "Z57.1",
      "name": "Occupational exposure to radiation"
    },
    {
      "code": "N30.0",
      "name": "Acute cystitis",
    },
    {
      "code": "H54.7",
      "name": "Unspecified visual loss",
    },
    {
      "code": "J03.0",
      "name": "Streptococcal tonsillitis",
    },
    {
      "code": "L60.1",
      "name": "Onycholysis",
    },
    {
      "code": "Z74.3",
      "name": "Need for continuous supervision"
    },
    {
      "code": "L20",
      "name": "Atopic dermatitis",
    },
    {
      "code": "F43.2",
      "name": "Adjustment disorders",
    },
    {
      "code": "S62.5",
      "name": "Fracture of thumb",
    },
    {
      "code": "H35.29",
      "name": "Other proliferative retinopathy",
    }
  ];