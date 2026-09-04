const YOUTUBE_HOSTS = new Set(["youtube.com", "www.youtube.com", "m.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com"]);

export function youtubeEmbedUrl(value: string): string | null {
  if (value.length > 2048 || /[\s\\]/.test(value)) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
    const segments = url.pathname.split("/").filter(Boolean);
    let id: string | null = null;
    if (url.hostname === "youtu.be" && segments.length === 1) id = segments[0];
    else if (YOUTUBE_HOSTS.has(url.hostname)) {
      if (url.pathname === "/watch") id = url.searchParams.get("v");
      else if (segments.length === 2 && ["embed", "shorts", "live"].includes(segments[0])) id = segments[1];
    }
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}?rel=0` : null;
  } catch { return null; }
}

export function localVideoPath(value: string): string | null {
  return /^\/videos\/[a-zA-Z0-9_-]+\.(mp4|webm|ogg)$/.test(value) ? value : null;
}
