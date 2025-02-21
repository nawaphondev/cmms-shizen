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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface GroupPermission {
  id: string
  code: string
  department: string
  name: string
  description: string
  status: "active" | "inactive"
}

export default function PermissionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [permissions, setPermissions] = useState<GroupPermission[]>([
    {
      id: "1",
      code: "G00001",
      department: "ฝ่ายวิศวกรรม",
      name: "วิศวกร",
      description: "คำอธิบายวิศวกร",
      status: "active",
    },
    {
      id: "2",
      code: "G00002",
      department: "ฝ่ายช่างยนต์",
      name: "ช่างยนต์",
      description: "คำอธิบายช่างยนต์",
      status: "active",
    },
    {
      id: "3",
      code: "G00003",
      department: "ฝ่ายช่างไฟฟ้า",
      name: "ช่างไฟฟ้า",
      description: "คำอธิบายช่างไฟฟ้า",
      status: "inactive",
    },
  ])
  const [editingPermission, setEditingPermission] = useState<GroupPermission | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [permissionToDelete, setPermissionToDelete] = useState<GroupPermission | null>(null)
  const [showAddEditDialog, setShowAddEditDialog] = useState(false)

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleAdd = () => {
    setEditingPermission(null)
    setShowAddEditDialog(true)
  }

  const handleEdit = (permission: GroupPermission) => {
    setEditingPermission(permission)
    setShowAddEditDialog(true)
  }

  const handleDelete = (permission: GroupPermission) => {
    setPermissionToDelete(permission)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (permissionToDelete) {
      setPermissions(permissions.filter((p) => p.id !== permissionToDelete.id))
      setShowDeleteDialog(false)
      setPermissionToDelete(null)
    }
  }

  const handleSave = (formData: Omit<GroupPermission, "id">) => {
    if (editingPermission) {
      setPermissions(permissions.map((p) => (p.id === editingPermission.id ? { ...p, ...formData } : p)))
    } else {
      const newPermission = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
      }
      setPermissions([...permissions, newPermission])
    }
    setShowAddEditDialog(false)
    setEditingPermission(null)
  }

  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Group Permissions</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="ค้นหากลุ่ม"
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
              <TableHead className="text-white">รหัสกลุ่ม</TableHead>
              <TableHead className="text-white">แผนก</TableHead>
              <TableHead className="text-white">ชื่อกลุ่ม</TableHead>
              <TableHead className="text-white">คำอธิบาย</TableHead>
              <TableHead className="text-white">สถานะ</TableHead>
              <TableHead className="text-white text-right">แก้ไข</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPermissions.map((permission, index) => (
              <TableRow key={permission.id} className={index % 2 === 1 ? "bg-blue-50" : ""}>
                <TableCell>{permission.code}</TableCell>
                <TableCell>{permission.department}</TableCell>
                <TableCell>{permission.name}</TableCell>
                <TableCell>{permission.description}</TableCell>
                <TableCell>{permission.status === "active" ? "ใช้งานอยู่" : "ไม่ได้ใช้งานอยู่"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(permission)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(permission)}>
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
            <DialogTitle>{editingPermission ? "แก้ไขกลุ่ม" : "เพิ่มกลุ่ม"}</DialogTitle>
          </DialogHeader>
          <PermissionForm
            permission={editingPermission}
            permissions={permissions}
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

interface PermissionFormProps {
  permission: GroupPermission | null
  permissions: GroupPermission[]
  onSave: (formData: Omit<GroupPermission, "id">) => void
  onCancel: () => void
}

function PermissionForm({ permission, permissions, onSave, onCancel }: PermissionFormProps) {
  const [formData, setFormData] = useState({
    code: permission?.code || "",
    department: permission?.department || "",
    name: permission?.name || "",
    description: permission?.description || "",
    status: permission?.status || "active",
  })

  useEffect(() => {
    if (!permission) {
      const newCode = `G${String(permissions.length + 1).padStart(5, "0")}`
      setFormData((prev) => ({ ...prev, code: newCode }))
    }
  }, [permission, permissions.length])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="code">รหัสกลุ่ม</Label>
        <Input id="code" value={formData.code} readOnly className="bg-gray-100" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="department">แผนก</Label>
        <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
          <SelectTrigger id="department">
            <SelectValue placeholder="เลือกแผนก" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ฝ่ายวิศวกรรม">ฝ่ายวิศวกรรม</SelectItem>
            <SelectItem value="ฝ่ายช่างยนต์">ฝ่ายช่างยนต์</SelectItem>
            <SelectItem value="ฝ่ายช่างไฟฟ้า">ฝ่ายช่างไฟฟ้า</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="name">ชื่อกลุ่ม</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">คำอธิบาย</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="status">สถานะ</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value as "active" | "inactive" })}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="เลือกสถานะ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">ใช้งานอยู่</SelectItem>
            <SelectItem value="inactive">ไม่ได้ใช้งาน</SelectItem>
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

