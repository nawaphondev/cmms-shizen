import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const repairRequests = [
  { id: 1, machine: "Machine A", status: "Open", date: "2023-06-01" },
  { id: 2, machine: "Machine B", status: "In Progress", date: "2023-06-02" },
  { id: 3, machine: "Machine C", status: "Closed", date: "2023-06-03" },
]

export default function RepairRequests() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Repair Requests</h2>
        {(user.role === "admin" || user.role === "technician" || user.role === "user") && (
          <Button>New Repair Request</Button>
        )}
      </div>
      <Table>
        <TableCaption>A list of recent repair requests.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Machine</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {repairRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.machine}</TableCell>
              <TableCell>{request.status}</TableCell>
              <TableCell>{request.date}</TableCell>
              <TableCell>
                {(user.role === "admin" || user.role === "technician" || user.role === "supervisor") && (
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

