export const makeLink = (
  route: string,
  params: Record<string, string> = {},
) => {
  const searchParams = new URLSearchParams();

  for (const paramKey in params) {
    searchParams.set(paramKey, params[paramKey]);
  }

  return `${route}?${searchParams.toString()}`;
};
