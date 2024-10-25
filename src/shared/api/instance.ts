import ky from "ky";

export const aiApi = ky.create({
  prefixUrl: "/ai",
});
