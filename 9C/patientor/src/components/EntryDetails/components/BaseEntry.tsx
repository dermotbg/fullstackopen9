import { Box, Divider, Typography } from "@mui/material";
import { EntryProps } from "../types";

const BaseEntry = ({ entry, diagnoses }: EntryProps) => {

  return(
        <Box key={entry.id} pl={3}>
          <Typography variant="body1" >Date of Visit: {entry.date}</Typography>
          <Typography variant="body1" >Specialist: {entry.specialist}</Typography>
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
        </Box>      
  );
};

export default BaseEntry;