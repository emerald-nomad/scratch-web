import { LOGIN_USER } from "lib";
import { createTestContext } from "lib/test-utils.api";
import { mockUser, mockUserRepository } from "graphql/repositories";

let mockCompare = true;
let mockSign = "token";

jest.mock("bcryptjs", () => ({
  compare: () => mockCompare,
}));

jest.mock("jsonwebtoken", () => ({
  sign: () => mockSign,
}));

describe("Login Mutation", () => {
  const ctx = createTestContext();
  beforeEach(() => {
    mockCompare = true;
    mockSign = "token";
  });

  it("should fail if username not found", async () => {
    const spy = jest
      .spyOn(mockUserRepository, "findByUsername")
      .mockImplementationOnce(async () => null);

    try {
      const res = await ctx.client.request(LOGIN_USER, {
        input: { username: "testuser", password: "12345" },
      });
    } catch (error) {
      const { password } = error.response.errors[0].data;

      expect(spy).toBeCalled();
      expect(password).toEqual("Invalid username/password combination");
    }
  });

  it("should fail if password is incorrect", async () => {
    mockCompare = false;

    try {
      const res = await ctx.client.request(LOGIN_USER, {
        input: { username: "testuser", password: "12345" },
      });
    } catch (error) {
      const { password } = error.response.errors[0].data;

      expect(password).toEqual("Invalid username/password combination");
    }
  });

  it("should return a user and a token", async () => {
    const res = await ctx.client.request(LOGIN_USER, {
      input: { username: "testuser", password: "12345" },
    });

    const { token, user } = res.login;

    expect(token).toEqual(mockSign);
    expect(user.id).toEqual(mockUser.id);
    expect(user.name).toEqual(mockUser.name);
    expect(user.username).toEqual(mockUser.username);
  });
});
