"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";

function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      // Simulate an API call to log out the user
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Redirect to the login page or perform any other action after logout
      toast.success("Logout successful!");
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
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

export default LogoutButton;
