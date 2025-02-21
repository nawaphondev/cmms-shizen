"use client"

import type React from "react"

import { useState } from "react"
import { Search, Pencil, Trash2, Plus } from "lucide-react"
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Machine {
  id: string
  code: string
  status: string
  location: {
    building: string
    zone: string
  }
  supervisor: string
}

export default function MachinesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [machines, setMachines] = useState<Machine[]>([
    {
      id: "1",
      code: "056001",
      status: "สิ้นเปลว",
      location: {
        building: "ชั้นที่ 1",
        zone: "โซน A",
      },
      supervisor: "อดิศร จุนเหนง",
    },
    {
      id: "2",
      code: "056002",
      status: "หยุดซ่อม",
      location: {
        building: "ชั้นที่ 3",
        zone: "โซน C",
      },
      supervisor: "โจดี้ สายน้ำไหล",
    },
    {
      id: "3",
      code: "056003",
      status: "เริ่มซ่อม",
      location: {
        building: "ชั้นที่ 4",
        zone: "โซน E",
      },
      supervisor: "มานะ โจตี้",
    },
  ])
  const [editingMachine, setEditingMachine] = useState<Machine | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [machineToDelete, setMachineToDelete] = useState<Machine | null>(null)
  const [showAddEditDialog, setShowAddEditDialog] = useState(false)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleAdd = () => {
    setEditingMachine(null)
    setShowAddEditDialog(true)
  }

  const handleEdit = (machine: Machine) => {
    setEditingMachine(machine)
    setShowAddEditDialog(true)
  }

  const handleDelete = (machine: Machine) => {
    setMachineToDelete(machine)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (machineToDelete) {
      setMachines(machines.filter((m) => m.id !== machineToDelete.id))
      setShowDeleteDialog(false)
      setMachineToDelete(null)
    }
  }

  const handleSave = (formData: Omit<Machine, "id">) => {
    if (editingMachine) {
      setMachines(machines.map((m) => (m.id === editingMachine.id ? { ...m, ...formData } : m)))
    } else {
      const newMachine = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
      }
      setMachines([...machines, newMachine])
    }
    setShowAddEditDialog(false)
    setEditingMachine(null)
  }

  const filteredMachines = machines.filter(
    (m) =>
      m.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.supervisor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Machines Management</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="ค้นหารหัสเครื่อง"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
          <Button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            เพิ่ม
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#8B5CF6]">
              <TableHead className="text-white">รหัสเครื่อง</TableHead>
              <TableHead className="text-white">สถานะ</TableHead>
              <TableHead className="text-white">สถานที่</TableHead>
              <TableHead className="text-white">ผู้ดูแล</TableHead>
              <TableHead className="text-white text-right">แก้ไข</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMachines.map((machine, index) => (
              <TableRow key={machine.id} className={index % 2 === 1 ? "bg-blue-50" : ""}>
                <TableCell>{machine.code}</TableCell>
                <TableCell>{machine.status}</TableCell>
                <TableCell>
                  {machine.location.building}
                  <br />
                  {machine.location.zone}
                </TableCell>
                <TableCell>{machine.supervisor}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(machine)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(machine)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showAddEditDialog} onOpenChange={setShowAddEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingMachine ? "แก้ไขเครื่องจักร" : "เพิ่มเครื่องจักร"}</DialogTitle>
          </DialogHeader>
          <MachineForm machine={editingMachine} onSave={handleSave} onCancel={() => setShowAddEditDialog(false)} />
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

interface MachineFormProps {
  machine: Machine | null
  onSave: (formData: Omit<Machine, "id">) => void
  onCancel: () => void
}

function MachineForm({ machine, onSave, onCancel }: MachineFormProps) {
  const [formData, setFormData] = useState({
    code: machine?.code || "",
    status: machine?.status || "",
    location: {
      building: machine?.location.building || "",
      zone: machine?.location.zone || "",
    },
    supervisor: machine?.supervisor || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="code">รหัสเครื่อง</Label>
        <Input
          id="code"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="status">สถานะ</Label>
        <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
          <SelectTrigger id="status">
            <SelectValue placeholder="เลือกสถานะ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="สิ้นเปลว">สิ้นเปลว</SelectItem>
            <SelectItem value="หยุดซ่อม">หยุดซ่อม</SelectItem>
            <SelectItem value="เริ่มซ่อม">เริ่มซ่อม</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="building">ชั้น</Label>
        <Select
          value={formData.location.building}
          onValueChange={(value) => setFormData({ ...formData, location: { ...formData.location, building: value } })}
        >
          <SelectTrigger id="building">
            <SelectValue placeholder="เลือกชั้น" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ชั้นที่ 1">ชั้นที่ 1</SelectItem>
            <SelectItem value="ชั้นที่ 2">ชั้นที่ 2</SelectItem>
            <SelectItem value="ชั้นที่ 3">ชั้นที่ 3</SelectItem>
            <SelectItem value="ชั้นที่ 4">ชั้นที่ 4</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="zone">โซน</Label>
        <Select
          value={formData.location.zone}
          onValueChange={(value) => setFormData({ ...formData, location: { ...formData.location, zone: value } })}
        >
          <SelectTrigger id="zone">
            <SelectValue placeholder="เลือกโซน" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="โซน A">โซน A</SelectItem>
            <SelectItem value="โซน B">โซน B</SelectItem>
            <SelectItem value="โซน C">โซน C</SelectItem>
            <SelectItem value="โซน D">โซน D</SelectItem>
            <SelectItem value="โซน E">โซน E</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="supervisor">ผู้ดูแล</Label>
        <Select value={formData.supervisor} onValueChange={(value) => setFormData({ ...formData, supervisor: value })}>
          <SelectTrigger id="supervisor">
            <SelectValue placeholder="เลือกผู้ดูแล" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="อดิศร จุนเหนง">อดิศร จุนเหนง</SelectItem>
            <SelectItem value="โจดี้ สายน้ำไหล">โจดี้ สายน้ำไหล</SelectItem>
            <SelectItem value="มานะ โจตี้">มานะ โจตี้</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          ยกเลิก
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          บันทึก
        </Button>
      </div>
    </form>
  )
}

