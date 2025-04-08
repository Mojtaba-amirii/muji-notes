"use client";

import { use } from "react";
import { NoteProviderContext } from "@/providers/note-provider";

export default function useNote() {
  const context = use(NoteProviderContext);

  if (!context) throw new Error("useNote must be used within a NoteProvider");

  return context;
}
