"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RepairRequestDetailPage() {
  const { id } = useParams()
  const [eventLog, setEventLog] = useState([
    { date: "2023-06-01", event: "Repair request created" },
    { date: "2023-06-02", event: "Assigned to Team A" },
    { date: "2023-06-03", event: "Parts ordered" },
  ])

  const [newEvent, setNewEvent] = useState({ date: "", event: "" })

  const handleAddEvent = () => {
    if (newEvent.date && newEvent.event) {
      setEventLog([...eventLog, newEvent])
      setNewEvent({ date: "", event: "" })
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Repair Request Details</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Request #{id}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Machine:</strong> Machine A
          </p>
          <p>
            <strong>Type:</strong> Maintenance
          </p>
          <p>
            <strong>Status:</strong> In Progress
          </p>
          <p>
            <strong>Reported:</strong> 2023-06-01
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Event Log</CardTitle>
        </CardHeader>
        <CardContent>
          {eventLog.map((event, index) => (
            <div key={index} className="mb-2">
              <strong>{event.date}:</strong> {event.event}
            </div>
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4">Add Event</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event-date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="event-date"
                    type="date"
                    className="col-span-3"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event-description" className="text-right">
                    Event
                  </Label>
                  <Input
                    id="event-description"
                    className="col-span-3"
                    value={newEvent.event}
                    onChange={(e) => setNewEvent({ ...newEvent, event: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleAddEvent}>Add Event</Button>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  )
}

