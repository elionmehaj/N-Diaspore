const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "0.0.0.0"]);

function isLocalHost(hostname: string): boolean {
  return LOCAL_HOSTS.has(hostname.toLowerCase());
}

function parseUrl(value: string): URL | null {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

export function getAgentsApiBaseUrl(): string {
  const configuredUrl = (import.meta.env.VITE_AGENTS_API_URL || "")
    .trim()
    .replace(/\/+$/, "");

  if (!configuredUrl) return "";

  const parsed = parseUrl(configuredUrl);
  if (!parsed) return configuredUrl;

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return "";
  }

  if (typeof window !== "undefined") {
    const appIsLocal = isLocalHost(window.location.hostname);
    const apiIsLocal = isLocalHost(parsed.hostname);

    if (apiIsLocal && !appIsLocal) {
      return "";
    }
  }

  return configuredUrl;
}

export function getAgentApiUrl(path: string): string {
  const baseUrl = getAgentsApiBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return baseUrl ? `${baseUrl}${normalizedPath}` : normalizedPath;
}
