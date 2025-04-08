"use client";

import { type User } from "@supabase/supabase-js";

type NewNoteButtonProps = {
  user: User | null;
};

function NewNoteButton({ user }: NewNoteButtonProps) {
  console.log("NewNoteButton user", user?.email);
  return <div>NewNoteButton</div>;
}

export default NewNoteButton;
