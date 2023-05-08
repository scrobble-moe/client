import { PlexOauth } from "plex-oauth";

export const plexOauth = new PlexOauth({
  clientIdentifier: import.meta.env.VITE_PLEX_CLIENT_IDENTIFIER,
  product: "scrobble.moe",
  device: "Browser",
  version: "1",
  forwardUrl: `${window.location.origin}/auth/callback`,
});
