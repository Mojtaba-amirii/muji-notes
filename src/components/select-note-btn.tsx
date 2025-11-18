"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import useNote from "@/hooks/useNote";
import { type Note } from "@/db/client";
import { SidebarMenuButton } from "./ui/sidebar";

type SelectNoteButtonProps = {
  note: Note;
};

function SelectNoteButton({ note }: SelectNoteButtonProps) {
  const noteId = useSearchParams().get("noteId") || "";
  const { noteText: selectedNoteText } = useNote();

  // ✅ Good: Calculate derived state during rendering instead of using Effects
  const isSelectedNote = noteId === note.id;
  const blankNote = "Empty note.";

  // When this note is selected, use the global note text (which may be being edited)
  // Otherwise, use the note's original text
  const noteText = isSelectedNote
    ? selectedNoteText || blankNote
    : note.text || blankNote;

  return (
    <SidebarMenuButton
      asChild
      className={`items-start gap-0 pr-12 ${isSelectedNote && "bg-sidebar-accent/50"}`}
    >
      <Link href={`/?noteId=${note.id}`} className="flex h-fit flex-col">
        <p className="w-full truncate">{noteText}</p>
        <span className="text-muted-foreground text-xs">
          {note.createdAt.toLocaleDateString()}
        </span>
      </Link>
    </SidebarMenuButton>
  );
}

export default SelectNoteButton;
