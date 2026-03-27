import { describe, it, expect } from "vitest";
import request from "supertest";
import { server } from "./server.js";

describe("server", () => {
  it("GET / returns available endpoints", async () => {
    const res = await request(server).get("/");
    expect(res.status).toBe(200);
    expect(res.body.endpoints).toContain("GET /health");
  });

  it("GET /ready returns pass", async () => {
    const res = await request(server).get("/ready");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("pass");
  });

  it("GET /foo returns message", async () => {
    const res = await request(server).get("/foo");
    expect(res.status).toBe(200);
    expect(res.body.message).toContain("baz");
  });

  it("POST /hello greets by name", async () => {
    const res = await request(server).post("/hello").send({ name: "depot" });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("hello, depot");
  });
});
