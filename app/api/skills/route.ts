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

    const newSkill = await client.skill.create({
      data: {
        name,
        description,
        level,
      },
    });
    return NextResponse.json(newSkill);
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

    const updatedSkill = await client.skill.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        level,
      },
    });
    return NextResponse.json(updatedSkill);
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
