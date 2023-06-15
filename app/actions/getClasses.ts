import client from "../libs/prismadb";
import getSession from "./getSession";

const getClasses = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const classes = await client.class.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        spells: true,
        skills: true,
      },
    });

    if (!classes) {
      return [];
    }

    return classes;
  } catch (error: any) {
    return [];
  }
};

export default getClasses;
