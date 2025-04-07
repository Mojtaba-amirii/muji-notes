"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CardContent, CardFooter } from "./ui/card";
import { loginAction, signUpAction } from "@/actions/users";

interface AuthFormProps {
  type: "login" | "signup";
}

function AuthForm({ type }: AuthFormProps) {
  const isLoginForm = type === "login";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      let errorMessage;
      let title;
      let description;
      if (isLoginForm) {
        errorMessage = (await loginAction(email, password)).errorMessage;
        title = "Logged in successfully!";
        description = "You are now logged in.";
      } else {
        errorMessage = (await signUpAction(email, password)).errorMessage;
        title = "Signed up successfully!";
        description = "You are now signed up.";
      }

      if (!errorMessage) {
        toast.success(title, {
          description,
        });
        router.replace("/");
      } else {
        toast.error("Error", {
          description: errorMessage,
        });
      }
    });
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
        <Button className="cursor-pointer">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>
        <p className="text-xs">
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
