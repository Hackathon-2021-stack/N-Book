import noteContext from "./noteContext";
import { useState } from "react";

const NoteState= (props)=>{

    const notesInitial=[
        {
          "_id": "6186b09a771348c061d7fcd7",
          "user": "61856d44fd1fbde7d9a4da2c",
          "title": "aditya",
          "description": "hello i am aditya banik",
          "tag": "fasjjjj",
          "date": "2021-11-06T16:43:06.479Z",
          "__v": 0
        },
        {
          "_id": "6186b09f771348c061d7fcd9",
          "user": "61856d44fd1fbde7d9a4da2c",
          "title": "aditya",
          "description": "hello i am aditya banik",
          "tag": "fasjjjj",
          "date": "2021-11-06T16:43:11.750Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial)
    
    return (<noteContext.Provider value={{notes,setNotes}}>
        {props.children};
    </noteContext.Provider>)
}

export default NoteState