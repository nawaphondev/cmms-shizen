/**
 * Required API Endpoints:
 * GET /api/work-types - For fetching all work types
 * Response: Array<WorkType>
 *
 * POST /api/work-types - For creating a new work type
 * Payload: { code: string, name: string, details: string, status: 'active' | 'inactive' }
 * Response: WorkType
 *
 * PUT /api/work-types/:id - For updating a work type
 * Payload: Partial<WorkType>
 * Response: WorkType
 *
 * DELETE /api/work-types/:id - For deleting a work type
 * Response: { success: boolean }
 */
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
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface WorkType {
  id: string
  code: string
  name: string
  details: string
  status: "active" | "inactive"
}

export default function WorkTypesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [workTypes, setWorkTypes] = useState<WorkType[]>([
    {
      id: "1",
      code: "CLE001",
      name: "การทำความสะอาด",
      details: "xxxxxxx",
      status: "active",
    },
    {
      id: "2",
      code: "LUI002",
      name: "การเติมสารหล่อลื่น",
      details: "xxxxxxx",
      status: "inactive",
    },
  ])
  const [editingWorkType, setEditingWorkType] = useState<WorkType | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [workTypeToDelete, setWorkTypeToDelete] = useState<WorkType | null>(null)
  const [showAddEditDialog, setShowAddEditDialog] = useState(false)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleAdd = () => {
    setEditingWorkType(null)
    setShowAddEditDialog(true)
  }

  const handleEdit = (workType: WorkType) => {
    setEditingWorkType(workType)
    setShowAddEditDialog(true)
  }

  const handleDelete = (workType: WorkType) => {
    setWorkTypeToDelete(workType)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (workTypeToDelete) {
      setWorkTypes(workTypes.filter((wt) => wt.id !== workTypeToDelete.id))
      setShowDeleteDialog(false)
      setWorkTypeToDelete(null)
    }
  }

  const handleSave = (formData: Omit<WorkType, "id">) => {
    if (editingWorkType) {
      setWorkTypes(workTypes.map((wt) => (wt.id === editingWorkType.id ? { ...wt, ...formData } : wt)))
    } else {
      const newWorkType = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
      }
      setWorkTypes([...workTypes, newWorkType])
    }
    setShowAddEditDialog(false)
    setEditingWorkType(null)
  }

  const filteredWorkTypes = workTypes.filter(
    (workType) =>
      workType.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workType.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Work Types</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="ค้นหา ชนิดของรหัส"
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
              <TableHead className="text-white">ชนิดรหัส</TableHead>
              <TableHead className="text-white">ชนิดของชื่อ</TableHead>
              <TableHead className="text-white">รายละเอียด</TableHead>
              <TableHead className="text-white">สถานะ</TableHead>
              <TableHead className="text-white text-right">แก้ไข</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWorkTypes.map((workType, index) => (
              <TableRow key={workType.id} className={index % 2 === 1 ? "bg-blue-50" : ""}>
                <TableCell>{workType.code}</TableCell>
                <TableCell>{workType.name}</TableCell>
                <TableCell>{workType.details}</TableCell>
                <TableCell>{workType.status === "active" ? "ใช้งานอยู่" : "ไม่ใช้งาน"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(workType)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(workType)}>
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
            <DialogTitle>{editingWorkType ? "แก้ไขชนิด���าน" : "เพิ่มชนิดงาน"}</DialogTitle>
          </DialogHeader>
          <WorkTypeForm workType={editingWorkType} onSave={handleSave} onCancel={() => setShowAddEditDialog(false)} />
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

interface WorkTypeFormProps {
  workType: WorkType | null
  onSave: (formData: Omit<WorkType, "id">) => void
  onCancel: () => void
}

function WorkTypeForm({ workType, onSave, onCancel }: WorkTypeFormProps) {
  const [formData, setFormData] = useState({
    code: workType?.code || "",
    name: workType?.name || "",
    details: workType?.details || "",
    status: workType?.status || "inactive",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, status: event.target.value as "active" | "inactive" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="code">ชนิดรหัส</Label>
        <Input
          id="code"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="name">ชนิดของชื่อ</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="details">รายละเอียด</Label>
        <Textarea
          id="details"
          value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label>กระบวนการ:</Label>
        <RadioGroup value={formData.status} onChange={handleStatusChange} className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="active" id="active" />
            <Label htmlFor="active">กำลังใช้งาน</Label>
          </div>
          <div className="flex items-center gap-2">
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

