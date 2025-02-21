import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const repairRequest = await prisma.repairRequest.findUnique({
      where: { id: parseInt(id) },
    });
    if (!repairRequest) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(repairRequest);
  } catch (error) {
    console.error("Error fetching repair request:", error);
    return NextResponse.error();
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updatedRepairRequest = await prisma.repairRequest.update({
      where: { id: parseInt(id) },
      data: body,
    });
    return NextResponse.json(updatedRepairRequest);
  } catch (error) {
    console.error("Error updating repair request:", error);
    return NextResponse.error();
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.repairRequest.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting repair request:", error);
    return NextResponse.error();
  }
}
