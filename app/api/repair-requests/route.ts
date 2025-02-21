import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const repairRequests = await prisma.repairRequest.findMany();
    return NextResponse.json(repairRequests);
  } catch (error) {
    console.error("Error fetching repair requests:", error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newRepairRequest = await prisma.repairRequest.create({
      data: {
        requestNumber: body.requestNumber,
        repairType: body.repairType,
        department: body.department,
        team: body.team,
        machineCode: body.machineCode,
        machineName: body.machineName,
        initialSymptoms: body.initialSymptoms,
        machineStatus: body.machineStatus,
        reporter: body.reporter,
        responsible: body.responsible,
        reportDate: new Date(body.reportDate),
        reason: body.reason,
        solution: body.solution,
        status: body.status,
      },
    });
    return NextResponse.json(newRepairRequest);
  } catch (error) {
    console.error("Error creating repair request:", error);
    return NextResponse.error();
  }
}
