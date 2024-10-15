import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { baseMiddleware } from "#middlewares/middleware.js";

describe("Base middleware", () => {
  it("should pass if req.body is not empty", () => {
    const req = { body: { name: "fake content" } };
    const res = {};
    const next = () => {};
    const response = baseMiddleware(req, res, next);

    assert.strictEqual(response, undefined);
  });

  it("should return a 404 if req.body is empty", () => {
    const req = {};
    const res = {
      status: (code) => {
        return {
          json: (data) => {
            return { code, data };
          },
        };
      },
    };
    const next = () => {};
    const response = baseMiddleware(req, res, next);

    assert.strictEqual(response.code, 404);
  });

  it("should return a 500 if a problem occur", () => {
    const req = { body: { name: "fake content" } };
    const res = {
      status: (code) => {
        return {
          json: (data) => {
            return { code, data };
          },
        };
      },
    };

    const response = baseMiddleware(req, res);

    assert.strictEqual(response.code, 500);
  });
});
