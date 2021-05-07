import React, { useState } from 'react'
import { INoteItem } from '../context/phoneBookContext';
import { Notification } from './Notification';


type CreateNoteProps = {
  addNoteItem: (note: INoteItem) => void;
  notes: INoteItem[];
}

export const CreateNote: React.FC<CreateNoteProps> = ({addNoteItem, notes}) => {

  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [error, setError] = useState<string[]>([]);


  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = /^[А-Яа-яЁё\s]+$/.test(e.currentTarget.value);
    if (isValid || e.currentTarget.value === '') {
      setName(e.currentTarget.value);
    }
  }

  const changePhoneNumberHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.currentTarget.value);
    
  }

  const addNote = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isValidName = /^[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+$/.test(name);
    const isValidPhoneNumber = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(phoneNumber);

    const isNameOrPhoneExist = notes.reduce((acc: boolean, item: INoteItem) => {
      if ((item.name === name) || (item.phoneNumber === phoneNumber)) {
        return true;
      } return acc;
    }, false);
    // number validation
    // name or phone already exist in note - вроде сделал
    if (isValidName && !isNameOrPhoneExist && isValidPhoneNumber) {
      const id = notes.length === 0 ? 1 : notes[notes.length - 1].id + 1
      addNoteItem({ name, phoneNumber, id });
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

  console.log(error.length);


  return (
    <div className="createNote">
      <h2>Добавить запись</h2>
      {error.length > 0 && <Notification success={false} message={error} />}
      <form>
        <div>
          <div className="createNote__item">
            <label className="createNote__label" htmlFor="name"> Фамилия Имя Отчество:</label>
            <input
              className="createNote__input"
              type="text"
              id="name"
              maxLength={60}
              value={name}
              onChange={changeNameHandler}
              placeholder="Введите ФИО" />
          </div>
          <div className="createNote__item">
            <label className="createNote__label" htmlFor="tel">Номер телефона:</label>
            <input
              className="createNote__input"
              id="tel"
              type="tel"
              value={phoneNumber}
              maxLength={20}
              onChange={changePhoneNumberHandler}
              placeholder="Введите номер" />
          </div>
        </div>
        <button className="createNote__button" onClick={addNote} >Добавить</button>
      </form>
    </div>
  );
}