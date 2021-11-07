import noteContext from "./noteContext";
import { useState } from "react";

const NoteState= (props)=>{
  const host = 'http://localhost:5000'

    const notesInitial=[]

      const [notes, setNotes] = useState(notesInitial)

      // Get all Note
      const getNotes= async ()=>{
        // API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4NTZkNDRmZDFmYmRlN2Q5YTRkYTJjIn0sImlhdCI6MTYzNjE3NjQ4NH0.cIYAzZ_1UvjV_Jr-JgRwioMAb94gT4G4YwlOqNYcSSk"
          }
        });
        const json= await response.json();
        setNotes(json)
      }

      // Add a Note
      const addNote= async (title,description,tag)=>{
        // API CALL
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4NTZkNDRmZDFmYmRlN2Q5YTRkYTJjIn0sImlhdCI6MTYzNjE3NjQ4NH0.cIYAzZ_1UvjV_Jr-JgRwioMAb94gT4G4YwlOqNYcSSk"
          },
          body: JSON.stringify({title,description,tag})
        });
        // eslint-disable-next-line
        const json= await response.json();

        let note={
          "_id": "6186b09fjjjff771348ckl061d7fcd9",
          "user": "61856d44fd1fbde7d9a4da2c",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2021-11-06T16:43:11.750Z",
          "__v": 0
        }
        setNotes(notes.concat(note))
      }
      
      // Delete a Note
      const deleteNote= async (id)=>{
        // API CALL
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4NTZkNDRmZDFmYmRlN2Q5YTRkYTJjIn0sImlhdCI6MTYzNjE3NjQ4NH0.cIYAzZ_1UvjV_Jr-JgRwioMAb94gT4G4YwlOqNYcSSk"
          }
        });
        const json= await response.json();
        console.log(json)

        const newNote = notes.filter((note)=>{return note._id !== id})
        setNotes(newNote)
      }

      // Edit a Note
      const editNote= async (id,title,description,tag)=>{

        // API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4NTZkNDRmZDFmYmRlN2Q5YTRkYTJjIn0sImlhdCI6MTYzNjE3NjQ4NH0.cIYAzZ_1UvjV_Jr-JgRwioMAb94gT4G4YwlOqNYcSSk"
          },
          body: JSON.stringify({title,description,tag})
        });
        // eslint-disable-next-line
        const json= await response.json();
      

        // Logic to edit in client
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if (element._id===id) {
            element.title=title
            element.description=description
            element.tag=tag
          }
          
        }
      }
    
    return (<noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
        {props.children};
    </noteContext.Provider>)
}

export default NoteState