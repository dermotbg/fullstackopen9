import { Divider, Typography } from "@mui/material";
import { EntryProps } from "../types";

const BaseEntry = ({ entry, diagnoses }: EntryProps) => {

  return(
        <div key={entry.id}>
          <Typography variant="body1" >Date of Visit: {entry.date}</Typography>
          <Typography variant="body1" >Notes: {entry.description}</Typography>
          <ul>
            {entry.diagnosisCodes?.map(c => {
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
};

export default BaseEntry;