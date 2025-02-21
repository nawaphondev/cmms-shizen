"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { SuccessDialog } from "@/components/success-dialog"
import { RejectionDialog } from "@/components/rejection-dialog"
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

interface SparePartsDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  repairId: string
}

interface Attachment {
  name: string
  attachedBy: string
}

export function SparePartsDetailDialog({ open, onOpenChange, repairId }: SparePartsDetailDialogProps) {
  const [attachments, setAttachments] = useState<Attachment[]>([{ name: "Detail1.png", attachedBy: "อานนท์" }])
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showRejectionDialog, setShowRejectionDialog] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [attachmentToDelete, setAttachmentToDelete] = useState<Attachment | null>(null)
  const [showCancelConfirmDialog, setShowCancelConfirmDialog] = useState(false) // Added state for cancel confirmation
  const [itemToDelete, setItemToDelete] = useState<number | null>(null) // Added state for item deletion confirmation

  const [deliveryStatus, setDeliveryStatus] = useState("normal")

  const [selectedSparePart, setSelectedSparePart] = useState("")
  const [quantity, setQuantity] = useState("")
  const [spareParts, setSpareParts] = useState<Record<string, Array<{ name: string; quantity: string }>>>({
    เครื่องจักร: [],
    อุปกรณ์โรงงาน: [],
    เครื่องใช้สำนักงาน: [],
    อื่นๆ: [],
  })
  const [descendingItems, setDescendingItems] = useState<Array<{ name: string; quantity: string }>>([])

  const sparePartsList = ["อะไหล่ 1", "อะไหล่ 2", "อะไหล่ 3", "อะไหล่ 4", "อะไหล่ 5"]

  const partsList = [
    "กรรไกร",
    "ค้อน",
    "คีมตัด",
    "คีมล็อค",
    "คีมปากแหลม",
    "ประแจ L สั้น",
    "ประจุดด L ยาว",
    "ประแจเลื่อน",
    "ประแจแหวนปากตาย",
    "ตลับเมตร",
    "มีดเตอร์วัดไฟ",
    "ไขควงรีด",
    "ไขควงตอก",
    "ไขควงไฟฟ้า",
    "ไขควงหัวแฉก",
    "ไฟฉาย",
    "อื่นๆ",
  ]

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddSparePart = () => {
    if (selectedSparePart && quantity) {
      setDescendingItems((prev) => [{ name: selectedSparePart, quantity }, ...prev])
      setSelectedSparePart("")
      setQuantity("")
    }
  }

  const handleRemoveSparePart = (section: string, index: number) => {
    setSpareParts((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }))
  }

  const determineSection = (partName: string) => {
    if (partName.includes("เค���ื่องจักร")) return "เครื่องจักร"
    if (partName.includes("โรงงาน")) return "อุปกรณ์โรงงาน"
    if (partName.includes("สำนักงาน")) return "เครื่องใช้สำนักงาน"
    return "อื่นๆ"
  }

  const handleConfirmClick = () => {
    setShowConfirmDialog(true)
  }

  const handleConfirm = () => {
    setShowConfirmDialog(false)
    setShowSuccessDialog(true)
  }

  const handleReject = (remark: string) => {
    setShowRejectionDialog(false)
    onOpenChange(false)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        setAttachments((prev) => [
          ...prev,
          {
            name: file.name,
            attachedBy: "อานนท์",
          },
        ])
      })
    }
    e.target.value = ""
  }

  const handleDeleteAttachment = (attachment: Attachment) => {
    setAttachmentToDelete(attachment)
    setShowDeleteConfirmation(true)
  }

  const confirmDeleteAttachment = () => {
    if (attachmentToDelete) {
      setAttachments((prev) => prev.filter((a) => a.name !== attachmentToDelete.name))
    }
    setShowDeleteConfirmation(false)
    setAttachmentToDelete(null)
  }

  const handleRemoveDescendingItem = (index: number) => {
    setDescendingItems((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label>เลขที่แจ้��ซ่อม :</Label>
              <span className="ml-2">{repairId}</span>
            </div>
            <div>
              <Label>ประเภทซ่อม :</Label>
              <span className="ml-2">อุปกรณ์โรงงาน</span>
            </div>
            <div>
              <Label>ส่วนงาน :</Label>
              <span className="ml-2">แผนกผลิตเครื่องขึ้นรูป</span>
            </div>
            <div>
              <Label>แผนก :</Label>
              <span className="ml-2">APD</span>
            </div>
            <div>
              <Label>รหัสเครื่องจักร :</Label>
              <span className="ml-2">M0001</span>
            </div>
            <div>
              <Label>ชื่อเครื่องจักร :</Label>
              <span className="ml-2">เครื่องขึ้นรูป 32 Oz.</span>
            </div>
            <div className="col-span-2">
              <Label>อาการเบื้องต้น :</Label>
              <span className="ml-2">ล้อกลายเหล็กหรอ ล้อแตก เบรกเสื่อม</span>
            </div>
            <div>
              <Label>สถานะเครื่อง :</Label>
              <span className="ml-2">Break Down</span>
            </div>
            <div>
              <Label>ความเร่งด่วน :</Label>
              <span className="ml-2">เร่งด่วนมาก</span>
            </div>
            <div>
              <Label>ผู้แจ้งซ่อม :</Label>
              <span className="ml-2">พงศกร</span>
            </div>
            <div>
              <Label>ผู้รับแจ้งซ่อม :</Label>
              <Select defaultValue="anon">
                <SelectTrigger>
                  <SelectValue placeholder="เลือกผู้รับแจ้ง" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anon">อานนท์</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>วันที่แจ้ง :</Label>
              <span className="ml-2">12/05/2021 17:50 น.</span>
            </div>
            <div className="col-span-2">
              <Label>สาเหตุ :</Label>
              <Input className="mt-2" />
            </div>
            <div className="col-span-2">
              <Label>วิธีแก้ไข :</Label>
              <Input className="mt-2" />
            </div>
          </div>

          <div className="mb-4">
            <Label>รายการเครื่องมือ :</Label>
            <div className="grid grid-cols-4 gap-4 mt-2">
              {partsList.map((part) => (
                <div key={part} className="flex items-center space-x-2">
                  <Checkbox id={part} />
                  <label htmlFor={part} className="text-sm">
                    {part}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <Label className="mb-2 block">รายการอะไหล่ :</Label>
            <div className="flex items-center gap-2 mb-4">
              <Select onValueChange={(value) => setSelectedSparePart(value)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="เลือกอะไหล่" />
                </SelectTrigger>
                <SelectContent>
                  {sparePartsList.map((part) => (
                    <SelectItem key={part} value={part}>
                      {part}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="จำนวน"
                className="w-[100px]"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Button onClick={handleAddSparePart}>
                <Plus className="h-4 w-4" />
                เพิ่ม
              </Button>
            </div>
            <div className="mb-4">
              <Label className="mb-2 block">รายการอะไหล่ที่เพิ่ม :</Label>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ชื่ออะไหล่</TableHead>
                    <TableHead>จำนวน</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {descendingItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => setItemToDelete(index)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <Label>รายการเอกสารแนบ :</Label>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileSelect}
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                multiple
              />
              <Button
                variant="outline"
                className="text-green-600 border-green-600"
                onClick={() => fileInputRef.current?.click()}
              >
                <Plus className="h-4 w-4 mr-2" />
                เพิ่ม
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Attach by</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attachments.map((file) => (
                  <TableRow key={file.name}>
                    <TableCell>{file.name}</TableCell>
                    <TableCell>{file.attachedBy}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteAttachment(file)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Label>ข้อมูลสถานะการซ่อม :</Label>
              <Select defaultValue="processing">
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="เลือกสถานะ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="processing">รอดำเนินการ</SelectItem>
                  <SelectItem value="waiting-parts">�������ออะไหล่</SelectItem>
                  <SelectItem value="in-progress">เริ่มดำเนินการซ่อม</SelectItem>
                  <SelectItem value="completed">ซ่อมสำเร็จ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>Update by</TableHead>
                  <TableHead>Update date</TableHead>
                  <TableHead>หมายเหตุ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>รอดำเนินการ</TableCell>
                  <TableCell>อานนท์</TableCell>
                  <TableCell>12/05/2021 18:50 น.</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>รออะไหล่</TableCell>
                  <TableCell>อานนท์</TableCell>
                  <TableCell>12/05/2021 18:50 น.</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>เริ่มดำเนินการซ่อม</TableCell>
                  <TableCell>อานนท์</TableCell>
                  <TableCell>12/05/2021 18:50 น.</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>reject</TableCell>
                  <TableCell>อานนท์</TableCell>
                  <TableCell>12/05/2021 18:50 น.</TableCell>
                  <TableCell>ข้อมูลผิดพลาด</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="mb-4">
            <Label>หมายเหตุ :</Label>
            <Input className="mt-2" />
          </div>

          <div className="mb-4">
            <Label>การส่งมอบ :</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="normal" />
                <Label htmlFor="normal">ใช้งานได้ปกติ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="pending" />
                <Label htmlFor="pending">ไม่สามารถใช้งานได้ ต้องดำเนินการซ่อมต่อ</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="safety-check" />
                <Label htmlFor="safety-check">ตรวจเช็คสภาพปลอดภัย</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="safety-failed" />
                <Label htmlFor="safety-failed">ตรวจเช็คสภาพไม่ปลอดภัย</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="no-foreign" />
                <Label htmlFor="no-foreign">ไม่พบสิ่งแปลกปลอมจากการซ่อม</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="foreign-found" />
                <Label htmlFor="foreign-found">พบสิ่งแปลกปลอมจากการซ่อม</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="clean" />
                <Label htmlFor="clean">สะอาด</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="not-clean" />
                <Label htmlFor="not-clean">ไม่สะอาด</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button className="bg-green-500 hover:bg-green-600" onClick={handleConfirmClick}>
              ยืนยัน
            </Button>
            <Button variant="destructive" onClick={() => setShowCancelConfirmDialog(true)}>
              {" "}
              {/* Modified cancel button */}
              ยกเลิก
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <SuccessDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog} referenceNumber="20110211" />
      <RejectionDialog
        open={showRejectionDialog}
        onOpenChange={setShowRejectionDialog}
        referenceNumber="20110211"
        onConfirm={handleReject}
      />

      <AlertDialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบไฟล์แนบ</AlertDialogTitle>
            <AlertDialogDescription>คุณแน่ใจหรือไม่ว่าต้องการลบไฟล์แนบนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteConfirmation(false)}>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteAttachment}>ยืนยัน</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการบันทึกข้อมูล</AlertDialogTitle>
            <AlertDialogDescription>
              คุณแน่ใจหรือไม่ว่าต้องการบันทึกข้อมูลนี้? กรุณาตรวจสอบความถูกต้องก่อนดำเนินการต่อ
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirmDialog(false)}>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>ยืนยัน</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Added AlertDialog for cancel confirmation */}
      <AlertDialog open={showCancelConfirmDialog} onOpenChange={setShowCancelConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการยกเลิก</AlertDialogTitle>
            <AlertDialogDescription>คุณแน่ใจหรือไม่ว่าต้องการยกเลิก? การดำเนินการนี้จะลบข้อมูลที่คุณป้อนทั้งหมด</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowCancelConfirmDialog(false)}>ไม่</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowCancelConfirmDialog(false)
                setShowRejectionDialog(true)
              }}
            >
              ใช่, ยกเลิก
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={itemToDelete !== null} onOpenChange={() => setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบรายการ</AlertDialogTitle>
            <AlertDialogDescription>คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setItemToDelete(null)}>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (itemToDelete !== null) {
                  handleRemoveDescendingItem(itemToDelete)
                }
                setItemToDelete(null)
              }}
            >
              ยืนยัน
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

