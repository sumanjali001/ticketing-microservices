import request from "supertest";
import { app } from "../../app";

it("return 201 on signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test1234",
    })
    .expect(201);
});

it("return 400 with invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test",
      password: "test1234",
    })
    .expect(400);
});

it("return 400 with invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "p",
    })
    .expect(400);
});

it("return 400 with empty email and  password", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("returns duplicate email 400", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test1234",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test1234",
    })
    .expect(400);
});

it("sets cookie after succesful signup",async()=>{
    const response=await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@gmail.com",
      password: "test1234",
    })
    .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
})
