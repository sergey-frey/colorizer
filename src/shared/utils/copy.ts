export const copyToClipboard = (data: string) => {
  return window.navigator.clipboard.writeText(data);
};
