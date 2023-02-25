import { type Request, type Response } from "express";
import User from "../../database/models/User";
import { getUsers } from "./userControllers";

describe("Given the getUsers function", () => {
  describe("When it receives a res object", () => {
    test("Then it should call its status method with 200", async () => {
      const req = {} as Request;
      const res = { status: jest.fn() } as Partial<Response>;
      const next = () => ({});
      const statusCode = 200;

      User.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({}),
      }));

      await getUsers(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
  });
});
