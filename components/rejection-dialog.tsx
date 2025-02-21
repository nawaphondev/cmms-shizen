import { AlertCircle } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface RejectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  referenceNumber: string
  onConfirm: (remark: string) => void
}

export function RejectionDialog({ open, onOpenChange, referenceNumber, onConfirm }: RejectionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px] p-0">
        <div className="px-6 pt-6 pb-4 text-center">
          <h2 className="text-xl font-medium mb-2">ใบแจ้งซ่อม</h2>
          <p className="text-red-500 font-medium mb-4">ไม่ได้รับการอนุมัติ</p>
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full bg-red-100 animate-scale-up" />
            <AlertCircle
              className="absolute inset-0 w-full h-full text-red-500 animate-fade-in"
              style={{ animation: "fadeIn 0.3s ease-out forwards 0.3s" }}
            />
          </div>
          <div className="text-sm mb-4">
            <span className="text-gray-600">หมายเลขใบแจ้งซ่อม : </span>
            <span className="font-medium">{referenceNumber}</span>
          </div>
          <div className="text-left">
            <Label className="text-red-500">หมายเหตุ :</Label>
            <Textarea
              className="mt-2"
              placeholder="กรุณาระบุเหตุผล"
              onChange={(e) => {
                // Handle remark changes
              }}
            />
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

