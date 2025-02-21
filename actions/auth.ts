"use server";
import { prisma } from "@/db";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { type User, UserRole } from "@/lib/types";
import { SignJWT, jwtVerify } from "jose";

// ระบุ secret key สำหรับ JWT ใน environment variable เช่น JWT_SECRET
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "shizenchem"
);

export const loginAction = async (
  username: string,
  password: string
): Promise<User | null> => {
  try {
    // ค้นหาผู้ใช้ตาม username
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) throw new Error("Invalid credentials");

    // เปรียบเทียบรหัสผ่านที่ส่งเข้ามากับ hashed password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Invalid credentials");

    const cookieStore = await cookies();
    // สร้าง JWT token (ระบุ payload อย่างน้อย id และ role)

    const token = await new SignJWT({
      sub: user.id.toString(),
      name: user.name,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(JWT_SECRET);

    // Set the JWT as an HTTP-only cookie
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
    });

    // ส่งข้อมูลผู้ใช้ (ไม่ส่ง password) พร้อม token
    return { id: user.id, role: user.role, name: user.name };
  } catch (error) {
    console.error("Error in login:", error);
    return null;
  }
};

export async function logoutAction() {
  const cookieStore = await cookies();

  // Delete the cookie by name. Ensure the path matches the one used when setting the cookie.
  cookieStore.delete("token");

  return { success: true, message: "Logged out successfully" };
}

export async function getUserDataAction(): Promise<User | null> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");

  if (!tokenCookie) {
    return null;
  }

  try {
    const token = tokenCookie.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // Assuming your JWT payload includes sub (id), name, and role.
    return {
      id: parseInt(payload.sub!),
      name: payload.name as string,
      role: payload.role as UserRole,
    };
  } catch (error) {
    return null;
  }
}
