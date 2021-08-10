import { IUser, User } from "../db";

export interface UserRepository {
  findAll: () => Promise<IUser[]>;
  findByUsername: (username: string) => Promise<IUser | null>;
  create: (args: {
    name: string;
    username: string;
    password: string;
  }) => Promise<IUser>;
  delete: (username: string) => Promise<boolean>;
}

export const userRepository: UserRepository = {
  findAll: async () => await User.find(),

  findByUsername: async (username) => await User.findOne({ username }),

  create: async ({ name, username, password }) =>
    await User.create({ name, username, password }),

  delete: async (username) => !!(await User.deleteOne({ username })).ok,
};

const mockUser = {
  id: "1",
  name: "Mock User",
  username: "mockuser",
  password: "12345",
  role: "DEVELOPER",
} as IUser;

export const mockUserRepository: UserRepository = {
  findAll: async () => [mockUser],

  findByUsername: async () => mockUser,

  create: async () => mockUser,

  delete: async () => true,
};
