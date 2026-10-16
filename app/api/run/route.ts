import { NextResponse } from "next/server";
import { runMasterWorkflow } from "@/lib/agents/master-agent";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const query = body?.query?.trim();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    if (query.length > 500) {
      return NextResponse.json(
        { error: "Query too long (max 500 characters)" },
        { status: 400 }
      );
    }

    const result = await runMasterWorkflow(query);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[API /run] Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process query",
      },
      { status: 500 }
    );
  }
}
