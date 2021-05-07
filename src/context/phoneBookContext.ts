import { createContext } from 'react';


export interface INoteItem {
  name: string;
  phoneNumber: string;
  id: number;
}

type phoneBookContextProps = {
  notes: INoteItem[];
  addNoteItem: (note: INoteItem) => void
}

export const phoneBookContext = createContext<phoneBookContextProps>({
  notes: [],
  addNoteItem: (note: INoteItem) => {},
});