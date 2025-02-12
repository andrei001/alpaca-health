'use client'
import { Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Input } from "./components/input";
import { GeneratedOutput } from "./components/generatedOutput";

export default function Home() {
  const [generatedOutput, setGeneratedOutput] = useState<string | undefined>(undefined);
  const [notes, setNotes] = useState<{ text: string, duration: string, type: string }[]>([]);
  const [inputFields, setInputFields] = useState({
    textInput: "",
    duration: "",
    type: "",
  });

  useEffect(() => {
    fetch("http://localhost:8000/notes").then(e => {
      e.json().then(jsonResp => {
        setNotes([...notes, ...jsonResp.notes])
      })
    })
  },[])

  const onGenerateAINote = async () => {
    const res = await fetch("http://localhost:8000/ai_summary", {
      method: "POST", headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({ value: inputFields.textInput, duration: inputFields.duration, type: inputFields.type })
    });
    const parsedJSON = await res.json();
    setGeneratedOutput(parsedJSON.message);
  }

  const onSave = async (text: string) => {
    await fetch("http://localhost:8000/save", {
      method: "POST", headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({ value: text, duration: inputFields.duration, type: inputFields.type })
    });
    setGeneratedOutput(undefined);
    setNotes(prev => [...prev, {text,duration: inputFields.duration, type: inputFields.type}])
    setInputFields({
      textInput: "",
      duration: "",
      type: "",
    })
    
  }

  return (
    <Container>
      <Input 
        onSubmit={onGenerateAINote} 
        inputFields={inputFields}
        setInputFields={setInputFields}
      />
      {
        generatedOutput !== undefined && (
          <GeneratedOutput setGeneratedOutput={setGeneratedOutput} generatedOutput={generatedOutput} onSave={onSave} />
        )
      }
      {notes.map((e,idx) => <div key={`id-${idx}`}><h3>{`Note ${idx+1}`}</h3>{e.text} {e.duration} {e.type}</div>)}
    </Container>
  );
}
