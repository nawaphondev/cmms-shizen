import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const staffMember = await prisma.staff.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!staffMember)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(staffMember);
  } catch (error) {
    console.error("Error fetching staff member:", error);
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
    const updatedStaff = await prisma.staff.update({
      where: { id: parseInt(id) },
      data: body,
    });
    return NextResponse.json(updatedStaff);
  } catch (error) {
    console.error("Error updating staff:", error);
    return NextResponse.error();
  }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const { id } = await params;
      await prisma.staff.delete({ where: { id: parseInt(id) } });
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error deleting staff:", error);
      return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  
