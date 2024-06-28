import "server-only";
import db from "@/lib/db";

export async function getUserCredentialsByEmail(email: string) {
  return await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      password: true,
    },
  });
}

export async function findUsername(id: number) {
  return await db.user.findUnique({
    where: {
      id,
    },
    select: {
      username: true,
    },
  });
}

export async function insertUser(
  username: string,
  email: string,
  password: string
) {
  return await db.user.create({
    data: {
      username,
      email,
      password,
    },
    select: {
      id: true,
    },
  });
}
