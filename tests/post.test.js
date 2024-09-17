const { setupStrapi, cleanupStrapi } = require("./helpers/strapi");
const request = require('supertest');

beforeAll(async () => {
  await setupStrapi();
});

afterAll(async () => {
  await cleanupStrapi();
});

it("should return referral code", async () => {
  const mockData = {
    data: {
      email: 'test@example.com'
    }
  };

  const response = await request(strapi.server.httpServer)
    .post("/api/emails")
    .set("accept", "application/json")
    .set("Content-Type", "application/json")
    .send(mockData);

  const responseBody = response.body;

  expect(responseBody).toHaveProperty('referral_code');
  
  expect(responseBody.referral_code).toMatch(/^[A-Z0-9]{6}$/);
});