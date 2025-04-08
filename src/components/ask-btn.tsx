"use client";

import { type User } from "@supabase/supabase-js";

type AskAiButtonProps = {
  user: User | null;
};

function AskAiButton({ user }: AskAiButtonProps) {
  console.log("AskAiButton user", user?.email);
  return <div>AskAiButton</div>;
}

export default AskAiButton;
