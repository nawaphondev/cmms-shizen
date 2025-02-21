"use client"

import { useState } from "react"
import { format, isValid } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { DashboardEvent } from "@/types/dashboard"

interface DashboardCalendarProps {
  events: DashboardEvent[]
  onAddEvent: (event: DashboardEvent) => void
  onUpdateEvent: (event: DashboardEvent) => void
  onDeleteEvent: (eventId: string) => void
  className?: string
}

export function DashboardCalendar({
  events,
  onAddEvent,
  onUpdateEvent,
  onDeleteEvent,
  className,
}: DashboardCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedEvent, setSelectedEvent] = useState<DashboardEvent | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const { toast } = useToast()

  const handleDateSelect = (date: Date | undefined) => {
    if (date && isValid(date)) {
      setSelectedDate(date)
      setSelectedEvent(null)
      setShowDialog(true)
    } else {
      setSelectedDate(undefined)
      setSelectedEvent(null)
      setShowDialog(false)
    }
  }

  const handleEventClick = (event: DashboardEvent) => {
    setSelectedEvent(event)
    setShowDialog(true)
  }

  const handleSaveEvent = (event: DashboardEvent) => {
    if (selectedEvent) {
      onUpdateEvent(event)
      toast({
        title: "Event Updated",
        description: "The event has been successfully updated.",
      })
    } else {
      onAddEvent(event)
      toast({
        title: "Event Added",
        description: "A new event has been successfully added.",
      })
    }
    setShowDialog(false)
    setSelectedEvent(null)
  }

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      onDeleteEvent(selectedEvent.id)
      toast({
        title: "Event Deleted",
        description: "The event has been successfully deleted.",
        variant: "destructive",
      })
    }
    setShowDialog(false)
    setShowDeleteConfirm(false)
    setSelectedEvent(null)
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "maintenance":
        return "bg-blue-500"
      case "repair":
        return "bg-red-500"
      case "inspection":
        return "bg-yellow-500"
      case "cleaning":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Calendar</h2>
      </div>
      <Calendar
        mode="single"
        selected={selectedDate || undefined}
        onSelect={handleDateSelect}
        className={className}
        components={{
          DayContent: ({ date }) => {
            if (!isValid(date)) {
              console.error("Invalid date:", date)
              return <div>Invalid Date</div>
            }
            const dayEvents = events.filter(
              (event) => isValid(event.date) && format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"),
            )
            return (
              <div className="relative w-full h-full">
                <div>{format(date, "d")}</div>
                {dayEvents.length > 0 && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`w-2 h-2 rounded-full cursor-pointer ${getEventColor(event.type)}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEventClick(event)
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          },
        }}
      />

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedEvent ? "Event Details" : "Add Event"}</DialogTitle>
          </DialogHeader>
          <EventForm
            event={
              selectedEvent || { id: "", date: selectedDate || new Date(), type: "other", title: "", description: "" }
            }
            onSave={handleSaveEvent}
            onDelete={() => setShowDeleteConfirm(true)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteEvent}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

interface EventFormProps {
  event: DashboardEvent
  onSave: (event: DashboardEvent) => void
  onDelete: () => void
}

function EventForm({ event, onSave, onDelete }: EventFormProps) {
  const [formData, setFormData] = useState(event)

  const handleSave = () => {
    if (isValid(formData.date)) {
      onSave({
        ...formData,
        id: formData.id || Math.random().toString(36).substr(2, 9),
      })
    } else {
      console.error("Invalid date in form data:", formData.date)
    }
  }

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label>Event Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value as DashboardEvent["type"] })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="repair">Repair</SelectItem>
            <SelectItem value="inspection">Inspection</SelectItem>
            <SelectItem value="cleaning">Cleaning</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label>Title</Label>
        <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
      </div>
      <div className="grid gap-2">
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>
      <div className="flex justify-between">
        <Button onClick={handleSave}>{formData.id ? "Update" : "Add"} Event</Button>
        {formData.id && (
          <Button variant="destructive" onClick={onDelete}>
            Delete Event
          </Button>
        )}
        <Button variant="outline" onClick={() => setShowDialog(false)}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

