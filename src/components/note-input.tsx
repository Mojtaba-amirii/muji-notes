"use client";

type NoteTextInputProps = {
  noteId: string;
  startingNoteText: string;
};

function NoteTextInput({ noteId, startingNoteText }: NoteTextInputProps) {
  console.log(
    "NoteTextInput noteId",
    noteId,
    "startingNoteText",
    startingNoteText,
  );
  return <div>NoteTextInput</div>;
}

export default NoteTextInput;
