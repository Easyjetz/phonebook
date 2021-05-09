import React from 'react'
import { useMediaQuery } from 'react-responsive';
import { INoteItem } from '../App';
import { SearchNotes } from './SearchNotes';


type NotesListProps = {
  notes: INoteItem[];
  deleteNoteItem: (note: INoteItem) => void;
  findNotes: (name: string) => void;
}



export const NotesList: React.FC<NotesListProps> = ({ notes, deleteNoteItem, findNotes }) => {

  const isXsScreen = useMediaQuery({ query: '(max-width: 556px)' });



  return (
    <div className="noteList">
      <SearchNotes findNotes={findNotes} />
      {notes.length > 0 ?
        <>
          {!isXsScreen && <div className="noteList__header">
            <p>ФИО:</p>
            <p>Номер телефона:</p>
          </div>}
          {notes.map(({id, name, phoneNumber}) =>
            <div className="noteList__item" key={id} >
              <div className="noteList__name">{isXsScreen && <span>Имя: </span>}  {name}</div>
              <div className="noteList__number">{isXsScreen && <span>Телефон: </span>} {phoneNumber}</div>
              <button className="noteList__button" onClick={() => deleteNoteItem({name, phoneNumber, id})}>Удалить</button>
          </div>)}
        </>
        :
        <div className="noteList__empty">Ничего не найдено...</div>}
      
    </div>
  );
}