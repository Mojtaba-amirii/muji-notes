"use client";

import { createContext, type ReactNode, useState } from "react";

type NoteProviderContextType = {
  noteText: string;
  setNoteText: (noteText: string) => void;
};

export const NoteProviderContext = createContext<NoteProviderContextType>({
  noteText: "",
  setNoteText: () => {},
});

export default function NoteProvider({ children }: { children: ReactNode }) {
  const [noteText, setNoteText] = useState<string>("");

  return (
    <NoteProviderContext.Provider value={{ noteText, setNoteText }}>
      {children}
    </NoteProviderContext.Provider>
  );
}
