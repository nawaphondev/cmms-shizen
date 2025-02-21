import { prisma } from "@/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const createPermissionSchema = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  status: z.string(),
});

export async function GET() {
  try {
    const permissions = await prisma.groupPermission.findMany();
    return NextResponse.json(permissions);
  } catch (error) {
    console.error("Error fetching group permissions:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// export async function POST(request: Request) {

//   const body = await request.json();

//   if (!body || typeof body !== "object") {
//     return new Response(JSON.stringify({ error: "Invalid payload" }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
//   console.log("TEST");
//   const newPermission = await prisma.groupPermission.create({
//     data: {
//       code: "G00003",
//       department: "ฝ่ายวิศวกรรม",
//       name: "Engineers",
//       description: "Permission for engineers",
//       status: "ACTIVE",
//     },
//   });
//   return NextResponse.json(newPermission);
// }

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    // ใช้ข้อมูลที่ส่งมาจาก client (dynamic)
    const newPermission = await prisma.groupPermission.create({
      data: body, // หรือใช้ validatedBody ถ้าคุณทำ validation
    });
    return NextResponse.json(newPermission);
  } catch (error) {
    console.error("Error creating group permission:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}



