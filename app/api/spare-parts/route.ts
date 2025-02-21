import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const spareParts = await prisma.sparePart.findMany();
    return NextResponse.json(spareParts);
  } catch (error) {
    console.error("Error fetching spare parts:", error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newSparePart = await prisma.sparePart.create({ data: body });
    return NextResponse.json(newSparePart);
  } catch (error) {
    console.error("Error creating spare part:", error);
    return NextResponse.error();
  }
}
