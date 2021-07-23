import { Request, Response } from 'express';
import { authRepository, AuthRepository, userRepository, UserRepository } from './repositories';

export interface Context {
  req: Request;
  res: Response;
  Auth: AuthRepository;
  User: UserRepository;
}

export const createContext = (ctx: any) => ({
  ...ctx,
  Auth: authRepository,
  User: userRepository
})