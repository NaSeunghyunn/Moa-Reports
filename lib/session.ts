import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

export const sessionOptions = {
  cookieName: "moa-reports",
  password: process.env.COOKIE_PASSWORD!,
};

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), sessionOptions);
}
