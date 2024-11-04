import ky from "ky";

export const aiApi = ky.create({
  prefixUrl: "/ai",
});

export const paletteApi = ky.create({
  prefixUrl: "/api/palette",
});
