import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header2 from "../components/Header2";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";
import { MapPin, Phone, User } from "lucide-react";

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (query) {
      fetchResults();
    }
  }, [query]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
    setLoading(false);
  };

  const handleFetchDetails = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-[#b1cbff] p-8 pt-24">
      <Header2 />

      <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-sm">
          {results.map((user, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl shadow-md p-6 flex flex-col items-center"
            >
              <img
                src="/placeholder.png"
                alt="User"
                className="w-24 h-24 rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold mb-2 flex items-start">
                <User className="w-5 h-5 mr-2 text-black" /> {user.first_name}{" "}
                {user.last_name}
              </h2>
              <p className="text-gray-600 mb-2 flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-black" /> {user.city}
              </p>
              <div className="flex justify-between items-center w-full mt-4">
                <p className="text-gray-600 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-black" />{" "}
                  {user.contact_number}
                </p>
                <Button
                  onClick={() => handleFetchDetails(user)}
                  className="bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  Fetch Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl mb-4">No results found</p>
          <img src="/not_found.png" alt="No results" className="mx-auto" />
        </div>
      )}

      {/* Dialog for display user detetlis */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="backdrop-blur-lg bg-white/70 rounded-lg p-6">
          <DialogHeader>
            <DialogTitle>Fetch Details</DialogTitle>
            <DialogDescription>
              Here are the details of the following employee.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="flex flex-col items-center text-left">
              <p className="mt-4">
                <strong>Name:</strong> {selectedUser.first_name}{" "}
                {selectedUser.last_name}
              </p>
              <p>
                <strong>Location:</strong> {selectedUser.city}
              </p>
              <p>
                <strong>Contact Number:</strong> {selectedUser.contact_number}
              </p>
              <p className="mt-4">
                <strong>Profile Image:</strong>
              </p>
              <img
                src="/placeholder.png"
                alt="User"
                className="w-64 h-48 rounded-md mt-4"
              />
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setSelectedUser(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
