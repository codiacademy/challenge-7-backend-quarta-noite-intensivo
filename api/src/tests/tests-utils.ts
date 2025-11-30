// tests/test-utils.ts
import { buildApp } from "../app";


export async function build() {
  const app = buildApp();
  await app.ready();
  return app
}

export async function close(app) {
  try {
    await app.close();
  } catch {}
}
