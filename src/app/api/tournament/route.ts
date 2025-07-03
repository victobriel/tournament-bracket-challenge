import { NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const filePath = process.cwd() + "/src/app/data.json";

    const tournamentJson = await fs.readFile(filePath, "utf-8");
    const parsedData = JSON.parse(tournamentJson);

    return NextResponse.json(parsedData, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}
