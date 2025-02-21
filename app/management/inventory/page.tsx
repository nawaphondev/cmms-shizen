"use client"

import type React from "react"
import { useState } from "react"
import { Search, Plus, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

interface InventoryItem {
  id: string
  name: string
  type: string
  details: string
  addedQuantity: number
  withdrawnQuantity: number
  total: number
  addedBy: string // Added new field
}

export default function InventoryPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: "1",
      name: "บิดา",
      type: "วัสดุที่ใช้ในการซ่อม",
      details: "XXXXX",
      addedQuantity: 4,
      withdrawnQuantity: 0,
      total: 74,
      addedBy: "John Doe",
    },
    {
      id: "2",
      name: "น้ำมันเครื่อง 20W-50",
      type: "วัสดุที่ใช้ในการบำรุงรักษา",
      details: "XXXX",
      addedQuantity: 5,
      withdrawnQuantity: 0,
      total: 255,
      addedBy: "Jane Doe",
    },
    {
      id: "3",
      name: "ล้อยาง175/65R15",
      type: "วัสดุที่ใช้ในการซ่อม",
      details: "XXXX",
      addedQuantity: 2,
      withdrawnQuantity: 0,
      total: 359,
      addedBy: "Peter Pan",
    },
  ])

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleShowDetails = (item: InventoryItem) => {
    setSelectedItem(item)
    setShowDetailsDialog(true)
  }

  const handleAddItem = (formData: Omit<InventoryItem, "id">) => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
    }
    setInventory([...inventory, newItem])
    setShowAddDialog(false)
  }

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push("/management/sensors")} className="p-2">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-semibold">คลังอุปกรณ์/อะไหล่</h1>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input
              placeholder="ค้นหาอะไหล่/อุปกรณ์"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
          <Button
            onClick={() => setShowAddDialog(true)}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            เพิ่ม
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#8B5CF6]">
              <TableHead className="text-white">ชื่ออะไหล่/อุปกรณ์</TableHead>
              <TableHead className="text-white">ประเภท</TableHead>
              <TableHead className="text-white">รายละเอียดอะไหล่/อุปกรณ์</TableHead>
              <TableHead className="text-white">รายละเอียด</TableHead>
              <TableHead className="text-white text-center">จำนวนที่เพิ่ม</TableHead>
              <TableHead className="text-white text-center">จำนวนที่เบิก</TableHead>
              <TableHead className="text-white text-center">ยอดรวม</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item, index) => (
              <TableRow key={item.id} className={index % 2 === 1 ? "bg-blue-50" : ""}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.details}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => handleShowDetails(item)}
                  >
                    รายละเอียด
                  </Button>
                </TableCell>
                <TableCell className="text-center">{item.addedQuantity}</TableCell>
                <TableCell className="text-center">{item.withdrawnQuantity}</TableCell>
                <TableCell className="text-center">{item.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>เพิ่มอะไหล่/อุปกรณ์</DialogTitle>
          </DialogHeader>
          <AddInventoryForm onSubmit={handleAddItem} onCancel={() => setShowAddDialog(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>รายละเอียดอะไหล่/อุปกรณ์</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div>
                <span className="font-semibold">ชื่ออะไหล่/อุปกรณ์:</span> {selectedItem.name}
              </div>
              <div>
                <span className="font-semibold">ประเภท:</span> {selectedItem.type}
              </div>
              <div>
                <span className="font-semibold">รายละเอียด:</span> {selectedItem.details}
              </div>
              <div>
                <span className="font-semibold">จำนวนที่เพิ่ม:</span> {selectedItem.addedQuantity}
              </div>
              <div>
                <span className="font-semibold">จำนวนที่เบิก:</span> {selectedItem.withdrawnQuantity}
              </div>
              <div>
                <span className="font-semibold">ยอดรวม:</span> {selectedItem.total}
              </div>
              <div>
                <span className="font-semibold">ข้อมูลโดย:</span> {selectedItem.addedBy}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface AddInventoryFormProps {
  onSubmit: (data: Omit<InventoryItem, "id">) => void
  onCancel: () => void
}

function AddInventoryForm({ onSubmit, onCancel }: AddInventoryFormProps) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    details: "",
    addedQuantity: 0,
    withdrawnQuantity: 0,
    total: 0,
    addedBy: user?.name || "Admin",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="name">ชื่ออะไหล่/อุปกรณ์</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="type">ประเภท</Label>
        <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
          <SelectTrigger id="type">
            <SelectValue placeholder="เลือกประเภท" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="วัสดุที่ใช้ในการซ่อม">วัสดุที่ใช้ในการซ่อม</SelectItem>
            <SelectItem value="วัสดุที่ใช้ในการบำรุงรักษา">วัสดุที่ใช้ในการบำรุงรักษา</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="details">รายละเอียด</Label>
        <Input
          id="details"
          value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="addedQuantity">จำนวนที่เพิ่ม</Label>
        <Input
          id="addedQuantity"
          type="number"
          min="0"
          value={formData.addedQuantity}
          onChange={(e) => {
            const value = Number.parseInt(e.target.value)
            setFormData({
              ...formData,
              addedQuantity: value,
              total: value - formData.withdrawnQuantity,
            })
          }}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="withdrawnQuantity">จำนวนที่เบิก</Label>
        <Input
          id="withdrawnQuantity"
          type="number"
          min="0"
          value={formData.withdrawnQuantity}
          onChange={(e) => {
            const value = Number.parseInt(e.target.value)
            setFormData({
              ...formData,
              withdrawnQuantity: value,
              total: formData.addedQuantity - value,
            })
          }}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="addedBy">ข้อมูลโดย</Label>
        <Input id="addedBy" value={user?.name || "Admin"} readOnly />
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

