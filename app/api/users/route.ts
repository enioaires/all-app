import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = getCurrentUser();

    const body = await req.json();

    const { id } = body;

    if (!id) {
      return new NextResponse("Missing required fields", {
        status: 400,
      });
    }

    const deletedUser = await client.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(deletedUser);
  } catch (error: any) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
