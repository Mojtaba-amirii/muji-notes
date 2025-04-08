"use client";

import { type Note } from "@prisma/client";

interface SidebarGroupContentProps {
  notes: Note[];
}

function SidebarGroupContent({ notes }: SidebarGroupContentProps) {
  console.log("SidebarGroupContent", notes);
  return <div> Your notes here </div>;
}

export default SidebarGroupContent;
