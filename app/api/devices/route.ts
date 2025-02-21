import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const devices = await prisma.device.findMany();
    return NextResponse.json(devices);
  } catch (error) {
    console.error("Error fetching devices:", error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newDevice = await prisma.device.create({ data: body });
    return NextResponse.json(newDevice);
  } catch (error) {
    console.error("Error creating device:", error);
    return NextResponse.error();
  }
}
