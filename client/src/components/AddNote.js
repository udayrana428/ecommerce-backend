import {React,useContext,useState} from 'react'
import { useLocation } from 'react-router'
import notecontext from '../context/notecontext'
const AddNote = (props) => {
    const context=useContext(notecontext)
    const {addNote}=context
    const [note, setnote] = useState({title:"",description:"",tag:""})

    const handleClick=(e)=>{
        addNote(note.title,note.description,note.tag)
        setnote({title:"",description:"",tag:""})
        e.preventDefault()
        props.showAlert("Successfully added note","success")
    }
    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }    
    return (
        <>
            <div className="container">
                <h1>Add your notes here</h1>
                <form>
                    <div className="mb-2">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" value={note.title} name="title" aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" value={note.tag} name="tag" onChange={onChange} />
                    </div>
                    <button type="submit" disabled={note.title.length<3 || note.description.length<5 || note.tag.length<3} className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>

            </div>
        </>
    )
}

export default AddNote
