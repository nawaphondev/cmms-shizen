import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const workTypes = await prisma.workType.findMany();
    return NextResponse.json(workTypes);
  } catch (error) {
    console.error("Error fetching work types:", error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newWorkType = await prisma.workType.create({ data: body });
    return NextResponse.json(newWorkType);
  } catch (error) {
    console.error("Error creating work type:", error);
    return NextResponse.error();
  }
}
