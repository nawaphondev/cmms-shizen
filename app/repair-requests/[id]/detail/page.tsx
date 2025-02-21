"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileUpload } from "@/components/file-upload"
import { Timeline } from "@/components/timeline"
import { Calendar, Trash2, Eye } from "lucide-react"

interface RepairDetail {
  requestNumber: string
  department: string
  type: string
  team: string
  machineCode: string
  machineName: string
  symptoms: string
  machineStatus: string
  reporter: string
  responsible: string
  reportDate: string
  reason: string
  solution: string
}

export default function RepairRequestDetailPage() {
  const [detail] = useState<RepairDetail>({
    requestNumber: "RE0000001",
    department: "แผนกผลิตเครื่องขึ้นรูปจีด",
    type: "อุปกรณ์โรงงาน",
    team: "APD",
    machineCode: "M0001",
    machineName: "เครื่องขึ้นรูป 32 Oz.",
    symptoms: "ล้อกลายเหล็กหรอ ล้อแแตก เบรนเสื่อมและ",
    machineStatus: "Break Down",
    reporter: "พงศกร",
    responsible: "นายสุรเชษฐ สามัคคี",
    reportDate: "12/05/2021 17:50 น.",
    reason: "ล้อเสื่อมสภาพตามการใช้งาน",
    solution: "เปลี่ยนล้อและอุปกรณ์",
  })

  const [schedule, setSchedule] = useState({
    startDate: "12/08/2021",
    duration: "3 เดือน",
    notification: "3 เดือน",
  })

  const [files, setFiles] = useState([{ name: "Detail1.png", type: "image/png" }])

  const [timeline] = useState([
    { status: "รอดำเนินการ", updatedBy: "นายสุรเชษฐ", date: "12/05/2021 18:50 น." },
    { status: "รอจ่ายใส่", updatedBy: "นายสุรเชษฐ", date: "12/05/2021 18:50 น." },
    { status: "เริ่มดำเนินการซ่อม", updatedBy: "นายสุรเชษฐ", date: "12/05/2021 18:50 น." },
    { status: "ซ่อมสำเร็จโดย CM S4", updatedBy: "นายสุรเชษฐ", date: "12/05/2021 18:50 น." },
  ])

  const handleDeleteFile = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-blue-600 text-xl font-medium mb-6">Detail</h1>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <span className="text-gray-600">เลขที่แจ้งซ่อม : </span>
              <span>{detail.requestNumber}</span>
            </div>
            <div>
              <span className="text-gray-600">ประเภทซ่อม : </span>
              <span>{detail.type}</span>
            </div>
            <div>
              <span className="text-gray-600">ส่วนงาน : </span>
              <span>{detail.department}</span>
            </div>
            <div>
              <span className="text-gray-600">แผนก : </span>
              <span>{detail.team}</span>
            </div>
            <div>
              <span className="text-gray-600">รหัสเครื่องจักร : </span>
              <span>{detail.machineCode}</span>
            </div>
            <div>
              <span className="text-gray-600">ชื่อเครื่���งจักร : </span>
              <span>{detail.machineName}</span>
            </div>
            <div>
              <span className="text-gray-600">อาการเบื้องต้น : </span>
              <span>{detail.symptoms}</span>
            </div>
            <div>
              <span className="text-gray-600">สถานะเครื่อง : </span>
              <span>{detail.machineStatus}</span>
            </div>
            <div>
              <span className="text-gray-600">ผู้แจ้งซ่อม : </span>
              <span>{detail.reporter}</span>
            </div>
            <div>
              <span className="text-gray-600">ทีมซ่อม : </span>
              <span>{detail.responsible}</span>
            </div>
            <div>
              <span className="text-gray-600">วันที่แจ้ง : </span>
              <span>{detail.reportDate}</span>
            </div>
            <div>
              <span className="text-gray-600">ผู้รับแจ้งซ่อม : </span>
              <span>{detail.responsible}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-2">
              <span className="text-gray-600">สาเหตุ : </span>
              <span>{detail.reason}</span>
            </div>
            <div>
              <span className="text-gray-600">วิธีแก้ไข : </span>
              <span>{detail.solution}</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-2">รายการเอกสารแนบ :</h3>
            <div className="space-y-2">
              {files.map((file) => (
                <div key={file.name} className="flex items-center gap-4">
                  <span>{file.name}</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteFile(file.name)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <FileUpload onUpload={(files) => setFiles((prev) => [...prev, ...files])} className="mt-2" />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div>
              <span className="text-gray-600">วันที่เริ่มต้น : </span>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4" />
                <span>{schedule.startDate}</span>
              </div>
            </div>
            <div>
              <span className="text-gray-600">ถึง : </span>
              <span>{schedule.duration}</span>
            </div>
            <div>
              <span className="text-gray-600">แจ้งเตือนล่วงหน้า : </span>
              <span>{schedule.notification}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="font-medium mb-4">ข้อมูลสถานะการซ่อม - ซ่อมโดย CM S4</h3>
          <Timeline items={timeline} />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button className="bg-green-500 hover:bg-green-600">ยืนยัน</Button>
        <Button variant="destructive">ยกเลิก</Button>
      </div>
    </div>
  )
}

