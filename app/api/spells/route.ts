import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, description, level } = body;

    if (!name || !level || !description) {
      return new NextResponse("Missing required fields", {
        status: 400,
      });
    }

    const newSpell = await client.spell.create({
      data: {
        name,
        description,
        level,
      },
    });
    return NextResponse.json(newSpell);
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { id, name, description, level } = body;

    if (!id || !name || !level || !description) {
      return new NextResponse("Missing required fields", {
        status: 400,
      });
    }

    const updatedSpell = await client.spell.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        level,
      },
    });
    return NextResponse.json(updatedSpell);
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
