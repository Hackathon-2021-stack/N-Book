import React, { useEffect } from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import AddNotes from "./AddNotes";
import NoteItem from "./NoteItem";

function Notes() {
    const context = useContext(noteContext)
    const {notes,getNotes}=context
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])
  return (
      <>
      <AddNotes/>
    <div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note}/>
        })}
      </div>
    </div>
    </>
  );
}

export default Notes;
