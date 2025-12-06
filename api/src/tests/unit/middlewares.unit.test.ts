import { describe, it, expect } from "vitest";
import jwt from "jsonwebtoken";
import { env } from "../../utils/env";
import { hasRole } from "../../middlewares/hasRole";
import { authGlobal } from "../../middlewares/authGlobal";

describe("Middlewares unit", () => {
  it("hasRole denies when user missing", async () => {
    const mw = hasRole("ADMIN");
    const req: any = {};
    const reply: any = { status: (code: number) => ({ send: (v: any) => v }) };
    const out = await mw(req, reply);
    expect(out).toBeDefined();
  });

  it("hasRole denies insufficient role", async () => {
    const mw = hasRole("ADMIN");
    const req: any = { user: { role: "USER" } };
    const reply: any = { status: (code: number) => ({ send: (v: any) => v }) };
    const out = await mw(req, reply);
    expect(out).toBeDefined();
  });

  it("authGlobal allows public routes", async () => {
    const req: any = { url: "/docs", headers: {} };
    const reply: any = { status: () => ({ send: () => null }) };
    const out = await authGlobal(req, reply);
    expect(out).toBeUndefined();
  });

  it("authGlobal rejects missing token", async () => {
    const req: any = { url: "/users", headers: {} };
    const reply: any = { status: (s: number) => ({ send: (v: any) => v }) };
    const out = await authGlobal(req, reply);
    expect(out).toBeDefined();
  });

  it("authGlobal accepts valid token and sets request.user", async () => {
    const payload = { id: 5, email: "a@b.com", role: "ADMIN" };
    const token = jwt.sign(payload, env.JWT_SECRET as string, { expiresIn: "1h" });
    const req: any = { url: "/users", headers: { authorization: `Bearer ${token}` } };
    const reply: any = { status: () => ({ send: () => null }) };
    await authGlobal(req, reply);
    expect(req.user).toBeDefined();
    expect(req.user.id).toBe(5);
  });
});
