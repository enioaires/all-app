import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("You must be logged in to do that", {
        status: 401,
      });
    }

    if (currentUser.role !== "admin") {
      return new NextResponse("You must be an admin to do that", {
        status: 401,
      });
    }

    const body = await req.json();

    const { id } = body;

    if (!id) {
      return new NextResponse("Missing required fields", {
        status: 400,
      });
    }

    const deletedRace = await client.race.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedRace);
  } catch (error: any) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
