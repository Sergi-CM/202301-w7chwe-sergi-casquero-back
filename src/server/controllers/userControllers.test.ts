import { request, type Request, type Response } from "express";
import User from "../../database/models/User";
import { type UserRegister } from "../types";
import { createUser, getUsers } from "./userControllers";

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

describe("Given the createUser function", () => {
  describe("when it receives a req object with a robot data and a res object", () => {
    test("Then it should call its status method with 201", async () => {
      const newUser: UserRegister = {
        name: "Marius",
        username: "marius69",
        email: "marius@isdi.com",
        password: "l@sDevt00ls!",
        avatar: "mariuswithcapucha.jpg",
      };
      const req = { body: newUser } as Request<
        Record<string, unknown>,
        Record<string, unknown>,
        UserRegister
      >;
      const res = { status: jest.fn() } as Partial<Response>;
      const next = () => ({});
      const statusCode = 201;

      User.create = jest.fn().mockReturnValue(newUser);
      await createUser(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
  });
});
