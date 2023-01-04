import Notecontext from "./notecontext";

import { React, useState } from "react";

const NoteState = (props) => {
  // const host = "http://localhost:5000"
  const host = "https://inotebook-cloud.herokuapp.com"
  const noteInitial = []
  const [notes, setnotes] = useState(noteInitial)
  // ADD NOTE
  const addNote = async (title, description, tag) => {
    // TODO: API CALL
    const response = await fetch(`${host}/api/notes/createNotes`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authtoken')
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    setnotes(notes.concat(json))
  }
  // Get all NOTE
  const getAllNotes = async () => {
    // TODO: API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authtoken')
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
    setnotes(json)
  }
  // DELETE NOTE
  const deleteNote = async (id) => {
    // TODO: API CALL
    const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authtoken')
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)
    // setnotes(json)

    console.log("deleted", id)
    const newNote = notes.filter((note) => { return note._id !== id })
    setnotes(newNote)
  }
  // EDIT NOTE
  const editNote = async (id, title, description, tag) => {
    // TODO API CALL
    const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authtoken')
      },
      body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)

    let newNote = JSON.parse(JSON.stringify(notes))

    // Logic to edit
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title
        newNote[index].description = description
        newNote[index].tag = tag
        break;
      }
    }
    setnotes(newNote)
  }
  return (
    <Notecontext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </Notecontext.Provider>
  )
}

export default NoteState