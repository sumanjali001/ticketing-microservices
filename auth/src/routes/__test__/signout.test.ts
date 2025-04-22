import request from "supertest";
import { app } from "../../app";

it("returns empty cookie after signout", async () => {
  const signupResponse = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  const cookie = signupResponse.get("Set-Cookie");

  if (!cookie || cookie.length === 0) {
    throw new Error("Expected session cookie but got undefined.");
  }

  const response = await request(app)
    .post("/api/users/signout")
    .set("Cookie", cookie) 
    .expect(200);

  const signoutCookie = response.get("Set-Cookie");
  //console.log(signoutCookie); 

  if (!signoutCookie || signoutCookie.length === 0) {
    throw new Error("Expected cleared session cookie but got undefined.");
  }

  expect(signoutCookie[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
