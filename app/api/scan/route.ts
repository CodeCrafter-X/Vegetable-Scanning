import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not configured");
}

const client = new GoogleGenAI({ apiKey });

const ScanResultSchema = z.object({
  isVegetableOrFruit: z.boolean(),
  detectedItem: z.string(),
  freshnessScore: z.number(),
  condition: z.enum(["fresh", "aging", "spoiled", "n/a"]),
  diseaseDetected: z.boolean(),
  diseaseName: z.string().nullable(),
  diseaseSymptoms: z.string().nullable(),
  recommendation: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { imageBase64, mimeType } = body;

    // Validate image data
    if (typeof imageBase64 !== "string" || !imageBase64) {
      return NextResponse.json(
        { error: "Image data is required" },
        { status: 400 }
      );
    }

    // Validate MIME type
    if (typeof mimeType !== "string" || !mimeType) {
      return NextResponse.json(
        { error: "Image MIME type is required" },
        { status: 400 }
      );
    }

    const prompt = `You are a produce inspection assistant. Look at this image carefully.

Determine:
- Whether it shows a vegetable or fruit at all
- If so, what it is
- A freshness score from 0-100
- Its condition
- Whether any disease/pest damage is visible, and what it is
- One short actionable recommendation

If the image is NOT a vegetable or fruit, set isVegetableOrFruit to false, freshnessScore to 0, condition to "n/a", and describe what the image actually shows in detectedItem.`;

    const interaction = await client.interactions.create({
      model: "gemini-3.6-flash",
      input: [
        {
          type: "text",
          text: prompt,
        },
        {
          type: "image",
          data: imageBase64,
          mime_type: mimeType,
        },
      ],
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema: z.toJSONSchema(ScanResultSchema),
      },
    });

    // Make sure Gemini returned text
    if (!interaction.output_text) {
      throw new Error("Gemini returned empty output");
    }

    // Parse and validate Gemini response
    const parsed = ScanResultSchema.parse(
      JSON.parse(interaction.output_text)
    );

    return NextResponse.json(parsed);
  } catch (err: unknown) {
    console.error("Scan API error:", err);

    if (
      typeof err === "object" &&
      err !== null &&
      "status" in err &&
      (err as { status?: number }).status === 429
    ) {
      return NextResponse.json(
        { error: "Rate limited" },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Could not analyze image" },
      { status: 500 }
    );
  }
}