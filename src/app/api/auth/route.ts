import { createToken, verifyToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = req.cookies.get("session");
  if (!session) throw Error("No token present");
  const token = session.value;
  const user = verifyToken(token);
  return NextResponse.json(user);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { username, password } = data;
  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PW
  ) {
    const token = createToken(username, password);
    return NextResponse.json({ token });
  }
  throw Error("Not valid login");
}
