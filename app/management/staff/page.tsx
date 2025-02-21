"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Staff {
  id: string
  code: string
  name: string
  position: string
  department: string
  status: "active" | "inactive"
}

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [staff, setStaff] = useState<Staff[]>([
    {
      id: "1",
      code: "056001",
      name: "อดิศร จุนหน่อง",
      position: "วิศวกร",
      department: "maintenance",
      status: "active",
    },
    {
      id: "2",
      code: "056002",
      name: "โจดี้ สายบัวใหล",
      position: "ช่างยนต์",
      department: "electric",
      status: "active",
    },
  ])
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [staffToDelete, setStaffToDelete] = useState<Staff | null>(null)
  const [showAddEditDialog, setShowAddEditDialog] = useState(false)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleAdd = () => {
    setEditingStaff(null)
    setShowAddEditDialog(true)
  }

  const handleEdit = (staff: Staff) => {
    setEditingStaff(staff)
    setShowAddEditDialog(true)
  }

  const handleDelete = (staff: Staff) => {
    setStaffToDelete(staff)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (staffToDelete) {
      setStaff(staff.filter((s) => s.id !== staffToDelete.id))
      setShowDeleteDialog(false)
      setStaffToDelete(null)
    }
  }

  const handleSave = (formData: Omit<Staff, "id">) => {
    if (editingStaff) {
      setStaff(staff.map((s) => (s.id === editingStaff.id ? { ...s, ...formData } : s)))
    } else {
      const newStaff = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
      }
      setStaff([...staff, newStaff])
    }
    setShowAddEditDialog(false)
    setEditingStaff(null)
  }

  const filteredStaff = staff.filter(
    (s) =>
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Staff Management</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="ค้นหารหัส พนักงาน"
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
              <TableHead className="text-white">รหัสพนักงาน</TableHead>
              <TableHead className="text-white">ชื่อพนักงาน</TableHead>
              <TableHead className="text-white">ตำแหน่ง</TableHead>
              <TableHead className="text-white">แผนก</TableHead>
              <TableHead className="text-white">ใช้งานล่าสุด</TableHead>
              <TableHead className="text-white text-right">แก้ไข</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStaff.map((staffMember, index) => (
              <TableRow key={staffMember.id} className={index % 2 === 1 ? "bg-blue-50" : ""}>
                <TableCell>{staffMember.code}</TableCell>
                <TableCell>{staffMember.name}</TableCell>
                <TableCell>{staffMember.position}</TableCell>
                <TableCell>{staffMember.department}</TableCell>
                <TableCell>{staffMember.status === "active" ? "กำลังใช้งาน" : "ไม่ได้ใช้งาน"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(staffMember)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(staffMember)}>
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
            <DialogTitle>{editingStaff ? "แก้ไขพนักงาน" : "เพิ่มพนักงาน"}</DialogTitle>
          </DialogHeader>
          <StaffForm staff={editingStaff} onSave={handleSave} onCancel={() => setShowAddEditDialog(false)} />
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

interface StaffFormProps {
  staff: Staff | null
  onSave: (formData: Omit<Staff, "id">) => void
  onCancel: () => void
}

function StaffForm({ staff, onSave, onCancel }: StaffFormProps) {
  const [formData, setFormData] = useState({
    code: staff?.code || "",
    name: staff?.name || "",
    position: staff?.position || "",
    department: staff?.department || "",
    status: staff?.status || "active",
  })
  const [autoGeneratedCode, setAutoGeneratedCode] = useState("")

  useEffect(() => {
    // Generate a random 6-digit code
    const newCode = Math.floor(100000 + Math.random() * 900000).toString()
    setAutoGeneratedCode(newCode)
    setFormData((prev) => ({ ...prev, code: newCode }))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="code">รหัสพนักงาน</Label>
        <Input id="code" value={autoGeneratedCode} readOnly className="bg-gray-100" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="name">ชื่อพนักงาน</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="position">ตำแหน่ง</Label>
        <Select value={formData.position} onValueChange={(value) => setFormData({ ...formData, position: value })}>
          <SelectTrigger id="position">
            <SelectValue placeholder="เลือกตำแหน่ง" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="วิศวกรฝ่ายผลิต">วิศวกรฝ่ายผลิต</SelectItem>
            <SelectItem value="ช่างซ่อมบำรุงเครื่องจักร">ช่างซ่อมบำรุงเครื่องจักร</SelectItem>
            <SelectItem value="ช่างเครื่องยนต์">ช่างเครื่องยนต์</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="department">แผนก</Label>
        <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
          <SelectTrigger id="department">
            <SelectValue placeholder="เลือกแผนก" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="maintenance">mantanance (ซ่อมบำรุงเครื่องจักร)</SelectItem>
            <SelectItem value="electric">electric (ไฟฟ้า)</SelectItem>
            <SelectItem value="bachelor">bachelor (ควบคุม)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label>สถานะ</Label>
        <RadioGroup
          value={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value as "active" | "inactive" })}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="active" id="active" />
            <Label htmlFor="active">กำลังใช้งาน</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="inactive" id="inactive" />
            <Label htmlFor="inactive">ไม่ได้ใช้งาน</Label>
          </div>
        </RadioGroup>
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

