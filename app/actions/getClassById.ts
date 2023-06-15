import client from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getClassById = async (classId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) return null;

    const race = await client.class.findUnique({
      where: {
        id: classId,
      },
    });

    return race;
  } catch (error: any) {
    return null;
  }
};

export default getClassById;
