import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const squarebox = await prisma.squarebox.findMany();
    return NextResponse.json({ message: "Success", squarebox }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { top, left, width, height, border, bordercolor, backgroundcolor } = await req.json();
    const squarebox = await prisma.squarebox.create({ data: { top, left, width, height, border, bordercolor, backgroundcolor } })
    return NextResponse.json({ message: "Success", squarebox }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};