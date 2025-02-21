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

interface SparePart {
  id: string
  code: string
  type: string
  name: string
  status: "กำลังใช้งาน" | "ไม่ได้ใช้งาน"
}

export default function SparePartsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [spareParts, setSpareParts] = useState<SparePart[]>([
    {
      id: "1",
      code: "SS001",
      type: "ตรวจจับการเคลื่อนที่",
      name: "รถบรรทุกอะไหล่คันที่1",
      status: "กำลังใช้งาน",
    },
    {
      id: "2",
      code: "SS002",
      type: "ตรวจจับการทำงาน",
      name: "เครื่องหล่อละไหล่1",
      status: "กำลังใช้งาน",
    },
    {
      id: "3",
      code: "SS003",
      type: "ตรวจจับการทำงาน",
      name: "เครื่องหล่อละไหล่2",
      status: "กำลังใช้งาน",
    },
  ])
  const [editingSparePart, setEditingSparePart] = useState<SparePart | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [sparePartToDelete, setSparePartToDelete] = useState<SparePart | null>(null)
  const [showAddEditDialog, setShowAddEditDialog] = useState(false)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleAdd = () => {
    setEditingSparePart(null)
    setShowAddEditDialog(true)
  }

  const handleEdit = (sparePart: SparePart) => {
    setEditingSparePart(sparePart)
    setShowAddEditDialog(true)
  }

  const handleDelete = (sparePart: SparePart) => {
    setSparePartToDelete(sparePart)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (sparePartToDelete) {
      setSpareParts(spareParts.filter((sp) => sp.id !== sparePartToDelete.id))
      setShowDeleteDialog(false)
      setSparePartToDelete(null)
    }
  }

  const handleSave = (formData: Omit<SparePart, "id">) => {
    if (editingSparePart) {
      setSpareParts(spareParts.map((sp) => (sp.id === editingSparePart.id ? { ...sp, ...formData } : sp)))
    } else {
      const newSparePart = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
      }
      setSpareParts([...spareParts, newSparePart])
    }
    setShowAddEditDialog(false)
    setEditingSparePart(null)
  }

  const filteredSpareParts = spareParts.filter(
    (sp) =>
      sp.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sp.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Spare Parts Management</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="ค้นหารหัส อุปกรณ์"
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
              <TableHead className="text-white">รหัสอุปกรณ์</TableHead>
              <TableHead className="text-white">ประเภทอุปกรณ์</TableHead>
              <TableHead className="text-white">ชื่อเครื่องจักร/อุปกรณ์</TableHead>
              <TableHead className="text-white">สถานะ</TableHead>
              <TableHead className="text-white text-right">แก้ไข</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSpareParts.map((sparePart, index) => (
              <TableRow key={sparePart.id} className={index % 2 === 1 ? "bg-blue-50" : ""}>
                <TableCell>{sparePart.code}</TableCell>
                <TableCell>{sparePart.type}</TableCell>
                <TableCell>{sparePart.name}</TableCell>
                <TableCell>{sparePart.status}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(sparePart)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(sparePart)}>
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
            <DialogTitle>{editingSparePart ? "แก้ไขอะไหล่" : "เพิ่มอะไหล่"}</DialogTitle>
          </DialogHeader>
          <SparePartForm
            sparePart={editingSparePart}
            onSave={handleSave}
            onCancel={() => setShowAddEditDialog(false)}
          />
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

interface SparePartFormProps {
  sparePart: SparePart | null
  onSave: (formData: Omit<SparePart, "id">) => void
  onCancel: () => void
}

function SparePartForm({ sparePart, onSave, onCancel }: SparePartFormProps) {
  const [formData, setFormData] = useState({
    code: sparePart?.code || "",
    type: sparePart?.type || "",
    name: sparePart?.name || "",
    status: sparePart?.status || "กำลังใช้งาน",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="code">รหัสอุปกรณ์</Label>
        <Input
          id="code"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="type">ประเภทอุปกรณ์</Label>
        <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
          <SelectTrigger id="type">
            <SelectValue placeholder="เลือกประเภทอุปกรณ์" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ตรวจจับการเคลื่อนที่">ตรวจจับการเคลื่อนที่</SelectItem>
            <SelectItem value="ตรวจจับการทำงาน">ตรวจจับการทำงาน</SelectItem>
            <SelectItem value="ตรวจจับอุณหภูมิ">ตรวจจับอุณหภูมิ</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="name">ชื่อเครื่องจักร/อุปกรณ์</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="status">สถานะ</Label>
        <Select
          value={formData.status}
          onValueChange={(value: "กำลังใช้งาน" | "ไม่ได้ใช้งาน") => setFormData({ ...formData, status: value })}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="เลือกสถานะ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="กำลังใช้งาน">กำลังใช้งาน</SelectItem>
            <SelectItem value="ไม่ได้ใช้งาน">ไม่ได้ใช้งาน</SelectItem>
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

