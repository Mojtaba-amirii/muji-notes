import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

function Header() {
  const user = null; // Replace with actual user authentication logic

  return (
    <header className="bg-popover text-foreground dark:bg-popover/80 dark:text-foreground/80 relative flex h-24 w-full items-center justify-between px-2 shadow-sm shadow-sky-600 drop-shadow-md transition-colors duration-300 sm:px-4">
      <div className="flex w-fit items-center justify-center gap-2">
        <Link href="/" className="h-16 w-16 overflow-hidden rounded-full">
          <Image
            src="/imgs/notes.png"
            alt="logo"
            width={60}
            height={60}
            className="h-full w-auto cursor-pointer rounded-full object-cover"
            priority
            quality={100}
          />
        </Link>
        <Link href="/" className="hidden md:inline-block">
          <h1 className="text-2xl leading-6 font-semibold">
            MUJI <br /> NOTES
          </h1>
        </Link>
      </div>

      <nav className="flex w-fit justify-around gap-4">
        {user ? (
          "logout"
        ) : (
          <>
            <Button asChild>
              <Link href="/sign-up" className="hidden! sm:inline-block!">
                Sign up
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
