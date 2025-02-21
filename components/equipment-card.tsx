import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { EquipmentStats } from "@/types/dashboard"

interface EquipmentCardProps {
  title: string
  color: string
  stats: EquipmentStats
}

export function EquipmentCard({ title, color, stats }: EquipmentCardProps) {
  return (
    <Card className="bg-blue-50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              color === "yellow"
                ? "bg-yellow-500"
                : color === "pink"
                  ? "bg-pink-500"
                  : color === "red"
                    ? "bg-red-500"
                    : color === "blue"
                      ? "bg-blue-500"
                      : color === "mint"
                        ? "bg-green-200"
                        : "bg-purple-500"
            }`}
          />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-sm">
              <span className="text-orange-500">Measurement</span>
              <span>{stats.measurement}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-red-500">Inspection</span>
              <span>{stats.inspection}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-purple-500">Cleaning</span>
              <span>{stats.cleaning}</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm">
              <span className="text-blue-500">Checking</span>
              <span>{stats.checking}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-500">Lubrication</span>
              <span>{stats.lubrication}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

