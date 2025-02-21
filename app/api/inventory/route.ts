import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const inventoryItems = await prisma.inventoryItem.findMany();
    return NextResponse.json(inventoryItems);
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newItem = await prisma.inventoryItem.create({ data: body });
    return NextResponse.json(newItem);
  } catch (error) {
    console.error("Error creating inventory item:", error);
    return NextResponse.error();
  }
}
