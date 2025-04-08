"use client";

import { ChangeEvent, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import useNote from "@/hooks/useNote";
import { Textarea } from "./ui/textarea";
import { debounceTimeout } from "@/lib/constants";
import { updateNoteAction } from "@/actions/notes";

type NoteTextInputProps = {
  noteId: string;
  startingNoteText: string;
};

let updateNoteTimeout: NodeJS.Timeout;

function NoteTextInput({ noteId, startingNoteText }: NoteTextInputProps) {
  const noteIdParams = useSearchParams().get("noteId") || "";
  const { noteText, setNoteText } = useNote();

  useEffect(() => {
    if (noteIdParams === noteId) {
      setNoteText(startingNoteText);
    }
  }, [startingNoteText, noteIdParams, noteId, setNoteText]);

  const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;

    setNoteText(text);

    clearTimeout(updateNoteTimeout);
    updateNoteTimeout = setTimeout(() => {
      updateNoteAction(noteId, text);
    }, debounceTimeout);
  };

  return (
    <Textarea
      value={noteText}
      onChange={handleUpdateNote}
      placeholder="Type your notes here..."
      className="custom-scrollbar placeholder:text-muted-foreground mb-4 h-full max-w-4xl resize-none border p-4 focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  );
}

export default NoteTextInput;
