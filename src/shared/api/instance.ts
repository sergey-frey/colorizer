import ky from "ky";

export const aiApi = ky.create({
  prefixUrl: "/api/ai",
});

export const paletteApi = ky.create({
  prefixUrl: "/api/palette",
});
