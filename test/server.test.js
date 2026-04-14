const { describe, it, before, after } = require("node:test");
const assert = require("node:assert");
const { server } = require("../src/server");

let baseUrl;

before((_, done) => {
  server.listen(0, () => {
    const { port } = server.address();
    baseUrl = `http://localhost:${port}`;
    done();
  });
});

after((_, done) => {
  server.close(done);
});

describe("GET /", () => {
  it("returns endpoint list", async () => {
    const res = await fetch(baseUrl + "/");
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body.endpoints));
  });
});

describe("GET /ready", () => {
  it("returns pass status", async () => {
    const res = await fetch(baseUrl + "/ready");
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.status, "pass");
  });
});

describe("POST /hello", () => {
  it("greets by name", async () => {
    const res = await fetch(baseUrl + "/hello", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "world" }),
    });
    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.message, "hello, world");
  });
});
