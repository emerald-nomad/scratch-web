import { Request, Response } from 'express';
import { apiRepository, ApiRepository } from './repositories';

export interface Context {
  req: Request;
  res: Response;
  apiRepository: ApiRepository
}

export const createContext = (ctx: any) => ({
  ...ctx,
  apiRepository
})