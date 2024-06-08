import db from "@/lib/db";

export const checkEmail = async (email: string) => {
  const userEmail = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(userEmail);
};

export const existsEmail = async (email: string) => !(await checkEmail(email));
