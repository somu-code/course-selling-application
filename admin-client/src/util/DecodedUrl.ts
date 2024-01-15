export function base64UrlDecoded(base64Url: string): string {
  const base64: string = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const paddedBase64: string = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return atob(paddedBase64);
}
