import React from 'react'
import { INoteItem } from '../context/phoneBookContext';
import { usePhoneBook } from '../hooks/usePhoneBook';

type NotesListProps = {
  notes: INoteItem[];
  deleteNoteItem: (note: INoteItem) => void;
}

export const NotesList: React.FC<NotesListProps> = ({ notes, deleteNoteItem }) => {
  return (
    <div>
      <div>
        <p>ФИО:</p>
        <p>Номер телефона:</p>
      </div>
      {notes.map(({id, name, phoneNumber}) =>
        <div key={id} style={{border: '1px solid #555'}}>
          <span>{name}</span>
          <span>{phoneNumber}</span>
          <button onClick={() => deleteNoteItem({name, phoneNumber, id})}>Удалить</button>
      </div>)}
    </div>
  );
}