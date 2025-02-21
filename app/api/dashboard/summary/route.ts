import { NextResponse } from "next/server";

export async function GET() {
  try {
    // ตัวอย่างการ query สรุปข้อมูล (ปรับแก้ให้ตรงกับ schema ของคุณ)
    const repairRequestsSummary = {
      total: 100,
      open: 10,
      inProgress: 5,
      closed: 85,
    };

    const equipmentStatus = {
      operational: 80,
      underMaintenance: 15,
      outOfService: 5,
    };

    // ในตัวอย่างนี้ เราใช้ mock data สำหรับ upcomingMaintenance และ recentActivities
    // ปรับ query ด้วย prisma.findMany() ตาม model ที่คุณมีจริง
    const upcomingMaintenance = [
      { id: "1", equipment: "Machine A", date: "2025-03-01" },
      { id: "2", equipment: "Machine B", date: "2025-03-05" },
    ];
    const recentActivities = [
      {
        id: "1",
        type: "repair",
        description: "Emergency repair on Machine A",
        date: "2025-02-20",
      },
      {
        id: "2",
        type: "inspection",
        description: "Routine inspection on Machine B",
        date: "2025-02-19",
      },
    ];

    const summary = {
      repairRequests: repairRequestsSummary,
      equipmentStatus,
      upcomingMaintenance,
      recentActivities,
    };

    return NextResponse.json(summary);
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
