import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const staffList = await prisma.staff.findMany();
    return NextResponse.json(staffList);
  } catch (error) {
    console.error("Error fetching staff:", error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newStaff = await prisma.staff.create({ data: body });
    return NextResponse.json(newStaff);
  } catch (error) {
    console.error("Error creating staff:", error);
    return NextResponse.error();
  }
}
