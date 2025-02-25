"use client"

import { useState } from "react"
import { format, addDays } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DashboardCalendar } from "@/components/dashboard-calendar"
import { EquipmentCard } from "@/components/equipment-card"
import { StatusCard } from "@/components/status-card"
import { BarChart } from "@/components/bar-chart"
import { RepairRequestForm } from "@/components/repair-request-form"
import type { DashboardEvent, Equipment } from "@/types/dashboard"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAuth } from "@/lib/auth"

const equipmentList: Equipment[] = [
  {
    id: "machines",
    title: "เครื่องจักร",
    color: "yellow",
    stats: {
      measurement: 0,
      inspection: 5,
      cleaning: 3,
      checking: 2,
      lubrication: 1,
    },
  },
  {
    id: "utilities",
    title: "ระบบสาธารณูปโภค",
    color: "pink",
    stats: {
      measurement: 0,
      inspection: 5,
      cleaning: 3,
      checking: 2,
      lubrication: 1,
    },
  },
  {
    id: "factory",
    title: "อุปกรณ์โรงงาน",
    color: "red",
    stats: {
      measurement: 0,
      inspection: 5,
      cleaning: 3,
      checking: 2,
      lubrication: 1,
    },
  },
  {
    id: "new-machines",
    title: "แจ้งสร้างเครื่องจักร/อุปกรณ์",
    color: "blue",
    stats: {
      measurement: 0,
      inspection: 5,
      cleaning: 3,
      checking: 2,
      lubrication: 1,
    },
  },
  {
    id: "office",
    title: "เครื่องใช้สำนักงาน",
    color: "mint",
    stats: {
      measurement: 0,
      inspection: 5,
      cleaning: 3,
      checking: 2,
      lubrication: 1,
    },
  },
  {
    id: "others",
    title: "อื่นๆ",
    color: "purple",
    stats: {
      measurement: 0,
      inspection: 5,
      cleaning: 3,
      checking: 2,
      lubrication: 1,
    },
  },
]

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<[Date | undefined, Date | undefined]>([
    new Date(2021, 2, 18),
    new Date(2021, 2, 28),
  ])
  const [events, setEvents] = useState<DashboardEvent[]>([
    {
      id: "1",
      date: new Date(2022, 3, 11),
      type: "maintenance",
      title: "Maintenance Check",
    },
    {
      id: "2",
      date: new Date(2022, 3, 11),
      type: "repair",
      title: "Emergency Repair",
    },
    {
      id: "3",
      date: new Date(2022, 3, 13),
      type: "inspection",
      title: "Regular Inspection",
    },
  ])

  const handleAddEvent = (date: Date) => {
    const newEvent: DashboardEvent = {
      id: Math.random().toString(36).substr(2, 9),
      date,
      type: "other",
      title: "New Event",
    }
    setEvents([...events, newEvent])
  }

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 20),
  })

  const { user } = useAuth()

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">

          <Dialog>
            <DialogTrigger asChild>
              <Button>+ Repair Request</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>New Repair Request</DialogTitle>
              </DialogHeader>
              <RepairRequestForm />
            </DialogContent>
          </Dialog>


        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Select defaultValue="all-case">
          <SelectTrigger className="w-[200px] bg-green-100">
            <SelectValue placeholder="ประเภทซ่อม" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-case">All case</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-status">
          <SelectTrigger className="w-[200px] bg-red-100">
            <SelectValue placeholder="สถานะใบแจ้งซ่อม" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-status">All Status</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-machine">
          <SelectTrigger className="w-[200px] bg-yellow-100">
            <SelectValue placeholder="สถานะเครื่องจักร" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-machine">All Status</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-6">
              <div className="w-[400px]">
                <h2 className="text-lg font-semibold mb-2">All case: 178 Case</h2>
                <DashboardCalendar
                  events={events}
                  onAddEvent={(newEvent) => {
                    setEvents([...events, newEvent])
                  }}
                  onUpdateEvent={(updatedEvent) => {
                    setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)))
                  }}
                  onDeleteEvent={(eventId) => {
                    setEvents(events.filter((event) => event.id !== eventId))
                  }}
                  className="border rounded-md p-3 text-lg"
                />
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <StatusCard title="สำเร็จ" value={125} label="Case" className="bg-pink-50" />
                  <StatusCard title="รอดำเนินการ" value={23} label="Case" className="bg-pink-50" />
                  <StatusCard title="กำลังดำเนินการ" value={30} label="Case" className="bg-pink-50" />
                </div>
                <BarChart className="h-[300px]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          {equipmentList.map((equipment) => (
            <EquipmentCard key={equipment.id} title={equipment.title} color={equipment.color} stats={equipment.stats} />
          ))}
        </div>
      </div>
    </div>
  )
}

