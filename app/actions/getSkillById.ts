import client from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getSkillById = async (skillId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) return null;

    const skill = await client.skill.findUnique({
      where: {
        id: skillId,
      },
    });

    return skill;
  } catch (error: any) {
    return null;
  }
};

export default getSkillById;
