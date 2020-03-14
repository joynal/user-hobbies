import request from "supertest";
import httpStatus from "http-status";

import User from "../src/models/user";
import Hobby from "../src/models/hobby";
import app from "../src/config/express";
import dbConnect from "../src/config/database";
import generateData from "../src/seed/generator";

describe("Integration test user, hobby:", () => {
  beforeAll(async () => {
    dbConnect();
    await User.deleteMany({});
    await Hobby.deleteMany({});
    generateData();
  });

  describe("GET /api", () => {
    it("should return 200 OK", () => {
      return request(app)
        .get("/api/v1/status")
        .expect(200);
    });
  });

  describe("User", () => {
    it("GET /api/v1/users should get user list", async () => {
      const res = await request(app)
        .get("/api/v1/users")
        .expect(httpStatus.OK);

      expect(res.body.data.length).toBeGreaterThan(0);
      expect(Object.keys(res.body.data[0])).toEqual(
        expect.arrayContaining(['name']),
      );
    });

    it("GET /api/v1/users/{userId} should get user details", async () => {
      const userId = '5e6c9dbc90085656deeea66c';

      const res = await request(app)
        .get(`/api/v1/users/${userId}`)
        .expect(httpStatus.OK);

      expect(res.body.name).toEqual('Ambedle');
    });

    it("POST /api/v1/users should return 500, when required field is missing", async () => {
      await request(app)
        .post(`/api/v1/users`)
        .send({})
        .expect(httpStatus.BAD_REQUEST);
    });

    it("POST /api/v1/users should create a new user", async () => {
      const res = await request(app)
        .post(`/api/v1/users`)
        .send({ name: 'Joynal' })
        .expect(httpStatus.OK);

      expect(res.body.name).toEqual('Joynal');
    });

    it("PATCH /api/v1/users/{userId} should update the user", async () => {
      const userId = '5e6c9dbc90085656deeea66c';

      const res = await request(app)
        .patch(`/api/v1/users/${userId}`)
        .send({ name: 'Mikel Hassi' })
        .expect(httpStatus.OK);

      expect(res.body.name).toEqual('Mikel Hassi');
    });

    it("DELETE /api/v1/users/{userId} should remove the user", async () => {
      const userId = '5e6c9dbc90085656deeea66a';

      await request(app)
        .delete(`/api/v1/users/${userId}`)
        .expect(httpStatus.OK);
    });
  });

  describe("Hobby", () => {
    it("GET /api/v1/users/{userId}/hobbies should get hobby list for a user", async () => {
      const userId = '5e6c9dbc90085656deeea66c';

      const res = await request(app)
        .get(`/api/v1/users/${userId}/hobbies`)
        .expect(httpStatus.OK);

      expect(res.body.data.length).toBeGreaterThan(0);
      expect(Object.keys(res.body.data[0])).toEqual(
        expect.arrayContaining(['name', 'passionLevel', 'year']),
      );
    });

    it("GET /api/v1/hobbies/{hobbyId} should get hobby details", async () => {
      const hobbyId = '5e6c9dbc90085656deeea684';

      const res = await request(app)
        .get(`/api/v1/hobbies/${hobbyId}`)
        .expect(httpStatus.OK);

      expect(res.body.name).toEqual('Hobby 1');
      expect(res.body.passionLevel).toEqual('High');
      expect(res.body.year).toEqual(2011);
    });

    it("POST /api/v1/users/{userId}/hobbies should create a new hobby", async () => {
      const userId = '5e6c9dbc90085656deeea66c';

      const res = await request(app)
        .post(`/api/v1/users/${userId}/hobbies`)
        .send({ name: 'Gardening', passionLevel: 'Very-High', year: 2009 })
        .expect(httpStatus.OK);

      expect(res.body.name).toEqual('Gardening');
      expect(res.body.passionLevel).toEqual('Very-High');
      expect(res.body.year).toEqual(2009);
    });

    it("PATCH /api/v1/hobbies/{hobbyId} should update the hobby", async () => {
      const hobbyId = '5e6c9dbc90085656deeea684';

      const res = await request(app)
        .patch(`/api/v1/hobbies/${hobbyId}`)
        .send({ name: 'Fishing' })
        .expect(httpStatus.OK);

      expect(res.body.name).toEqual('Fishing');
    });

    it("DELETE /api/v1/hobbies/{hobbyId} should remove the hobby", async () => {
      const hobbyId = '5e6c9dbc90085656deeea680';

      await request(app)
        .delete(`/api/v1/hobbies/${hobbyId}`)
        .expect(httpStatus.OK);
    });
  });
});
