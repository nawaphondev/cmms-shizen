"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface SparePart {
  category: string
  number: number
  name: string
  description: string
  amountNeeded: number
  amountInStore: number
}

export default function SparePartsDetailPage() {
  const router = useRouter()
  const [spareParts] = useState<SparePart[]>([
    {
      category: "Elec",
      number: 1,
      name: "SMC-5AB5-3M",
      description: "(solenoid valve)",
      amountNeeded: 5,
      amountInStore: 4,
    },
    {
      category: "Mech",
      number: 2,
      name: "MISUMI-TKM205-FA",
      description: "(linear guide)",
      amountNeeded: 2,
      amountInStore: 5,
    },
  ])

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push("/monitor")} className="p-2">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-xl flex-grow">อะไหล่ที่ต้องเบิก</h2>
        </div>
        <div className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">หมวด</TableHead>
                <TableHead>ลำดับ</TableHead>
                <TableHead>ชื่อ part</TableHead>
                <TableHead className="text-center">จำนวนที่ต้องเบิก</TableHead>
                <TableHead className="text-center">จำนวนที่เหลือใน store</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {spareParts.map((part) => (
                <TableRow key={part.number}>
                  <TableCell>{part.category}</TableCell>
                  <TableCell>{part.number}</TableCell>
                  <TableCell>
                    {part.name}
                    <br />
                    <span className="text-gray-500">{part.description}</span>
                  </TableCell>
                  <TableCell className="text-center">{part.amountNeeded}</TableCell>
                  <TableCell className="text-center">
                    <span className={part.amountInStore < part.amountNeeded ? "text-red-500" : "text-green-500"}>
                      {part.amountInStore}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

