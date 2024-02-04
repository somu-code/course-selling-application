export function base64UrlDecoded(base64Url) {
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const paddedBase64 = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );
  return atob(paddedBase64);
}
