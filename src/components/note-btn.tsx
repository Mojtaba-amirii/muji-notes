"use client";

import { toast } from "sonner";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type User } from "@supabase/supabase-js";

import { Button } from "./ui/button";
import { createNoteAction } from "@/actions/notes";

type NewNoteButtonProps = {
  user: User | null;
};

function NewNoteButton({ user }: NewNoteButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNewNote = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(true);
      const uuid = uuidv4();
      await createNoteAction(uuid);
      router.push(`/?noteId=${uuid}`);
      toast.success("New note created!");
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleNewNote}
      variant="secondary"
      className="w-fit cursor-pointer"
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        "Save Note"
      )}
    </Button>
  );
}

export default NewNoteButton;
