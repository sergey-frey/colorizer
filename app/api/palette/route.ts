import { AddPaletteDto } from "@/src/shared/api/dto";
import { paletteDBRepo } from "@/src/shared/api/repos/palette-db.repo";
import { Palette } from "@/src/shared/types/palette.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const paletteId = req.nextUrl.searchParams.get("paletteId");

  if (paletteId) {
    try {
      return NextResponse.json(await paletteDBRepo.getPaletteById(paletteId));
    } catch {
      return NextResponse.json({ error: "No palette found" }, { status: 400 });
    }
  } else {
    try {
      return NextResponse.json(await paletteDBRepo.getAllPalettes());
    } catch {
      return NextResponse.json({ error: "No palettes found" }, { status: 400 });
    }
  }
}

export async function POST(req: NextRequest) {
  const dto = (await req.json()) as AddPaletteDto;

  if (!dto || !Array.isArray(dto?.colors)) {
    return NextResponse.json({ error: "No palette found" }, { status: 400 });
  }

  return NextResponse.json(
    await paletteDBRepo.addPalette({ colors: dto.colors, title: dto.title }),
  );
}

export async function PUT(req: NextRequest) {
  const dto = (await req.json()) as Palette;

  return NextResponse.json(
    await paletteDBRepo.updatePalette({
      id: dto.id,
      colors: dto.colors,
      title: dto.title,
    }),
  );
}

export async function DELETE(req: NextRequest) {
  const paletteId = req.nextUrl.searchParams.get("paletteId");

  if (!paletteId) {
    return NextResponse.json({ error: "No palette found" }, { status: 400 });
  }

  await paletteDBRepo.deletePalette(paletteId);

  return NextResponse.json({});
}
