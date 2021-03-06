import { objectType, extendType, nonNull, inputObjectType, arg } from "nexus";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import {
  SignUpError,
  SIGNUP_ERROR_CODE,
  LoginError,
  LOGIN_ERROR_CODE,
  ServerError,
  REMOVE_USER_ERROR_CODE,
  RemoveUserError,
} from "../errors";
import { APP_SECRET } from "../../lib/constants";

const createToken = async (userId: string) => {
  const token = await sign({ userId }, APP_SECRET);

  return token;
};

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.id("id", { description: "Unique identification for user" });
    t.nonNull.string("name", { description: "User's name" });
    t.nonNull.string("username", { description: "Username for user" });
  },
});

export const SignUpInput = inputObjectType({
  name: "SignUpInput",
  definition(t) {
    t.nonNull.string("name", { description: "Name for new user" });
    t.nonNull.string("username", { description: "Username for new user" });
    t.nonNull.string("password", { description: "Password for new user" });
    t.nonNull.string("confirmPassword", {
      description: "Confirm password for new user",
    });
  },
});

export const LoginInput = inputObjectType({
  name: "LoginInput",
  definition(t) {
    t.nonNull.string("username", {
      description: "Username for user trying to login",
    });
    t.nonNull.string("password", {
      description: "Password for user trying to log in",
    });
  },
});

export const RemoveUserInput = inputObjectType({
  name: "RemoveUserInput",
  definition(t) {
    t.nonNull.string("username", {
      description: "Username for user to be deleted",
    });
  },
});

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.nonNull.field("user", {
      type: "User",
      description: "Object containing requested user data",
    });
    t.nonNull.string("token", {
      description: "JWT token for authenticating future requests",
    });
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("users", {
      type: "User",
      authorize: (_, args, { req, Auth }) => Auth.isDeveloper(req),
      async resolve(_, args, { User }) {
        return User.findAll();
      },
    });
  },
});

export const UserMutaion = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("signup", {
      type: "AuthPayload",
      args: {
        input: nonNull(arg({ type: "SignUpInput" })),
      },
      async resolve(
        _,
        { input: { name, username, password, confirmPassword } },
        { User }
      ) {
        try {
          const existingUser = await User.findByUsername(username);

          if (existingUser) {
            throw SignUpError({ username: "Username already in use" });
          }

          if (password !== confirmPassword) {
            throw SignUpError({
              confirmPassword: "Password fields do not match",
            });
          }

          const hashedPassword = await hash(password, 10);

          const user = await User.create({
            name,
            username,
            password: hashedPassword,
          });

          const token = await createToken(user.id);

          return { user, token };
        } catch (error) {
          if (error.extensions?.code === SIGNUP_ERROR_CODE) {
            throw error;
          } else {
            console.error(error);
            throw ServerError();
          }
        }
      },
    });

    t.nonNull.field("login", {
      type: "AuthPayload",
      args: {
        input: nonNull(arg({ type: "LoginInput" })),
      },
      async resolve(_, { input: { username, password } }, { User }) {
        try {
          const user = await User.findByUsername(username);

          if (!user) {
            throw LoginError({
              password: "Invalid username/password combination",
            });
          }

          const validPassword = await compare(password, user.password);

          if (!validPassword) {
            throw LoginError({
              password: "Invalid username/password combination",
            });
          }

          const token = createToken(user.id);

          return {
            token,
            user,
          };
        } catch (error) {
          if (error.extensions?.code === LOGIN_ERROR_CODE) {
            throw error;
          } else {
            console.error(error);
            throw ServerError();
          }
        }
      },
    });

    t.nonNull.field("removeUser", {
      type: "Boolean",
      authorize: (_, args, { req, Auth }) => Auth.isDeveloper(req),
      args: {
        input: nonNull(arg({ type: "RemoveUserInput" })),
      },
      async resolve(_, { input: { username } }, { User }) {
        try {
          const existingUser = await User.findByUsername(username);

          if (!existingUser) {
            throw RemoveUserError({
              username: `No user exists with this username: ${username}`,
            });
          }

          return User.delete(username);
        } catch (error) {
          const { code } = error.extensions;
          if (code === REMOVE_USER_ERROR_CODE) {
            throw error;
          } else {
            console.error(error);
            throw ServerError();
          }
        }
      },
    });
  },
});
