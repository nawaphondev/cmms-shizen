export interface DashboardEvent {
  id: string
  date: Date
  type: "maintenance" | "repair" | "inspection" | "cleaning" | "other"
  title: string
}

export interface EquipmentStats {
  measurement: number
  inspection: number
  cleaning: number
  checking: number
  lubrication: number
}

export interface Equipment {
  id: string
  title: string
  color: string
  stats: EquipmentStats
}

