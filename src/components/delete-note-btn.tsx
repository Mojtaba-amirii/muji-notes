"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteNoteAction } from "@/actions/notes";

type DeleteNoteButtonProps = {
  noteId: string;
  deleteNoteLocally: (noteId: string) => void;
};

function DeleteNoteButton({
  noteId,
  deleteNoteLocally,
}: DeleteNoteButtonProps) {
  const router = useRouter();
  const noteIdParam = useSearchParams().get("noteId") || "";
  const [isPending, startTransition] = useTransition();

  const handleDeleteNote = () => {
    startTransition(async () => {
      const { errorMessage } = await deleteNoteAction(noteId);

      if (!errorMessage) {
        toast.success("Note deleted successfully!");

        deleteNoteLocally(noteId);

        if (noteId === noteIdParam) {
          router.replace("/");
        }
      } else {
        toast.error(errorMessage);
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="absolute top-1/2 right-1 size-7 -translate-y-1/2 cursor-pointer opacity-0 transition-opacity duration-200 ease-in-out group-hover/item:opacity-100"
          variant="ghost"
        >
          <Trash2 className="text-red-500" />
          <span className="sr-only">Delete note</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to delete this note?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your note
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteNote}
            className="bg-destructive/70 text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteNoteButton;
