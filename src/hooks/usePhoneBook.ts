import { INoteItem } from './../context/phoneBookContext';
import { useEffect, useState } from "react"


export const usePhoneBook = () => {
  const [notes, setNotes] = useState<INoteItem[] | []>([]);

  const addNoteItem = (note: INoteItem) => {
    setNotes(notes => {
      localStorage.setItem('phoneNotes', JSON.stringify([...notes, note]));
      return [...notes, note];
    });
  }

  const deleteNoteItem = (note: INoteItem) => {
    const filteredNotes = notes.filter(i => i.id !== note.id);
    setNotes(filteredNotes);
    localStorage.setItem('phoneNotes', JSON.stringify(filteredNotes));
  }

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('phoneNotes') || '[]');
    if (notes) {
      setNotes(notes);
    }
  }, []);

  return { notes, addNoteItem, deleteNoteItem };
}