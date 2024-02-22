import { Button, Paper, TextField, Typography } from "@mui/material";

const AddEntryForm = ({ visible } : {visible: boolean}) => {

  const formOpen = visible ? 'block' : 'none';

  return (
    <div style={{ display: formOpen }}>
      <Paper elevation={10} sx={{ borderRadius: '10px', padding: '4%', border: 'solid 1px', marginTop: '10px' }}>
        <Typography variant="h5" pt={3}> New HealthCheck Entry</Typography>
        <form>
          <TextField id="outlined-basic" label="Description" variant="standard" fullWidth={true} margin="normal" size='small'/>
          <TextField id="outlined-basic" label="Date" variant="standard" fullWidth={true} margin="normal" size='small'/>
          <TextField id="outlined-basic" label="Specialist" variant="standard" fullWidth={true} margin="normal" size='small'/>
          <TextField id="outlined-basic" label="HealthCheck Rating" variant="standard" fullWidth={true} margin="normal" size='small'/>
          <TextField id="outlined-basic" label="Diagnoses Codes" variant="standard" fullWidth={true} margin="normal" size='small'/>
          <Button variant="contained" sx={{ margin: '10px' }} size="medium">Save</Button>
          <Button variant="contained" sx={{ margin: '10px' }} size="medium" color="error" >Cancel</Button>
        </form>
      </Paper>
    </div>
  );
};

export default AddEntryForm;