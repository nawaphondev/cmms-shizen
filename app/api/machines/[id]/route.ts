import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const { id } = await params;
      const machine = await prisma.machine.findUnique({ where: { id: parseInt(id) } });
      if (!machine)
        return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
      return NextResponse.json(machine);
    } catch (error) {
      console.error("Error fetching machine:", error);
      return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const { id } = await params; // Await ค่า params ก่อนใช้งาน
      const body = await request.json();
      const updatedMachine = await prisma.machine.update({
        where: { id: parseInt(id) },
        data: body,
      });
      return NextResponse.json(updatedMachine);
    } catch (error) {
      console.error("Error updating machine:", error);
      return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
  ) {
    try {
      const { id } = await params;
      await prisma.machine.delete({ where: { id: parseInt(id) } });
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error deleting machine:", error);
      return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
