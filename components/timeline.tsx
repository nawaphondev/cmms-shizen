interface TimelineItem {
  status: string
  updatedBy: string
  date: string
}

interface TimelineProps {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      <div className="border-l-2 border-gray-200 ml-3">
        {items.map((item, index) => (
          <div key={index} className="mb-4 ml-6">
            <div className="flex items-center">
              <div className="absolute w-2 h-2 bg-blue-500 rounded-full -left-[5px]" />
              <div className="grid grid-cols-3 w-full">
                <div className="text-gray-900">{item.status}</div>
                <div className="text-gray-600">{item.updatedBy}</div>
                <div className="text-gray-600">{item.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

