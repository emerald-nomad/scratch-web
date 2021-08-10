import { createTestContext, LOGIN_USER } from "lib";

const ctx = createTestContext();

describe("Login Mutation", () => {
  it("should pass", async () => {
    try {
      const res = await ctx.client.request(LOGIN_USER, {
        input: { username: "testuser", password: "12345" },
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  });
});
