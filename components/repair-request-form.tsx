"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
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
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/auth"

export function RepairRequestForm() {
  const [formData, setFormData] = useState({
    requestNumber: "RE0000001",
    department: "",
    type: "",
    team: "",
    machineCode: "",
    machineName: "",
    initialSymptoms: "",
    machineStatus: "",
    urgency: "",
    reporter: "",
    repairReceiver: "",
    reportDate: "",
    responsible: "",
    date: "",
    reason: "",
    solution: "",
    delivery: [] as string[],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showCancelConfirmDialog, setShowCancelConfirmDialog] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    const requiredFields = [
      "department",
      "type",
      "team",
      "machineCode",
      "machineName",
      "initialSymptoms",
      "machineStatus",
      "urgency",
      "repairReceiver",
      "reportDate",
    ]

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setShowConfirmDialog(true)
    }
  }

  const confirmSubmit = async () => {
    setShowConfirmDialog(false)
    try {
      // Here you would typically send the data to your API
      // For this example, we'll simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Repair request submitted successfully",
        variant: "default",
      })

      router.push("/monitor")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit repair request. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>เลขที่แจ้งซ่อม</Label>
          <Input value={formData.requestNumber} disabled />
        </div>
        <div>
          <Label>ประเภทซ่อม</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger className="bg-[#002B5B] text-white">
              <SelectValue placeholder="เลือก" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="repair">Repair</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
        </div>
        <div>
          <Label>ส่วนงาน</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, department: value })}>
            <SelectTrigger className="bg-[#002B5B] text-white">
              <SelectValue placeholder="เลือก" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="production">Production</SelectItem>
              <SelectItem value="office">Office</SelectItem>
            </SelectContent>
          </Select>
          {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
        </div>
        <div>
          <Label>แผนก</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, team: value })}>
            <SelectTrigger className="bg-[#002B5B] text-white">
              <SelectValue placeholder="เลือก" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="team1">Team 1</SelectItem>
              <SelectItem value="team2">Team 2</SelectItem>
            </SelectContent>
          </Select>
          {errors.team && <p className="text-red-500 text-sm mt-1">{errors.team}</p>}
        </div>
        <div>
          <Label>รหัสเครื่องจักร</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, machineCode: value })}>
            <SelectTrigger className="bg-[#002B5B] text-white">
              <SelectValue placeholder="เลือก" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mc1">MC001</SelectItem>
              <SelectItem value="mc2">MC002</SelectItem>
            </SelectContent>
          </Select>
          {errors.machineCode && <p className="text-red-500 text-sm mt-1">{errors.machineCode}</p>}
        </div>
        <div>
          <Label>ชื่อเครื่องจักร</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, machineName: value })}>
            <SelectTrigger className="bg-[#002B5B] text-white">
              <SelectValue placeholder="เลือก" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="machine1">Machine 1</SelectItem>
              <SelectItem value="machine2">Machine 2</SelectItem>
            </SelectContent>
          </Select>
          {errors.machineName && <p className="text-red-500 text-sm mt-1">{errors.machineName}</p>}
        </div>
        <div>
          <Label>อาการเบื้องต้น</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, initialSymptoms: value })}>
            <SelectTrigger className="bg-[#002B5B] text-white">
              <SelectValue placeholder="เลือก" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="symptom1">Symptom 1</SelectItem>
              <SelectItem value="symptom2">Symptom 2</SelectItem>
            </SelectContent>
          </Select>
          {errors.initialSymptoms && <p className="text-red-500 text-sm mt-1">{errors.initialSymptoms}</p>}
        </div>
        <div>
          <Label>สถานะเครื่อง</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, machineStatus: value })}>
            <SelectTrigger className="bg-[#002B5B] text-white">
              <SelectValue placeholder="เลือก" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="operational">Operational</SelectItem>
              <SelectItem value="down">Down</SelectItem>
              <SelectItem value="maintenance">Under Maintenance</SelectItem>
            </SelectContent>
          </Select>
          {errors.machineStatus && <p className="text-red-500 text-sm mt-1">{errors.machineStatus}</p>}
        </div>
        <div>
          <Label>ความเร่งด่วน</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
            <SelectTrigger className="bg-[#002B5B] text-white">
              <SelectValue placeholder="เลือก" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
            </SelectContent>
          </Select>
          {errors.urgency && <p className="text-red-500 text-sm mt-1">{errors.urgency}</p>}
        </div>
        <div>
          <Label>ผู้แจ้งซ่อม</Label>
          <Input value={user?.name || ""} disabled />
        </div>
        <div>
          <Label>วันที่แจ้ง</Label>
          <Input
            type="date"
            value={formData.reportDate}
            onChange={(e) => setFormData({ ...formData, reportDate: e.target.value })}
          />
          {errors.reportDate && <p className="text-red-500 text-sm mt-1">{errors.reportDate}</p>}
        </div>
        <div>
          <Label>ผู้รับแจ้งซ่อม</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, repairReceiver: value })}>
            <SelectTrigger className="bg-[#002B5B] text-white">
              <SelectValue placeholder="เลือก" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="receiver1">Receiver 1</SelectItem>
              <SelectItem value="receiver2">Receiver 2</SelectItem>
            </SelectContent>
          </Select>
          {errors.repairReceiver && <p className="text-red-500 text-sm mt-1">{errors.repairReceiver}</p>}
        </div>
        <div>
          <Label>ทีมซ่อม</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, responsible: value })}>
            <SelectTrigger className="bg-[#002B5B] text-white">
              <SelectValue placeholder="เลือก" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="team1">Team 1</SelectItem>
              <SelectItem value="team2">Team 2</SelectItem>
            </SelectContent>
          </Select>
          {errors.responsible && <p className="text-red-500 text-sm mt-1">{errors.responsible}</p>}
        </div>
      </div>

      <div>
        <Label>สาเหตุ</Label>
        <Input value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} />
      </div>

      <div>
        <Label>วิธีแก้ไข</Label>
        <Input value={formData.solution} onChange={(e) => setFormData({ ...formData, solution: e.target.value })} />
      </div>

      <div>
        <Label>การส่งมอบ</Label>
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: "normal", label: "ใช้งานได้ปกติ" },
            { id: "pending-parts", label: "ใช้การได้แต่รอชิ้นส่วน" },
            { id: "safety-check", label: "ตรวจเช็คสภาพปลอดภัย" },
            { id: "no-foreign-objects", label: "ไม่พบสิ่งแปลกปลอมจากการซ่อม" },
            { id: "needs-repair", label: "ไม่สามารถใช้งานได้ ต้องดำเนินการซ่อมต่อ" },
            { id: "safety-failed", label: "ตรวจเช็คสภาพไม่ปลอดภัย" },
            { id: "foreign-objects-found", label: "พบสิ่งแปลกปลอมจากการซ่อม" },
            { id: "replaced", label: "เปลี่ยน/แปลงอุปกรณ์การซ่อม" },
            { id: "clean", label: "สะอาด" },
            { id: "not-clean", label: "ไม่สะอาด" },
          ].map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={formData.delivery.includes(option.id)}
                onCheckedChange={(checked) => {
                  setFormData((prev) => ({
                    ...prev,
                    delivery: checked ? [...prev.delivery, option.id] : prev.delivery.filter((id) => id !== option.id),
                  }))
                }}
              />
              <Label htmlFor={option.id}>{option.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button type="submit" className="bg-green-500 hover:bg-green-600">
          ยืนยัน
        </Button>
        <Button type="button" variant="destructive" onClick={() => setShowCancelConfirmDialog(true)}>
          ยกเลิก
        </Button>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit this repair request? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSubmit}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={showCancelConfirmDialog} onOpenChange={setShowCancelConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการยกเลิก</AlertDialogTitle>
            <AlertDialogDescription>คุณแน่ใจหรือไม่ว่าต้องการยกเลิก? การดำเนินการนี้จะลบข้อมูลที่คุณป้อนทั้งหมด</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ไม่</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowCancelConfirmDialog(false)
                // Add any additional logic for cancellation here, e.g., resetting the form or navigating away
              }}
            >
              ใช่, ยกเลิก
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  )
}

