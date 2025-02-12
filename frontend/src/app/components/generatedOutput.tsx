import { Button, InputLabel, TextField } from "@mui/material";



export function GeneratedOutput({ generatedOutput, setGeneratedOutput, onSave }: { generatedOutput: string, setGeneratedOutput: (e: string) => void, onSave: (text: string) => void }) {
    return (
        <>
            <InputLabel>Output</InputLabel>
            <TextField
                value={generatedOutput}
                onChange={(e) => setGeneratedOutput(e.target.value)}
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={10}
                fullWidth
                variant="outlined"
            />
            <Button variant="contained" onClick={() => onSave(generatedOutput)}>Save</Button>
        </>
    );
}
