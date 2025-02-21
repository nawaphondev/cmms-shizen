import { CheckCircle, Clock, AlertTriangle } from "lucide-react"

interface StatusCardProps {
  title: string
  value: number
  label: string
  status: "success" | "pending" | "inProgress"
  className?: string
}

export function StatusCard({ title, value, label, status, className = "" }: StatusCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "inProgress":
        return <AlertTriangle className="w-5 h-5 text-blue-500" />
    }
  }

  return (
    <div className={`rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-2">
        {getStatusIcon()}
        <h3 className="font-medium text-black">{title}</h3>
      </div>
      <div className="mt-2">
        <span className="text-4xl font-bold text-black">{value}</span>
        <span className="ml-2 text-black">{label}</span>
      </div>
    </div>
  )
}

