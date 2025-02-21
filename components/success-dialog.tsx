import { Check } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const successDialogStyles = {
  "@keyframes scaleUp": {
    "0%": { transform: "scale(0)", opacity: 0 },
    "100%": { transform: "scale(1)", opacity: 1 },
  },
  "@keyframes checkmark": {
    "0%": { strokeDashoffset: 100 },
    "100%": { strokeDashoffset: 0 },
  },
}

const styles = {
  ".animate-scale-up": {
    animation: "scaleUp 0.3s ease-out forwards",
  },
  ".animate-check": {
    strokeDasharray: 100,
    animation: "checkmark 0.6s ease-out forwards 0.3s",
  },
} as const

interface SuccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  referenceNumber: string
}

export function SuccessDialog({ open, onOpenChange, referenceNumber }: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px] p-0">
        <div className="px-6 pt-6 pb-4 text-center">
          <h2 className="text-xl font-medium mb-2">ใบแจ้งซ่อม</h2>
          <p className="text-green-500 font-medium mb-4">ได้รับการอนุมัติ</p>
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full bg-green-100 animate-scale-up" />
            <Check className="absolute inset-0 w-full h-full text-green-500 animate-check" />
          </div>
          <div className="text-sm">
            <span className="text-gray-600">หมายเลขใบแจ้งซ่อม : </span>
            <span className="font-medium">{referenceNumber}</span>
          </div>
        </div>
        <div className="p-4 bg-gray-50">
          <Button className="w-full bg-[#4ade80] hover:bg-[#22c55e]" onClick={() => onOpenChange(false)}>
            ยืนยัน
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

