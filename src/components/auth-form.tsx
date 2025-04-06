"use client";

import toast from "sonner";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CardContent, CardFooter } from "./ui/card";
import Link from "next/link";

interface AuthFormProps {
  type: "login" | "signup";
}

function AuthForm({ type }: AuthFormProps) {
  const isLoginForm = type === "login";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    console.log(
      "Form submitted",
      formData.get("email"),
      formData.get("password"),
    );
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      <CardContent className="grid items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email" className="block font-medium">
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            required
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password" className="block font-medium">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            placeholder="Enter your password"
            type="password"
            required
            disabled={isPending}
          />
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-center space-y-4">
        <Button>
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>
        <p className="cursor-pointer text-xs">
          {isLoginForm ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            href={isLoginForm ? "/sign-up" : "login"}
            className={`text-blue-500 underline ${isPending && "pointer-events-none opacity-50"}`}
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}

export default AuthForm;
