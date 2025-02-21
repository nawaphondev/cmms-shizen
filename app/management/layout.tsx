// app/management/layout.tsx
// ไม่มี "use client" ก็ได้ ถ้าไม่มี hook ฝั่ง client

import type React from "react";
// ถ้าต้องการ reuse RootLayoutContent หรือ Sidebar จาก root ก็ import มาด้วย
// import { RootLayoutContent } from "@/components/root-layout-content";

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ถ้าต้องการ Layout ย่อยซ้อน Layout หลัก ก็ห่อ children ด้วยโค้ดของคุณ
  // ตัวอย่าง: ใส่ container หรือ breadcrumb เฉพาะหน้า management
  return (
    <div>
      {/* render children */}
      {children}
    </div>
  );
}
