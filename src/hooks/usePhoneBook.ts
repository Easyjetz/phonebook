
import { useEffect, useState } from "react"
import { INoteItem } from "../App";




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

  const findNotes = (name: string) => {
    const notes = JSON.parse(localStorage.getItem('phoneNotes') || '[]');
    const copy = notes.slice();
    const newNotes = name.length > 0 ?
        copy.filter((i: INoteItem) => i.name.toLowerCase().includes(name))
        .sort((a: INoteItem, b: INoteItem) => {
          if (a.name.toLowerCase().indexOf(name) > b.name.toLowerCase().indexOf(name)) {
            return 1;
          }
          if (a.name.toLowerCase().indexOf(name) < b.name.toLowerCase().indexOf(name)) {
            return -1;
          }
          return 0;
        })
      :
      notes;

    setNotes(newNotes);
  }



  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('phoneNotes') || '[]');
    if (notes) {
      setNotes(notes);
    }
  }, []);

  return { notes, addNoteItem, deleteNoteItem, findNotes };
}