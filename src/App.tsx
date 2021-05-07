import React from 'react';
import { CreateNote } from './components/CreateNote';
import { NotesList } from './components/NotesList';
import { phoneBookContext } from './context/phoneBookContext';
import { usePhoneBook } from './hooks/usePhoneBook';



function App() {

  const {notes, addNoteItem, deleteNoteItem} = usePhoneBook();

  return (
      <div style={{maxWidth: '1140px', margin: '0 auto'}}>
        <CreateNote notes={notes} addNoteItem={addNoteItem} />
        <NotesList deleteNoteItem={deleteNoteItem} notes={notes} />
      </div>

  );
}

export default App;
