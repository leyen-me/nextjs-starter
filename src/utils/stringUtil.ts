export const isExternalUrl = (url: string) => {
  return url.startsWith("http://") || url.startsWith("https://");
};
