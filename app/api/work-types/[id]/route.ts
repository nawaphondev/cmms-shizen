import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const workType = await prisma.workType.findUnique({
      where: { id: parseInt(id) },
    });
    if (!workType)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(workType);
  } catch (error) {
    console.error("Error fetching work type:", error);
    return NextResponse.error();
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // รอให้ params resolve แล้วจึงใช้ id
    const body = await request.json();
    const updatedWorkType = await prisma.workType.update({
      where: { id: parseInt(id) },
      data: body,
    });
    return NextResponse.json(updatedWorkType);
  } catch (error) {
    console.error("Error updating work type:", error);
    return NextResponse.error();
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.workType.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting work type:", error);
    return NextResponse.error();
  }
}
