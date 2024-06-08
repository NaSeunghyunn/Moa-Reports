import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicUrls: Routes = {
  "/": true,
  "/sign": true,
};

export async function middleware(request: NextRequest) {
  const isPublic = publicUrls[request.nextUrl.pathname];
  if (isPublic) return;

  const session = await getSession();
  if (!session.id) {
    return NextResponse.redirect(new URL("/sign", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
