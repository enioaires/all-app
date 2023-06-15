import client from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getSpellById = async (spellId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) return null;

    const spell = await client.spell.findUnique({
      where: {
        id: spellId,
      },
    });

    return spell;
  } catch (error: any) {
    return null;
  }
};

export default getSpellById;
