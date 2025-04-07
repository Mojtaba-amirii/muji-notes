"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import { logOutAction } from "@/actions/users";

function LogOutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    const { errorMessage } = await logOutAction();

    if (!errorMessage) {
      toast.success("Logged out successfully!", {
        description: "You are now logged out.",
      });
      router.push("/");
    } else {
      toast.error("Error", {
        description: errorMessage,
      });
    }

    setLoading(false);
  };

  return (
    <Button
      className="w-24 cursor-pointer"
      variant="outline"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin text-blue-600" />
      ) : (
        "Logout"
      )}
    </Button>
  );
}

export default LogOutButton;
