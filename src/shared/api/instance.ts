import ky from "ky";

export const paletteApi = ky.create({
  prefixUrl: "http://localhost:4000/palettes",
  hooks: {
    beforeRequest: [
      (req) => {
        return new Promise((resolve) => setTimeout(resolve, 500)).then(
          () => req,
        );
      },
    ],
  },
});

export const aiApi = ky.create({
  prefixUrl: "http://localhost:3000/ai",
  hooks: {
    beforeRequest: [
      (req) => {
        return new Promise((resolve) => setTimeout(resolve, 500)).then(
          () => req,
        );
      },
    ],
  },
});
