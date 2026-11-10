const PLATFORM_HOST_SUFFIXES = [
  ".lovable.app",
  ".workers.dev",
  ".pages.dev",
  ".netlify.app",
] as const;

export function isPlatformHostname(hostname: string): boolean {
  const normalized = hostname.trim().toLowerCase().replace(/\.$/, "");
  return PLATFORM_HOST_SUFFIXES.some((suffix) => normalized.endsWith(suffix));
}

export function applyPlatformNoindex(request: Request, response: Response): Response {
  const contentType = response.headers.get("content-type") ?? "";
  const hostname = new URL(request.url).hostname;

  if (!contentType.toLowerCase().includes("text/html") || !isPlatformHostname(hostname)) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
