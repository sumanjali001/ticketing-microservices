import request from "supertest";
import { app } from "../../app";

it("returns current user", async () => {
  const cookie = await global.signin();
  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .expect(200);

  expect(response.body.currentUser.email).toBe("test@test.com");
});
it("returns current user as null", async () => {
  const response = await request(app).get("/api/users/currentuser").expect(200);

  expect(response.body.currentUser).toBeNull();
});
