import { useState, useEffect } from "react";
import axios from "axios";


function App() {
  // State
  const[notes, setNotes] = useState(null);
  const[createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });
  
// Use Effect
  useEffect(() => {
    fetchNotes();
  }, []);
  
  // Functions
  const fetchNotes = async () => {
    // Fetch the notes
    const res = await axios.get("http://localhost:3000/notes");
    // Set to state
    setNotes(res.data.notes);
  };

  const updateCreateFormField = (e) => {
    const {name, value} = e.target;
    setCreateForm({
      ...createForm,
      [name]: value,
    });
     
  };

  const createNote = async (e) => {
    e.preventDefault();

    // create the note
    const res = await axios.post("https://localhost:3000/notes", createForm);

    // update state
    
    console.log(res);
  };

    return ( 
    <div className="App"> 
      <div>
        <h2>Notes:</h2>
        {notes &&
          notes.map((note) => {
            return (
              <div key={note._id}>
                <h3>{note.title}</h3>
              </div>
            );
          })}
      </div>
      <div>
        <h2>Create Note</h2>
        <form onSubmit={createNote}> 
          <input onChange={updateCreateFormField} value={createForm.title} name="title" />
          <textarea onChange={updateCreateFormField} value={createForm.body} name="body"/>
          <button type="submit">Create Note</button>
        </form>
      </div>
    </div>
    );
}    


export default App;
 