"use client"

import { useState } from "react"
import { Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

interface Sensor {
  id: string
  code: string
  type: string
  name: string
  details: string
  quantity: number
  status: "กำลังดำเนินการ" | "เบิกแล้ว"
}

interface SensorDetails {
  id: string
  code: string
  type: string
  name: string
  details: string
  quantity: number
  status: "กำลังดำเนินการ" | "เบิกแล้ว"
  // Add other details as needed
}

export default function SensorsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [sensors, setSensors] = useState<Sensor[]>([
    {
      id: "1",
      code: "Req00036",
      type: "วัสดุที่ใช้ในการซ่อม",
      name: "อ๊อกทางสำหรับรถขนส่งภายในโรงงาน",
      details: "เบิก",
      quantity: 4,
      status: "กำลังดำเนินการ",
    },
    {
      id: "2",
      code: "Req00030",
      type: "วัสดุที่ใช้ในการบำรุงรักษา",
      name: "น้ำมันเครื่อง 15W-40 ขนาด4ลิตร",
      details: "เบิก",
      quantity: 5,
      status: "เบิกแล้ว",
    },
    {
      id: "3",
      code: "Req00023",
      type: "วัสดุที่ใช้ในการซ่อม",
      name: "มอเตอร์พัดลม 10 W",
      details: "เบิก",
      quantity: 2,
      status: "เบิกแล้ว",
    },
  ])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [sensorToDelete, setSensorToDelete] = useState<Sensor | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleDelete = (sensor: Sensor) => {
    setSensorToDelete(sensor)
    setShowDeleteDialog(true)
  }

  const confirmDelete = async () => {
    if (sensorToDelete) {
      try {
        const response = await fetch(`/api/sensors/${sensorToDelete.id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          setSensors(sensors.filter((s) => s.id !== sensorToDelete.id))
          setShowDeleteDialog(false)
          setSensorToDelete(null)
        } else {
          console.error("Failed to delete sensor")
          // Handle error appropriately, e.g., show an error message to the user
        }
      } catch (error) {
        console.error("Error deleting sensor:", error)
        // Handle error appropriately
      }
    }
  }

  const handleShowDetails = (sensor: Sensor) => {
    setSelectedSensor(sensor)
    setShowDetailsDialog(true)
  }

  const filteredSensors = sensors.filter(
    (s) =>
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <Button
          variant="default"
          className="bg-red-500 hover:bg-red-600 text-white"
          onClick={() => router.push("/management/inventory")}
        >
          คลังอุปกรณ์/อะไหล่
        </Button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="ค้นหารหัส ในคำขอ"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 w-[300px]"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#8B5CF6]">
              <TableHead className="text-white">รหัสในคำขอ</TableHead>
              <TableHead className="text-white">ประเภทอุปกรณ์</TableHead>
              <TableHead className="text-white">ชื่ออะไหล่/อุปกรณ์</TableHead>
              <TableHead className="text-white">รายละเอียด</TableHead>
              <TableHead className="text-white">จำนวน</TableHead>
              <TableHead className="text-white">สถานะในคำขอ</TableHead>
              <TableHead className="text-white text-right">แก้ไข</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSensors.map((sensor, index) => (
              <TableRow key={sensor.id} className={index % 2 === 1 ? "bg-blue-50" : ""}>
                <TableCell>{sensor.code}</TableCell>
                <TableCell>{sensor.type}</TableCell>
                <TableCell>{sensor.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => handleShowDetails(sensor)}
                  >
                    รายละเอียด
                  </Button>
                </TableCell>
                <TableCell>{sensor.quantity}</TableCell>
                <TableCell>
                  <span className={sensor.status === "เบิกแล้ว" ? "text-green-500" : "text-yellow-500"}>
                    {sensor.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(sensor)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>รายละเอียดคำขอ</DialogTitle>
          </DialogHeader>
          {selectedSensor && (
            <div className="space-y-4">
              <div>
                <span className="font-semibold">รหัสในคำขอ:</span> {selectedSensor.code}
              </div>
              <div>
                <span className="font-semibold">ประเภทอุปกรณ์:</span> {selectedSensor.type}
              </div>
              <div>
                <span className="font-semibold">ชื่ออะไหล่/อุปกรณ์:</span> {selectedSensor.name}
              </div>
              <div>
                <span className="font-semibold">จำนวน:</span> {selectedSensor.quantity}
              </div>
              <div>
                <span className="font-semibold">สถานะ:</span> {selectedSensor.status}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
            <AlertDialogDescription>คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>ยืนยัน</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

