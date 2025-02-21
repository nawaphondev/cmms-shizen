import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const machines = await prisma.machine.findMany();
    return NextResponse.json(machines);
  } catch (error) {
    console.error("Error fetching machines:", error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newMachine = await prisma.machine.create({ data: body });
    return NextResponse.json(newMachine);
  } catch (error) {
    console.error("Error creating machine:", error);
    return NextResponse.error();
  }
}
