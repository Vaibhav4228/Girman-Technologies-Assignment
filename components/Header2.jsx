import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Search } from "lucide-react";
import Link from "next/link";

export default function Header2() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center bg-white bg-opacity-70 shadow-md z-10 h-20">
      <Link href="/" passHref>
        <div className="flex items-center space-x-4 cursor-pointer">
          <Image src="/Logo.png" alt="Logo" width={120} height={120} priority />
        </div>
      </Link>

      <form onSubmit={handleSearch} className="relative flex-grow max-w-xl">
        <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-70 shadow-sm transition duration-300 ease-in-out"
          aria-label="Search input"
        />
      </form>
    </header>
  );
}
