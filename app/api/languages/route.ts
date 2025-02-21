import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const languages = await prisma.language.findMany();
    return NextResponse.json(languages);
  } catch (error) {
    console.error("Error fetching languages:", error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newLanguage = await prisma.language.create({ data: body });
    return NextResponse.json(newLanguage);
  } catch (error) {
    console.error("Error creating language:", error);
    return NextResponse.error();
  }
}
