"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUpload } from "@/components/file-upload"
import { LogIn, Languages, HelpCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { LoginSidebar } from "@/components/login-sidebar"

export default function HelpPage() {
  const [activeSection, setActiveSection] = useState<string>("login")
  const [showSuccess, setShowSuccess] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("th")
  const [formData, setFormData] = useState({
    idCard: "",
    firstName: "",
    lastName: "",
    email: "",
    employeeId: "",
    position: "",
    department: "",
    selfieImage: null,
    idCardImage: null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0]
    setFormData((prev) => ({ ...prev, [fieldName]: file }))
  }

  const validateForm = () => {
    const requiredFields = ["idCard", "firstName", "lastName", "email", "employeeId", "position", "department"]
    const emptyFields = requiredFields.filter((field) => !formData[field as keyof typeof formData])

    if (emptyFields.length > 0) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: `กรุณากรอก: ${emptyFields.join(", ")}`,
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const response = await fetch("/api/help/reset-password", {
          method: "POST",
          body: new FormData(e.currentTarget as HTMLFormElement),
        })

        if (!response.ok) {
          const errorData = await response.json()
          toast({ title: "Error", description: errorData.message || "Failed to submit form", variant: "destructive" })
          return
        }

        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
      } catch (error) {
        console.error("Error submitting form:", error)
        toast({ title: "Error", description: "Failed to submit form", variant: "destructive" })
      }
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <LoginSidebar />
        <div className="flex-1 overflow-auto p-6">
          <h1 className="text-2xl font-bold mb-6">ศูนย์ช่วยเหลือ</h1>

          <div className="grid md:grid-cols-[300px_1fr] gap-6">
            {/* Sidebar Navigation */}
            <Card>
              <CardContent className="p-4">
                <nav>
                  <ul className="space-y-2">
                    <li>
                      <Button
                        variant={activeSection === "login" ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveSection("login")}
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        ไม่สามารถเข้าสู่ระบบได้
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant={activeSection === "language" ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveSection("language")}
                      >
                        <Languages className="mr-2 h-4 w-4" />
                        เปลี่ยนภาษาไม่ได้
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant={activeSection === "contact" ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveSection("contact")}
                      >
                        <HelpCircle className="mr-2 h-4 w-4" />
                        ติดต่อผู้ดูแล
                      </Button>
                    </li>
                  </ul>
                </nav>
              </CardContent>
            </Card>

            {/* Content Area */}
            <Card>
              <CardContent className="p-6">
                {activeSection === "login" && (
                  <div>
                    <CardTitle className="mb-4">ต้องการรีเซ็ตรหัสผ่าน</CardTitle>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="idCard">ยืนยันตัวตนด้วยบัตรประชาชน</Label>
                        <Input
                          id="idCard"
                          name="idCard"
                          placeholder="XXXXXXXXXXXXX-XXX"
                          className="mt-1"
                          value={formData.idCard}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="grid gap-4">
                        <div>
                          <Label>แนบรูปตนเอง</Label>
                          <FileUpload
                            accept="image/jpeg,image/png"
                            label="เลือกไฟล์รูปภาพ"
                            onChange={(e) => handleFileChange(e, "selfieImage")}
                            helperText="(jpeg,png)"
                          />
                        </div>

                        <div>
                          <Label>แนบรูปตนเองคู่กับบัตรประชาชน</Label>
                          <FileUpload
                            accept="image/jpeg,image/png"
                            label="เลือกไฟล์รูปภาพ"
                            onChange={(e) => handleFileChange(e, "idCardImage")}
                            helperText="(jpeg,png)"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">ชื่อ</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            className="mt-1"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">นามสกุล</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            className="mt-1"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">อีเมล</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          className="mt-1"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <Label htmlFor="employeeId">รหัสพนักงาน</Label>
                        <Input
                          id="employeeId"
                          name="employeeId"
                          className="mt-1"
                          value={formData.employeeId}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <Label htmlFor="position">ตำแหน่ง</Label>
                        <Select
                          name="position"
                          value={formData.position}
                          onValueChange={(value) => handleInputChange({ target: { name: "position", value } } as any)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกตำแหน่ง" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="engineer">วิศวกรโรงงาน</SelectItem>
                            <SelectItem value="manager">ผู้จัดการ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="department">แผนก</Label>
                        <Select
                          name="department"
                          value={formData.department}
                          onValueChange={(value) => handleInputChange({ target: { name: "department", value } } as any)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกแผนก" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="production">ฝ่ายผลิต</SelectItem>
                            <SelectItem value="maintenance">ฝ่ายซ่อมบำรุง</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="text-right">
                        <Button type="submit" className="bg-primary">
                          ส่ง
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {activeSection === "language" && (
                  <div>
                    <CardTitle className="mb-6">การเปลี่ยนภาษา</CardTitle>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">1.คลิกที่สัญลักษณ์มุมขวาด้านบน</h3>
                        <div className="flex items-center gap-4">
                          <Button variant="outline" className="rounded-full w-12 h-12 flex items-center justify-center">
                            กข
                          </Button>
                          <span className="text-gray-500">หรือ</span>
                          <Button variant="outline" className="rounded-full w-12 h-12 flex items-center justify-center">
                            Aa
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">2.คลิกเลือกภาษาที่คุณต้องการ</h3>
                        <div className="w-48">
                          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="th">ภาษาไทย</SelectItem>
                              <SelectItem value="en">English</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "contact" && (
                  <div>
                    <CardTitle className="mb-4">ติดต่อผู้ดูแล</CardTitle>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="reporter">ผู้แจ้งปัญหา</Label>
                        <Input id="reporter" name="reporter" className="mt-1" onChange={handleInputChange} />
                      </div>

                      <div>
                        <Label htmlFor="contactNumber">เบอร์ติดต่อ</Label>
                        <Input id="contactNumber" name="contactNumber" className="mt-1" onChange={handleInputChange} />
                      </div>

                      <div>
                        <Label htmlFor="contactEmail">อีเมล</Label>
                        <Input
                          id="contactEmail"
                          name="contactEmail"
                          type="email"
                          className="mt-1"
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <Label htmlFor="details">รายละเอียดปัญหา</Label>
                        <Textarea
                          id="details"
                          name="details"
                          className="mt-1"
                          rows={6}
                          onChange={handleInputChange as any}
                        />
                      </div>

                      <div className="text-right">
                        <Button type="submit" className="bg-primary">
                          ส่ง
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle className="text-center text-green-500">เสร็จสิ้น</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-4">หากยังไม่ได้รับการตอบรับภายใน 1 ชั่วโมง กรุณาติดต่อผู้ดูแล</p>
              <div className="text-center">
                <Button onClick={() => setShowSuccess(false)} className="bg-primary">
                  ตกลง
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

