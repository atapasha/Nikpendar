import { connectDB } from "@/lib/databaseConnection";
import { NextResponse } from "next/server";

export async function GET(params) {
  await connectDB();
  return NextResponse.json({
    success: true,
    message: "connection successfull",
  });
}
