import { Request, Response } from 'express';
import { userRepository, UserRepository } from './repositories';

export interface Context {
  req: Request;
  res: Response;
  User: UserRepository
}

export const createContext = (ctx: any) => ({
  ...ctx,
  User: userRepository
})