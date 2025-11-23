// tests/test-utils.ts
import app from "../app";

export async function build() {
  await app.ready();
  return app;
}

export async function close() {
  try {
    await app.close();
  } catch {}
}
