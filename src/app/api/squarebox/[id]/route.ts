import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/squarebox/")[1]);
    const squarebox = await prisma.squarebox.findFirst({ where: { id } });
    return NextResponse.json({ message: "Success", squarebox }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/squarebox/")[1]);
    const { top, left, width, height, border, bordercolor, backgroundcolor } = await req.json();
    const squarebox = await prisma.squarebox.update({
      data: { top, left, width, height, border, bordercolor, backgroundcolor },
      where: { id },
    })
    return NextResponse.json({ message: "Success", squarebox }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/squarebox/")[1]);
    const squarebox = await prisma.squarebox.delete({
      where: { id },
    })
    return NextResponse.json({ message: "Success", squarebox }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};