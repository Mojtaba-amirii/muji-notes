"use client";

import Fuse from "fuse.js";
import { SearchIcon } from "lucide-react";
import { type Note } from "@/db/client";
import { useEffect, useMemo, useState } from "react";

import { Input } from "./ui/input";
import {
  SidebarGroupContent as SidebarGroupContentShadCN,
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";
import SelectNoteButton from "./select-note-btn";
import DeleteNoteButton from "./delete-note-btn";

interface SidebarGroupContentProps {
  notes: Note[];
}

function SidebarGroupContent({ notes }: SidebarGroupContentProps) {
  const [searchText, setSearchText] = useState<string>("");
  const [localNotes, setLocalNotes] = useState<Note[]>(notes);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const fuse = useMemo(() => {
    return new Fuse(localNotes, {
      keys: ["text"],
      threshold: 0.4,
    });
  }, [localNotes]);

  const filteredNotes = searchText
    ? fuse.search(searchText).map((text) => text.item)
    : localNotes;

  const deleteNoteLocally = (noteId: string) => {
    setLocalNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== noteId),
    );
  };

  return (
    <SidebarGroupContentShadCN>
      <div className="relative flex items-center">
        <SearchIcon className="text-muted-foreground absolute left-2 size-4" />
        <Input
          className="bg-muted pl-8"
          placeholder="Search your notes..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <SidebarMenu className="mt-4">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <SidebarMenuItem key={note.id} className="group/item">
              <SelectNoteButton note={note} />

              <DeleteNoteButton
                noteId={note.id}
                deleteNoteLocally={deleteNoteLocally}
              />
            </SidebarMenuItem>
          ))
        ) : (
          <div className="text-muted-foreground py-4 text-center text-sm">
            No notes found
          </div>
        )}
      </SidebarMenu>
    </SidebarGroupContentShadCN>
  );
}

export default SidebarGroupContent;
