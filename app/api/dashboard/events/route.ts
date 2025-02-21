import { NextResponse } from "next/server";

export async function GET() {
  try {
    // ตัวอย่างการ query events (ปรับแก้ให้ตรงกับ model ของคุณ)
    // ในตัวอย่างนี้ เราใช้ mock data
    const events = [
      {
        id: "1",
        title: "Maintenance Check",
        start: "2025-02-20T09:00:00.000Z",
        end: "2025-02-20T11:00:00.000Z",
        type: "maintenance",
      },
      {
        id: "2",
        title: "Emergency Repair",
        start: "2025-02-21T12:00:00.000Z",
        end: "2025-02-21T14:00:00.000Z",
        type: "repair",
      },
      {
        id: "3",
        title: "Inspection",
        start: "2025-02-22T08:00:00.000Z",
        end: "2025-02-22T09:00:00.000Z",
        type: "inspection",
      },
    ];

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching dashboard events:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
