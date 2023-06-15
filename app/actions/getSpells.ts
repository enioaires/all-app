import client from "../libs/prismadb";
import getSession from "./getSession";

const getSpells = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const spells = await client.spell.findMany({
      orderBy: {
        level: "asc",
      },
      include: {
        classes: true,
      },
    });

    if (!spells) {
      return [];
    }

    return spells;
  } catch (error: any) {
    return [];
  }
};

export default getSpells;
