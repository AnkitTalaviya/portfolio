const baseUrl = import.meta.env.BASE_URL;

export function withBase(path: string) {
  return `${baseUrl}${path.replace(/^\/+/, '')}`;
}

export function siteHref(path: string) {
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#')
  ) {
    return path;
  }

  return withBase(path);
}

export function documentUrl(fileName: string) {
  return withBase(`documents/${fileName}`);
}

export function modelUrl(fileName: string) {
  return withBase(`models/${fileName}`);
}
