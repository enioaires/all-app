import client from "@/app/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, name, password, role } = body;

    if (!email || !name || !password || !role) {
      return new NextResponse("Missing required fields", {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await client.user.create({
      data: {
        email,
        name,
        hashedPassword,
        role,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
