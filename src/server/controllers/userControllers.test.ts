import request from "supertest";
import { type Request, type Response } from "express";
import User from "../../database/models/User";
import { getUsers, loginUser } from "./userControllers";
import mongoose from "mongoose";
import app from "..";
import { type UserCredentials, type UserRegister } from "../types";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectDatabase from "../../database/connectDatabase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDatabase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany(mockedUser);
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

describe("Given a loginUser controller", () => {
  describe("When it receives a request with a username `sergi27` and password `legendofdragoon` and the user is registered in the database", () => {
    test("Then it should call its status method with 200 and its json method with a token", async () => {
      const mockedUser: UserCredentials = {
        username: "sergi27",
        password: "legendofdragoon",
      };
      const req = {} as Request<
        Record<string, unknown>,
        Record<string, unknown>,
        UserCredentials
      >;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const next = () => ({});
      const expectedStatusCode = 200;
      const expectedBodyResponse = { token: "tokensito" };

      req.body = mockedUser;

      User.findOne = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({
          ...mockedUser,
          _id: new mongoose.Types.ObjectId(),
        }),
      }));

      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue("tokensito");

      await loginUser(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedBodyResponse);
    });
  });
});
