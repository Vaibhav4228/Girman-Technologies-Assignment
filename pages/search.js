import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../components/ui/dialog"
import { Button } from "../components/ui/button"

export default function SearchResults() {
  const router = useRouter()
  const { query } = router.query
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    if (query) {
      fetchResults()
    }
  }, [query])

  const fetchResults = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Error fetching results:', error)
    }
    setLoading(false)
  }

  const handleFetchDetails = (user) => {
    setSelectedUser(user)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Search Results for "{query}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((user, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <img src="/placeholder.png" alt="User" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">{user.first_name} {user.last_name}</h2>
              <p className="text-gray-600 mb-2">{user.city}</p>
              <p className="text-gray-600 mb-4">{user.contact_number}</p>
              <Button
                onClick={() => handleFetchDetails(user)}
                className="w-full"
              >
                Fetch Details
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl mb-4">No results found</p>
          <img src="/empty-state.svg" alt="No results" className="mx-auto" />
        </div>
      )}

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              Here are the details of the selected employee.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div>
              <p><strong>Name:</strong> {selectedUser.first_name} {selectedUser.last_name}</p>
              <p><strong>Location:</strong> {selectedUser.city}</p>
              <p><strong>Contact Number:</strong> {selectedUser.contact_number}</p>
              <img src="/placeholder.png" alt="User" className="w-32 h-32 rounded-full mx-auto mt-4" />
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setSelectedUser(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}