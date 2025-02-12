import { Box, Button, Container, InputLabel, TextField } from "@mui/material";



export function Input({ onSubmit, inputFields, setInputFields }: 
  { 
    onSubmit: () => void, 
    inputFields: {textInput: string, duration: string, type: string}
    setInputFields: (e: {textInput: string, duration: string, type: string}) => void
  }) {

  const isValidData = () => {
    const isValid = inputFields.textInput.length !== 0 && inputFields.duration.length !== 0 && inputFields.type.length !== 0;
    if (!isValid) {
      alert("Fill in missing fields.");
    }
    return isValid;
  }
  return (
    <Container>
      <InputLabel>Input</InputLabel>
      <TextField
        required
        value={inputFields.textInput}
        onChange={(e) => setInputFields({...inputFields, textInput: e.target.value})}
        id="outlined-multiline-static"
        label="Multiline"
        multiline
        rows={10}
        fullWidth
        variant="outlined"
      />
      <Box>
        <TextField
          required
          label="Duration"
          value={inputFields.duration}
          onChange={e => setInputFields({...inputFields, duration: e.target.value})}
          variant="filled"
        />
      </Box>
      <Box>
        <TextField
          required
          label="Type"
          value={inputFields.type}
          onChange={e => setInputFields({...inputFields, type: e.target.value})}
          variant="filled"
        />
      </Box>
      <Button variant="contained" onClick={() => isValidData() && onSubmit()}>Submit</Button>
    </Container>
  );
}
