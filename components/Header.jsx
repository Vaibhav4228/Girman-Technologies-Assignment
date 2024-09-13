import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-white bg-opacity-70 shadow-md">
      <div className="flex items-center space-x-4">
        <Image
          src="/Logo.png"
          alt="Girman Technologies Logo"
          width={120}
          height={120}
          priority
        />
      </div>
      <nav className="flex space-x-6">
        <Link
          href="/"
          className="text-black- hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          SEARCH
        </Link>
        <Link
          href="https://girmantech.com"
          className="text-black hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          WEBSITE
        </Link>
        <Link
          href="https://www.linkedin.com/company/girmantech/"
          className="text-black hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          LINKEDIN
        </Link>
        <a
          href="mailto:contact@girmantech.com"
          className="text-black hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          CONTACT
        </a>
      </nav>
    </header>
  );
}
