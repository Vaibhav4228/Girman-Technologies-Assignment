import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Image from "next/image";
import { Search } from "lucide-react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-start bg-gradient-to-b from-white via-white to-[#b1cbff] bg-center bg-no-repeat bg-auto overflow-hidden">
      <Header />
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="mb-12">
          <Image
            src="/company-name.png"
            alt="Girman Technologies"
            width={300}
            height={60}
            priority
          />
        </div>
        <form onSubmit={handleSearch} className="relative w-full max-w-xl">
          <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
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
      </div>
    </div>
  );
}
