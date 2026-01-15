import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (username === adminUsername && password === adminPassword) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
  }
}
