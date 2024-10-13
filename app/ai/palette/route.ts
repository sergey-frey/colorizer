import { aiPaletteService } from "@/src/entities/palette/model/ai-palette.service";
import { GetAIPaletteDto } from "@/src/shared/api/dto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as GetAIPaletteDto;

  const { amountOfColors } = body;

  const palette = await aiPaletteService.getPalette({ amountOfColors });

  if (!palette) {
    return NextResponse.json({ error: "No palette found" }, { status: 500 });
  }

  return NextResponse.json(palette);
}
