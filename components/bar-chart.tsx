"use client"

import {
  Bar,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

const data = [
  { name: "เครื่องจักร", value: 6 },
  { name: "อุปกรณ์โรงงาน", value: 12 },
  { name: "เครื่องใช้สำนักงาน", value: 8 },
  { name: "ระบบสาธารณูปโภค", value: 22 },
  { name: "แจ้งสร้างเครื่องจักร/อุปกรณ์", value: 16 },
  { name: "อื่นๆ", value: 13 },
]

interface BarChartProps {
  className?: string
}

export function BarChart({ className }: BarChartProps) {
  const getBarColor = (name: string) => {
    switch (name) {
      case "เครื่องจักร":
        return "#EAB308" // yellow-500
      case "อุปกรณ์โรงงาน":
        return "#EF4444" // red-500
      case "เครื่องใช้สำนักงาน":
        return "#10B981" // green-500
      case "ระบบสาธารณูปโภค":
        return "#EC4899" // pink-500
      case "แจ้งสร้างเครื่องจักร/อุปกรณ์":
        return "#3B82F6" // blue-500
      case "อื่นๆ":
        return "#8B5CF6" // purple-500
      default:
        return "#6B7280" // gray-500
    }
  }

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.name)} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

