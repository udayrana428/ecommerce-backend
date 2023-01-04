import { React, useContext, useEffect, useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import notecontext from '../context/notecontext'
import AddNote from './AddNote'
import Noteitem from './Noteitem'
const Notes = (props) => {
    const context = useContext(notecontext)
    const { notes, getAllNotes,editNote} = context
    let navigate=useNavigate()
    useEffect(() => {
        // eslint-disable-next-line
        if(localStorage.getItem('authtoken')){
            getAllNotes()
        }
        else{
            navigate("/login")
            
        }
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setnote] = useState({id:"",etitle:"",edescription:"",etag:"default"})
    
    const updateNote = (currentNote) => {
        ref.current.click()
        setnote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }
    const handleClick=(e)=>{
        console.log("updating the note ......",note)
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click()
        props.showAlert("Updated successfully",'success')
    }
    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }    
    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-2">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button"  className="btn btn-primary" onClick={handleClick}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row my-3">
                    <h2>Your notes</h2>
                    {notes.map((note) => {
                        return <Noteitem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
