import { useEffect, useState } from "react"
import type { User, ApiResponse } from "shared"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users?key=learn`)
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data: ApiResponse<User[]> = await res.json()
      setUsers(data.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  return (
    <div className="flex justify-center p-10">

      <Card className="w-150">
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>

        <CardContent>

          <div className="flex gap-2 mb-4">
            <Button onClick={loadUsers} disabled={loading}>
              {loading ? "Loading..." : "Refresh"}
            </Button>
            {error && (
              <span className="text-red-500 text-sm">{error}</span>
            )}
          </div>

          {users.length === 0 && !loading && !error && (
            <p className="text-gray-500">No users found. Click Refresh to load.</p>
          )}

          {users.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          )}

        </CardContent>
      </Card>

    </div>
  )
}
