import { describe, it, mock } from "node:test";
import assert from "node:assert";
import {
  getController,
  getByIdController,
  postController,
  patchController,
  deleteController,
} from "#controllers/controller.js";

describe("GET controller", () => {
  it("should return a 200 status code", async () => {
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
    mock.method(getController, "BaseModel.find", async () =>
      Promise.resolve(true)
    );

    const response = await getController(req, res);
    console.log({ response });
  });
});

// describe("GET by id controller", () => {
//   const response = getByIdController();
// });

// describe("POST controller", () => {
//   const response = postController();
// });

// describe("PATCH controller", () => {
//   const response = patchController();
// });

// describe("DELETE controller", () => {
//   const response = deleteController();
// });
