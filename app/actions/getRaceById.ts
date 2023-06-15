import client from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getRaceById = async (raceId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) return null;

    const race = await client.race.findUnique({
      where: {
        id: raceId,
      },
    });

    return race;
  } catch (error: any) {
    return null;
  }
};

export default getRaceById;
