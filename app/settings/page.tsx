"use client"

import { useState } from "react"
import { AlertCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Language {
  code: string
  nativeName: string
  englishName: string
}

interface AccessModule {
  id: string
  name: string
  access: "everyone" | "admin"
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    deadline: true,
    login: true,
    machine: true,
    popup: true,
  })
  const [showResetDialog, setShowResetDialog] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showLanguageDialog, setShowLanguageDialog] = useState(false)
  const [password, setPassword] = useState("")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [showSaveConfirmDialog, setShowSaveConfirmDialog] = useState(false)

  const [currentLanguages] = useState(["ภาษาไทย", "English"])
  const [availableLanguages] = useState<Language[]>([
    { code: "af", nativeName: "Afrikaans", englishName: "Afrikaans" },
    { code: "sq", nativeName: "Shqip", englishName: "Albanian" },
    { code: "gsw", nativeName: "Elsässisch", englishName: "Alsatian" },
    { code: "am", nativeName: "አማርኛ", englishName: "Amharic" },
  ])

  const [modules, setModules] = useState<AccessModule[]>([
    { id: "machine", name: "Machine", access: "everyone" },
    { id: "monitor", name: "Monitor", access: "everyone" },
    { id: "management", name: "Management", access: "everyone" },
    { id: "settings", name: "ตั้งค่า", access: "everyone" },
    { id: "system", name: "รีเซ็ตระบบ", access: "admin" },
  ])

  const handleAccessChange = (moduleId: string, access: "everyone" | "admin") => {
    setModules(modules.map((module) => (module.id === moduleId ? { ...module, access } : module)))
  }

  const handleResetConfirm = () => {
    setShowResetDialog(false)
    setShowPasswordDialog(true)
  }

  const handlePasswordConfirm = () => {
    setShowConfirmDialog(true)
  }

  const handleFinalConfirm = () => {
    // Handle password confirmation and system reset
    setShowConfirmDialog(false)
    setShowPasswordDialog(false)
    setPassword("")
  }

  const handleSaveConfirm = () => {
    // Implement the save logic here
    console.log("Settings saved")
    setShowSaveConfirmDialog(false)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold mb-6">ตั้งค่า</h1>

      {/* Notifications Section */}
      <Card>
        <CardHeader>
          <CardTitle>การแจ้งเตือน</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <span>เมื่อใกล้ถึงกำหนดส่งงาน</span>
            <Switch
              checked={notifications.deadline}
              onCheckedChange={(checked) => setNotifications({ ...notifications, deadline: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <span>เมื่อมีงานเข้า</span>
            <Switch
              checked={notifications.login}
              onCheckedChange={(checked) => setNotifications({ ...notifications, login: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <span>เมื่อเครื่องจักรหยุดทำงานกระทันหัน</span>
            <Switch
              checked={notifications.machine}
              onCheckedChange={(checked) => setNotifications({ ...notifications, machine: checked })}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <span>แสดงป๊อบอัพทุกอย่างจนกว่าจะถูกปิด</span>
            <Switch
              checked={notifications.popup}
              onCheckedChange={(checked) => setNotifications({ ...notifications, popup: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Language Section */}
      <Card>
        <CardHeader>
          <CardTitle>ภาษา</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">ตอนนี้กำลังใช้</h3>
            <div className="space-y-2">
              {currentLanguages.map((lang) => (
                <div key={lang} className="p-2 bg-blue-50 rounded-lg">
                  {lang}
                </div>
              ))}
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowLanguageDialog(true)}>
            <Plus className="h-4 w-4" />
            เพิ่มภาษาอื่นๆ
          </Button>
        </CardContent>
      </Card>

      {/* Data Access Section */}
      <Card>
        <CardHeader>
          <CardTitle>การเข้าถึงข้อมูล</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {modules.map((module) => (
            <div key={module.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <span>{module.name}</span>
              <Select
                value={module.access}
                onValueChange={(value: "everyone" | "admin") => handleAccessChange(module.id, value)}
              >
                <SelectTrigger className="w-[100px] bg-blue-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="everyone">ทุกคน</SelectItem>
                  <SelectItem value="admin">ผู้ดูแล</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
          <div className="flex justify-end gap-4 mt-4">
            <Button className="bg-green-500 hover:bg-green-600" onClick={() => setShowSaveConfirmDialog(true)}>
              บันทึก
            </Button>
            <Button variant="destructive">ยกเลิก</Button>
          </div>
        </CardContent>
      </Card>

      {/* Reset Settings Section */}
      <Card>
        <CardHeader>
          <CardTitle>รีเซ็ตระบบ</CardTitle>
          <CardDescription>การรีเซ็ตระบบคือการเริ่มต้นการทำงานใหม่โดยที่ข้อมูลทั้งหมดในระบบจะหายไป</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="secondary"
            className="bg-blue-100 hover:bg-blue-200 text-black"
            onClick={() => setShowResetDialog(true)}
          >
            รีเซ็ตระบบเริ่มต้นการทำงานใหม่
          </Button>
        </CardContent>
      </Card>

      {/* Reset Confirmation Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>คำเตือน</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-6">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <DialogDescription className="text-center">
              การรีเซ็ตระบบจะเริ่มต้นการทำงานใหม่ทั้งหมดโดยที่ข้อมูลในระบบทั้งหมดจะหายไป
            </DialogDescription>
          </div>
          <DialogFooter className="flex justify-center gap-4">
            <Button
              variant="default"
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={handleResetConfirm}
            >
              ยืนยัน
            </Button>
            <Button variant="destructive" onClick={() => setShowResetDialog(false)}>
              ยกเลิก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Password Confirmation Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>กรุณายืนยันรหัสผ่าน</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="กรอกรหัสผ่าน"
            />
          </div>
          <DialogFooter className="flex justify-center gap-4">
            <Button
              variant="default"
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={handlePasswordConfirm}
            >
              ยืนยัน
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowPasswordDialog(false)
                setPassword("")
              }}
            >
              ยกเลิก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Language Selection Dialog */}
      <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>เลือกภาษาที่ต้องการเพิ่มเติม</DialogTitle>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto">
            {availableLanguages.map((lang) => (
              <div
                key={lang.code}
                className="flex items-center justify-between p-4 hover:bg-blue-50 cursor-pointer rounded-lg"
              >
                <div>
                  <div className="font-medium">{lang.nativeName}</div>
                  <div className="text-sm text-gray-500">{lang.englishName}</div>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter className="flex justify-center gap-4">
            <Button variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700">
              ดาวน์โหลด
            </Button>
            <Button variant="destructive" onClick={() => setShowLanguageDialog(false)}>
              ยกเลิก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ยืนยันการดำเนินการ</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>คุณแน่ใจหรือไม่ที่จะดำเนินการต่อ?</p>
          </div>
          <DialogFooter className="flex justify-center gap-4">
            <Button
              variant="default"
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={handleFinalConfirm}
            >
              ยืนยัน
            </Button>
            <Button variant="destructive" onClick={() => setShowConfirmDialog(false)}>
              ยกเลิก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSaveConfirmDialog} onOpenChange={setShowSaveConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ยืนยันการบันทึก</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>คุณแน่ใจหรือไม่ที่จะบันทึกการเปลี่ยนแปลงทั้งหมด?</p>
          </div>
          <DialogFooter className="flex justify-center gap-4">
            <Button
              variant="default"
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={handleSaveConfirm}
            >
              ยืนยัน
            </Button>
            <Button variant="destructive" onClick={() => setShowSaveConfirmDialog(false)}>
              ยกเลิก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

