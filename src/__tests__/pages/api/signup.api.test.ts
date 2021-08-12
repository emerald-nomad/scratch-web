import { createTestContext } from "lib/test-utils.api";
import { mockUser, mockUserRepository } from "graphql/repositories";
import { SIGN_UP_USER } from "lib";

jest.mock("jsonwebtoken", () => ({
  sign: () => "token",
}));

const variables = {
  input: {
    name: "Test User",
    username: "testuser",
    password: "12345",
    confirmPassword: "12345",
  },
};

describe("SignUp Mutation", () => {
  const ctx = createTestContext();

  it("should fail if user already exists with username", async () => {
    const spy = jest
      .spyOn(mockUserRepository, "findByUsername")
      .mockImplementationOnce(async () => mockUser);

    try {
      await ctx.client.request(SIGN_UP_USER, variables);
    } catch (error) {
      const { username } = error.response.errors[0].data;

      expect(spy).toBeCalled();
      expect(username).toEqual("Username already in use");
    }
  });

  it("should fail if passwords do not match", async () => {
    const spy = jest
      .spyOn(mockUserRepository, "findByUsername")
      .mockImplementationOnce(async () => null);

    try {
      await ctx.client.request(SIGN_UP_USER, {
        input: { ...variables.input, confirmPassword: "1" },
      });
    } catch (error) {
      const { confirmPassword } = error.response.errors[0].data;

      expect(spy).toBeCalled();
      expect(confirmPassword).toEqual("Password fields do not match");
    }
  });

  it("should return a user and a token", async () => {
    const spy = jest
      .spyOn(mockUserRepository, "findByUsername")
      .mockImplementationOnce(async () => null);

    const res = await ctx.client.request(SIGN_UP_USER, variables);
    const { token, user } = res.signup;

    expect(token).toEqual("token");
    expect(user.id).toEqual(mockUser.id);
    expect(user.name).toEqual(mockUser.name);
    expect(user.username).toEqual(mockUser.username);
  });
});
