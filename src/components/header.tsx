import Link from "next/link";
import Image from "next/image";

function Header() {
  return (
    <header>
      <div className="h-16 w-16 overflow-hidden">
        <Link href="/">
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
      </div>
    </header>
  );
}

export default Header;
