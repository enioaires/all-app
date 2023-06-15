import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, description, image } = body;

    if (!name || !image || !description) {
      return new NextResponse("Missing required fields", {
        status: 400,
      });
    }

    const newClass = await client.class.create({
      data: {
        name,
        description,
        image,
      },
    });

    return NextResponse.json(newClass);
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { id, name, description, image } = body;

    if (!id || !name || !image || !description) {
      return new NextResponse("Missing required fields", {
        status: 400,
      });
    }

    const updatedClass = await client.class.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        image,
      },
    });
    return NextResponse.json(updatedClass);
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
