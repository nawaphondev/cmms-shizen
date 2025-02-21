import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function updateUserPasswords() {
  try {
    // ดึงผู้ใช้ทั้งหมดจากฐานข้อมูล
    const users = await prisma.user.findMany();
    for (const user of users) {
      // ตรวจสอบว่ารหัสผ่านยังไม่ถูก hash (ตัวอย่าง: อาจตรวจสอบความยาวหรือ pattern)
      // สมมุติว่ารหัสผ่านที่ไม่ได้ hash มีความยาวน้อยกว่า 60 ตัวอักษร (bcrypt hash จะมี 60 ตัวอักษร)
      if (user.password.length < 60) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await prisma.user.update({
          where: { id: user.id },
          data: { password: hashedPassword },
        });
        console.log(`Updated password for user: ${user.username}`);
      } else {
        console.log(`User ${user.username} password already hashed.`);
      }
    }
    console.log("All users updated.");
  } catch (error) {
    console.error("Error updating user passwords:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateUserPasswords();
