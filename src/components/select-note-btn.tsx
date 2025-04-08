"use client";

import Link from "next/link";
import { type Note } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import useNote from "@/hooks/useNote";
import { SidebarMenuButton } from "./ui/sidebar";

type SelectNoteButtonProps = {
  note: Note;
};

function SelectNoteButton({ note }: SelectNoteButtonProps) {
  const noteId = useSearchParams().get("noteId") || "";
  const { noteText: selectedNoteText } = useNote();
  const [localNoteText, setLocalNoteText] = useState<string>(note.text);
  const [shouldBeGlobalNoteText, setShouldBeGlobalNoteText] =
    useState<boolean>(false);

  useEffect(() => {
    if (noteId === note.id) {
      setShouldBeGlobalNoteText(true);
    } else {
      setShouldBeGlobalNoteText(false);
    }
  }, [noteId, note.id]);

  useEffect(() => {
    if (shouldBeGlobalNoteText) {
      setLocalNoteText(selectedNoteText);
    }
  }, [selectedNoteText, shouldBeGlobalNoteText]);

  const blankNote = "Empty note.";
  let noteText = localNoteText || blankNote;
  if (shouldBeGlobalNoteText) {
    noteText = selectedNoteText || blankNote;
  }

  return (
    <SidebarMenuButton
      asChild
      className={`items-start gap-0 pr-12 ${note.id === noteId && "bg-sidebar-accent/50"}`}
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
