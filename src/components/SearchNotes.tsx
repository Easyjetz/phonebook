import React, { useState } from 'react'


type SearchNotesProps = {
  findNotes: (name: string) => void;
}

export const SearchNotes: React.FC<SearchNotesProps> = ({findNotes}) => {

  const [name, setName] = useState('');


  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = /^[А-Яа-яЁё\s]+$/.test(e.currentTarget.value);
    if (isValid || e.currentTarget.value === '') {
      setName(e.currentTarget.value);
    }
  }

  const searchHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    findNotes(name.trim().toLowerCase());
    e.preventDefault();
  }

  return (
    <div className="searchNotes">
        <input className="input" maxLength={45} type="text" value={name} onChange={changeNameHandler} placeholder="Поиск по имени" />
        <button className="button" onClick={searchHandler}>Найти</button>
    </div>
  )
}