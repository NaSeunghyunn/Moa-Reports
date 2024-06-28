"use server";

import getSession from "@/lib/session";
import { findUsername } from "@/repository";

export const getUsername = async () => {
  const session = await getSession();
  const user = await findUsername(session.id!);
  return user?.username;
};
