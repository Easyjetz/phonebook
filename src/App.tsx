import React from 'react';
import { CreateNote } from './components/CreateNote';
import { NotesList } from './components/NotesList';
import { usePhoneBook } from './hooks/usePhoneBook';

export interface INoteItem {
  name: string;
  phoneNumber: string;
  id: number;
}


function App() {
  
  const {notes, addNoteItem, deleteNoteItem, findNotes} = usePhoneBook();

  return (
    <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
        <CreateNote notes={notes} addNoteItem={addNoteItem} />
        <NotesList findNotes={findNotes} deleteNoteItem={deleteNoteItem} notes={notes} />
    </div>
  );
}

export default App;
