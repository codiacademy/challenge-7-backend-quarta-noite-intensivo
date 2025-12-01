
import { buildApp } from "../app";


export async function build() {
  const app = await buildApp();
    return app
}

export async function close(app) {
  try {
    await app.close();
  } catch {}
}
