import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@/db";

// ระบุ secret key สำหรับ JWT ใน environment variable เช่น JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET || "shizenchem";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // ค้นหาผู้ใช้ตาม username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // เปรียบเทียบรหัสผ่านที่ส่งเข้ามากับ hashed password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // สร้าง JWT token (ระบุ payload อย่างน้อย id และ role)
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });


    // ส่งข้อมูลผู้ใช้ (ไม่ส่ง password) พร้อม token
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ ...userWithoutPassword, token });
  } catch (error) {
    console.error("Error in login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
