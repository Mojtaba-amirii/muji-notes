import { prisma } from "@/db/prisma";
import { getUser } from "@/auth/server";
import AskAiButton from "@/components/ask-btn";
import NewNoteButton from "@/components/note-btn";
import NoteTextInput from "@/components/note-input";

type HomeProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const user = await getUser();
  const noteIdParam = (await searchParams).noteId;
  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam[0]
    : noteIdParam || "";

  const note = await prisma.note.findUnique({
    where: { id: noteId, authorId: user?.id },
  });

  return (
    <section className="flex h-full flex-col items-center gap-4">
      <div className="w-full max-w-4xl justify-end gap-2">
        <AskAiButton user={user} />
        <NewNoteButton user={user} />
      </div>

      <NoteTextInput noteId={noteId} startingNoteText={note?.text || ""} />
    </section>
  );
}
