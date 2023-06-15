import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      description,
      image,
      uniqueSkillName,
      uniqueSkillDescription,
    } = body;

    if (!name || !image || !description) {
      return new NextResponse("Missing required fields", {
        status: 400,
      });
    }

    const newRace = await client.race.create({
      data: {
        name,
        description,
        image,
        uniqueSkillName,
        uniqueSkillDescription,
      },
    });
    return NextResponse.json(newRace);
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const {
      id,
      name,
      description,
      image,
      uniqueSkillName,
      uniqueSkillDescription,
    } = body;

    if (!id || !name || !image || !description) {
      return new NextResponse("Missing required fields", {
        status: 400,
      });
    }

    const updatedRace = await client.race.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        image,
        uniqueSkillName,
        uniqueSkillDescription,
      },
    });
    return NextResponse.json(updatedRace);
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
