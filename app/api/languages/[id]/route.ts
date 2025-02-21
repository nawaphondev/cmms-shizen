import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const language = await prisma.language.findUnique({ where: { id: parseInt(params.id) } });
    if (!language) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(language);
  } catch (error) {
    console.error("Error fetching language:", error);
    return NextResponse.error();
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Await ค่า params ก่อนใช้งาน
    const body = await request.json();
    const updatedLanguage = await prisma.language.update({
      where: { id: parseInt(id) },
      data: body,
    });
    return NextResponse.json(updatedLanguage);
  } catch (error) {
    console.error("Error updating language:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
