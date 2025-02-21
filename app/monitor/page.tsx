"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, FileText, Download, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SparePartsDetailDialog } from "@/components/spare-parts-detail-dialog";
import { useRouter } from "next/navigation";

interface RepairRequest {
  id: string;
  type: string;
  department: string;
  machineName: string;
  symptoms: string;
  spareParts: string;
  reporter: string;
  repairStatus: string;
  machineStatus: string;
}

export default function MonitorPage() {
  const router = useRouter();
  const [date, setDate] = useState<Date[]>([
    new Date(2021, 2, 18),
    new Date(2021, 2, 28),
  ]);
  const [filters, setFilters] = useState({
    repairType: "all-case",
    repairStatus: "all-status",
    machineStatus: "all-status",
  });
  const [selectedRepairId, setSelectedRepairId] = useState<string | null>(null);

  // Mock data for the table
  const repairRequests: RepairRequest[] = [
    {
      id: "C00001",
      type: "เครื่องจักร",
      department: "แผนกผลิตเครื่องขึ้นรูป",
      machineName: "เครื่องขึ้นรูป 32 Oz.",
      symptoms: "ล้อกลายเหล็กหรอ ล้อแตก เบรกเสื่อม",
      spareParts: "รายละเอียด",
      reporter: "พงศกร",
      repairStatus: "รออะไหล่",
      machineStatus: "Break down",
    },
    // Add more mock data as needed
  ];

  const handleExport = (format: "excel" | "pdf") => {
    console.log(`Exporting as ${format}`);
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.length === 2
                ? `${format(date[0], "dd MMM yyyy")} - ${format(
                    date[1],
                    "dd MMM yyyy"
                  )}`
                : "Select date range"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date[0]}
              selected={date}
              onSelect={(newDate) => {
                if (Array.isArray(newDate)) {
                  setDate(newDate);
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Select
          value={filters.repairType}
          onValueChange={(value) =>
            setFilters({ ...filters, repairType: value })
          }
        >
          <SelectTrigger className="w-[200px] bg-green-100">
            <SelectValue placeholder="ประเภทซ่อม" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-case">All case</SelectItem>
            <SelectItem value="machine">เครื่องจักร</SelectItem>
            <SelectItem value="utility">ระบบสาธารณูปโภค</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.repairStatus}
          onValueChange={(value) =>
            setFilters({ ...filters, repairStatus: value })
          }
        >
          <SelectTrigger className="w-[200px] bg-red-100">
            <SelectValue placeholder="สถานะใบแจ้งซ่อม" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-status">All Status</SelectItem>
            <SelectItem value="waiting">รอดำเนินการ</SelectItem>
            <SelectItem value="in-progress">กำลังดำเนินการ</SelectItem>
            <SelectItem value="completed">เสร็จสิ้น</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.machineStatus}
          onValueChange={(value) =>
            setFilters({ ...filters, machineStatus: value })
          }
        >
          <SelectTrigger className="w-[200px] bg-yellow-100">
            <SelectValue placeholder="สถานะเครื่องจักร" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-status">All Status</SelectItem>
            <SelectItem value="running">Running</SelectItem>
            <SelectItem value="break-down">Break Down</SelectItem>
            <SelectItem value="maintenance">Under Maintenance</SelectItem>
          </SelectContent>
        </Select>

        <div className="ml-auto space-x-2">
          <Button
            onClick={() => handleExport("excel")}
            className="bg-green-500 hover:bg-green-600"
          >
            Export Excel
          </Button>
          <Button
            onClick={() => handleExport("pdf")}
            className="bg-red-500 hover:bg-red-600"
          >
            Export PDF
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-purple-100 text-purple-900">
                เลขที่แจ้งซ่อม
              </TableHead>
              <TableHead className="bg-purple-100 text-purple-900">
                ประเภทซ่อม
              </TableHead>
              <TableHead className="bg-purple-100 text-purple-900">
                ส่วนงาน
              </TableHead>
              <TableHead className="bg-purple-100 text-purple-900">
                ชื่อเครื่องจักร
              </TableHead>
              <TableHead className="bg-purple-100 text-purple-900">
                อาการเบื้องต้น
              </TableHead>
              <TableHead className="bg-purple-100 text-purple-900">
                รายการ spare parts
              </TableHead>
              <TableHead className="bg-purple-100 text-purple-900">
                ผู้แจ้งซ่อม
              </TableHead>
              <TableHead className="bg-purple-100 text-purple-900">
                สถานะใบแจ้งซ่อม
              </TableHead>
              <TableHead className="bg-purple-100 text-purple-900">
                สถานะเครื่องจักร
              </TableHead>
              <TableHead className="bg-purple-100 text-purple-900">
                Operation
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {repairRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.type}</TableCell>
                <TableCell>{request.department}</TableCell>
                <TableCell>{request.machineName}</TableCell>
                <TableCell>{request.symptoms}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-500"
                    onClick={() => router.push(`/spare-parts/${request.id}`)}
                  >
                    {request.spareParts}
                  </Button>
                </TableCell>
                <TableCell>{request.reporter}</TableCell>
                <TableCell>{request.repairStatus}</TableCell>
                <TableCell>{request.machineStatus}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setSelectedRepairId(request.id)}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ClipboardList className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <SparePartsDetailDialog
        open={!!selectedRepairId}
        onOpenChange={(open) => !open && setSelectedRepairId(null)}
        repairId={selectedRepairId || ""}
      />
    </div>
  );
}
