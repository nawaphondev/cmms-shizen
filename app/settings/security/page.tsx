"use client"

import type React from "react"

import { useState } from "react"
import { AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

interface Device {
  name: string
  location: string
  progress: number
  status: "active" | "inactive"
}

export default function SecuritySettingsPage() {
  const [showSystemStatus, setShowSystemStatus] = useState(true)
  const [showSystemAccess, setShowSystemAccess] = useState(true)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [devices] = useState<Device[]>([
    {
      name: "PC ที่ใช้ window at Samut Prakan",
      location: "ยกเลิก",
      progress: 75,
      status: "active",
    },
    {
      name: "PC ที่ใช้ window at Bangkok",
      location: "เวลา 3 ชั่วโมงที่แล้ว",
      progress: 25,
      status: "inactive",
    },
  ])

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordForm.newPassword === passwordForm.confirmPassword) {
      // In a real app, you would validate the current password and update it here
      setShowSuccessDialog(true)
    } else {
      setShowErrorDialog(true)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold mb-6">ตั้งค่า</h1>

      <Card>
        <CardHeader>
          <CardTitle>ตั้งค่าระบบหลัก</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span>แสดงสถานะการใช้งาน</span>
            <Switch checked={showSystemStatus} onCheckedChange={setShowSystemStatus} />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span>แสดงพฤติกรรมเข้าสู่ระบบ</span>
            <Switch checked={showSystemAccess} onCheckedChange={setShowSystemAccess} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>อุปกรณ์ที่เข้าสู่ระบบทั้งหมด</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {devices.map((device, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span>{device.location}</span>
                <span className={device.status === "active" ? "text-red-500" : "text-blue-500"}>{device.name}</span>
              </div>
              <Progress value={device.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>เปลี่ยนรหัสผ่าน</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm">รหัสผ่านเดิม</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm">รหัสผ่านใหม่</label>
              <div className="relative">
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {showNewPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm">ยืนยันรหัสผ่านใหม่</label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              ยืนยัน
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">เปลี่ยนรหัสผ่านของคุณเสร็จสิ้น</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          </div>
          <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={() => setShowSuccessDialog(false)}>
            ปิด
          </Button>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">รหัสผ่านผิด</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          </div>
          <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={() => setShowErrorDialog(false)}>
            ปิด
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

