import React from 'react'
import { useState, useEffect } from 'react'
import api from '../api'
import Note from '../components/Note'
import '../styles/Home.css'

function Home() {
  const [notes, setNote] = useState([])
  const [content, setContent] = useState('');
  const [title, setTitle] = useState("");

  useEffect( ()=> {
      getNotes()
    },
    []
  ) 
  const getNotes = ()=>{
    api
    .get('/notes/')
    .then((res) => res.data)
    .then((data)  => {setNote(data); console.log(data)})
    .catch((err) => console.log(err));
  }

  const deleteNote =(id)=>{
    api
    .delete(`/notes/delete/${id}/`)
    .then((res)=> {
      if (res.status == 204){
        alert('Note deleted successfully')
         getNotes()        
      } 
      else alert("Couldn't delete Note")
      }
    )
    .catch((err)=> alert(err));
   

  }
  const createNote = (e)=>{
    e.preventDefault();
    api
    .post('/notes/', {content, title})
    .then((res) => {
      if (res.status === 201) {alert("Note Created succesfully")
        getNotes()
        setContent('')
        setTitle("")
      }
      else alert("Could not create post")  
    } )
    .catch((error) => alert(error));
    

  }

  return (
    <div>
      <div className='notes-section'>
        <h2>Notes</h2>
        <div className="note"> {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id}/>
        ))}</div>
       
      </div>
      
        <h2>Create a Note</h2>
        <form onSubmit={createNote} className="form">
          <label htmlFor="title">Title</label>
          <br/>
          <input
          type="text" 
          required
          id='title'
          name='title'
          onChange={(e)=> setTitle(e.target.value)}
          value={title}/>
            <br />
          <label htmlFor="content">Note content</label>
          <br />
          <textarea
            name="content" 
            id="content"
            required
            onChange={(e)=> setContent(e.target.value)}
            value={content}
            ></textarea>
            <br />
            <input type="submit" value='Submit' />
        </form>
      </div>
    
  )
} 

export default Home
