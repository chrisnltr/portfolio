/**
 * Cursor / Next.js tooling sometimes probes /_next/webpack-hmr on :3000.
 * Without a handler that becomes a Vue Router miss and can reset the socket.
 */
export default defineEventHandler((event) => {
  setResponseStatus(event, 404);
  return "";
});
