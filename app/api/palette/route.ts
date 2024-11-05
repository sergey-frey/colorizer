import { paletteDBRepo } from "@/src/server/db";
import { AddPaletteDto } from "@/src/shared/api/dto";
import { Palette } from "@/src/shared/types/palette.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const paletteId = req.nextUrl.searchParams.get("paletteId");

  if (paletteId) {
    try {
      return NextResponse.json(
        {
          data: await paletteDBRepo.getPaletteById(paletteId),
        },
        { status: 200 },
      );
    } catch {
      return NextResponse.json(
        { message: "No palette found" },
        { status: 400 },
      );
    }
  } else {
    try {
      return NextResponse.json(
        { data: await paletteDBRepo.getAllPalettes() },
        { status: 200 },
      );
    } catch {
      return NextResponse.json(
        { message: "Unexpected error" },
        { status: 500 },
      );
    }
  }
}

export async function POST(req: NextRequest) {
  const dto = (await req.json()) as AddPaletteDto;

  if (!dto || !Array.isArray(dto?.colors)) {
    return NextResponse.json({ message: "No palette found" }, { status: 400 });
  }

  try {
    return NextResponse.json(
      {
        data: await paletteDBRepo.addPalette({
          colors: dto.colors,
          title: dto.title,
        }),
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const dto = (await req.json()) as Palette;

  try {
    return NextResponse.json({
      data: await paletteDBRepo.updatePalette({
        id: dto.id,
        colors: dto.colors,
        title: dto.title,
      }),
    });
  } catch {
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const paletteId = req.nextUrl.searchParams.get("paletteId");

  if (!paletteId) {
    return NextResponse.json({ error: "No palette found" }, { status: 400 });
  }

  await paletteDBRepo.deletePalette(paletteId);

  return NextResponse.json({});
}
