import client from "../libs/prismadb";
import getSession from "./getSession";

const getRaces = async () => {
  const session = await getSession();
  if (!session?.user?.email) {
    return [];
  }

  try {
    const races = await client.race.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!races) {
      return [];
    }

    return races;
  } catch (error: any) {
    return [];
  }
};

export default getRaces;
