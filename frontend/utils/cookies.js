// utils/cookies.js  (or at top of AuthContext.js if you prefer)
export function readCookie(name) {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(
    new RegExp("(?:^|;\\s*)" + name.replace(/[$()*+./?[\\\]^{|}-]/g, "\\$&") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : "";
}
