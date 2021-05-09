import React, { useState } from 'react'
import { INoteItem } from '../App';
import { ErrorMessage } from './ErrorMessage';


type CreateNoteProps = {
  addNoteItem: (note: INoteItem) => void;
  notes: INoteItem[];
}

export const CreateNote: React.FC<CreateNoteProps> = ({addNoteItem, notes}) => {

  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [error, setError] = useState<string[]>([]);


  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = /^[А-ЯA-Zа-яa-zЁё\s]+$/.test(e.currentTarget.value);
    if (isValid || e.currentTarget.value === '') {
      setName(e.currentTarget.value);
    }
  }

  const changePhoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.currentTarget.value);
    
  }

  const addNote = (e: React.MouseEvent<HTMLButtonElement>) => {
    const filterName: string = name.trim();
    const isValidName = /^\s*[А-ЯЁA-Z][a-zа-яё]+(-[A-ZА-ЯЁ][a-zа-яё]+)? [A-ZА-ЯЁ][a-zа-яё]+( [A-ZА-ЯЁ][a-zа-яё]+)?\s*$/.test(filterName);
    const isValidPhoneNumber = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(phoneNumber);

    const isNameOrPhoneExist = notes.reduce((acc: boolean, item: INoteItem) => {

      const number = item.phoneNumber.replace(/[^0-9]/g, '');
      const newNumber = phoneNumber.replace(/[^0-9]/g, '');
      if ((item.name === name) || (number === newNumber)) {
        return true;
      } return acc;
    }, false);

    if (isValidName && !isNameOrPhoneExist && isValidPhoneNumber) {
      const id = notes.length === 0 ? 1 : notes[notes.length - 1].id + 1
      addNoteItem({ name: filterName, phoneNumber, id });
    }

    setError([]);

    if (!isValidName) {
      setError(errors => [...errors, 'Пожалуйста, введите ФИО корректно, пример: Иванов Иван Иванович']);
    }
    
    if (!isValidPhoneNumber) {
      setError(errors => [...errors, 'Пожалуйста, введите российский номер, пример формата: +79261234567 или 123-45-67 ']);
    }

    if (isNameOrPhoneExist) {
      setError(errors => [...errors, 'Указанные Вами данные уже содержатся в справочнике']);
    }

    e.preventDefault();
  }

  return (
    <div className="createNote">
      <h2>Добавить запись</h2>
      {error.length > 0 && <ErrorMessage message={error} />}
      <form>
        <div>
          <div className="createNote__item">
            <label className="createNote__label" htmlFor="name"> Фамилия Имя Отчество:</label>
            <input
              className="input"
              type="text"
              id="name"
              maxLength={45}
              value={name}
              onChange={changeNameHandler}
              pattern="^\s*[А-ЯЁA-Z][a-zа-яё]+(-[A-ZА-ЯЁ][a-zа-яё]+)? [A-ZА-ЯЁ][a-zа-яё]+( [A-ZА-ЯЁ][a-zа-яё]+)?\s*$"
              placeholder="Введите ФИО" />
          </div>
          <div className="createNote__item">
            <label className="createNote__label" htmlFor="tel">Номер телефона:</label>
            <input
              className="input"
              id="tel"
              type="tel"
              value={phoneNumber}
              maxLength={20}
              pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$"
              onChange={changePhoneNumberHandler}
              placeholder="Введите номер" />
          </div>
        </div>
        <button className="button" onClick={addNote} >Добавить</button>
      </form>
    </div>
  );
}