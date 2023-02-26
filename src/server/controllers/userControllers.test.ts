import request from "supertest";
import { type Request, type Response } from "express";
import User from "../../database/models/User";
import { getUsers } from "./userControllers";
import mongoose from "mongoose";
import app from "..";
import { type UserRegister } from "../types";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectDatabase from "../../database/connectDatabase";

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connections[0].close();
});

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

let server: MongoMemoryServer;

const mockedUser: UserRegister = {
  name: "sergi",
  email: "blfjd@gmail.com",
  password: "rboijdfbe",
  username: "sergi34",
};

describe("Given a POST 'users/register' endpoint", () => {
  describe("When it receives a request with username 'sergi27' and password '123456789'", () => {
    test("Then it should respond with status code '201' and message 'User registered successfully'", async () => {
      const expectedStatusCode = 201;
      const expectedResponseMessage = {
        message: "User registered successfully",
        username: mockedUser.username,
      };

      const requestContentHeader = { "Content-Type": "multipart/form-data" };
      const userRegisterEndpoint = "/users/register";

      const response = await request(app)
        .post(userRegisterEndpoint)
        .set(requestContentHeader)
        .field("name", mockedUser.name)
        .field("email", mockedUser.email)
        .field("username", mockedUser.username)
        .field("password", mockedUser.password)
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual(expectedResponseMessage);
    });
  });
});

afterAll(async () => {
  await User.deleteMany(mockedUser);
});
