// app/api/permissions/[id]/route.ts
import { prisma } from "@/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const updatePermissionSchema = z.object({
  code: z.string().optional(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  status: z.string().optional(),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);
    const permission = await prisma.groupPermission.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!permission) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return NextResponse.json(permission);
  } catch (error) {
    console.error("Error fetching group permission:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);
    const body = await request.json();
    const validationResult = updatePermissionSchema.safeParse(body);
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ error: validationResult.error.errors }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const updatedPermission = await prisma.groupPermission.update({
      where: { id: parseInt(id, 10) },
      data: validationResult.data,
    });
    return NextResponse.json(updatedPermission);
  } catch (error) {
    console.error("Error updating group permission:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await Promise.resolve(params);
    await prisma.groupPermission.delete({
      where: { id: parseInt(id, 10) },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting group permission:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
