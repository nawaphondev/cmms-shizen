"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function NewRepairRequestPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    repairType: "",
    department: "",
    machineCode: "",
    machineName: "",
    initialSymptoms: "",
    machineStatus: "",
    urgentness: "",
    repairTeam: "",
    reportDate: "",
    startDate: "",
    expectedFinishDate: "",
    reason: "",
    remedy: "",
    delivery: [],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      delivery: prev.delivery.includes(value)
        ? prev.delivery.filter((item) => item !== value)
        : [...prev.delivery, value],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/repair-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        router.push("/repair-requests")
      } else {
        // Handle error
        console.error("Failed to submit repair request")
      }
    } catch (error) {
      console.error("Error submitting repair request:", error)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">New Repair Request</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="repairType">Repair Type</Label>
            <Select onValueChange={handleSelectChange("repairType")} value={formData.repairType}>
              <SelectTrigger>
                <SelectValue placeholder="Select repair type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="emergency">Emergency Repair</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Select onValueChange={handleSelectChange("department")} value={formData.department}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="production">Production</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="quality">Quality Control</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="machineCode">Machine Code</Label>
            <Input
              type="text"
              id="machineCode"
              name="machineCode"
              value={formData.machineCode}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="machineName">Machine Name</Label>
            <Input
              type="text"
              id="machineName"
              name="machineName"
              value={formData.machineName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="initialSymptoms">Initial Symptoms</Label>
            <Input
              type="text"
              id="initialSymptoms"
              name="initialSymptoms"
              value={formData.initialSymptoms}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="machineStatus">Machine Status</Label>
            <Select onValueChange={handleSelectChange("machineStatus")} value={formData.machineStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select machine status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="down">Down</SelectItem>
                <SelectItem value="maintenance">Under Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="urgentness">Urgentness</Label>
            <Select onValueChange={handleSelectChange("urgentness")} value={formData.urgentness}>
              <SelectTrigger>
                <SelectValue placeholder="Select urgentness" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="repairTeam">Repair Team</Label>
            <Select onValueChange={handleSelectChange("repairTeam")} value={formData.repairTeam}>
              <SelectTrigger>
                <SelectValue placeholder="Select repair team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="team1">Team 1</SelectItem>
                <SelectItem value="team2">Team 2</SelectItem>
                <SelectItem value="team3">Team 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="reportDate">Report Date</Label>
            <Input
              type="date"
              id="reportDate"
              name="reportDate"
              value={formData.reportDate}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="expectedFinishDate">Expected Finish Date</Label>
            <Input
              type="date"
              id="expectedFinishDate"
              name="expectedFinishDate"
              value={formData.expectedFinishDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="reason">Reason</Label>
          <Input type="text" id="reason" name="reason" value={formData.reason} onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="remedy">Remedy</Label>
          <Input type="text" id="remedy" name="remedy" value={formData.remedy} onChange={handleInputChange} />
        </div>
        <div>
          <Label>Delivery</Label>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="delivery-parts" onCheckedChange={() => handleCheckboxChange("parts")} />
              <Label htmlFor="delivery-parts">Parts</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="delivery-tools" onCheckedChange={() => handleCheckboxChange("tools")} />
              <Label htmlFor="delivery-tools">Tools</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="delivery-manpower" onCheckedChange={() => handleCheckboxChange("manpower")} />
              <Label htmlFor="delivery-manpower">Manpower</Label>
            </div>
          </div>
        </div>
        <Button type="submit">Submit Repair Request</Button>
      </form>
    </div>
  )
}

