import client from "../libs/prismadb";
import getSession from "./getSession";

const getSkills = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const skills = await client.skill.findMany({
      orderBy: {
        level: "asc",
      },
      include: {
        classes: true,
      },
    });

    if (!skills) {
      return [];
    }

    return skills;
  } catch (error: any) {
    return [];
  }
};

export default getSkills;
