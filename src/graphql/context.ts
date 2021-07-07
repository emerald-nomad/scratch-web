import { Request, Response } from 'express';
import * as db from "./db"

export interface Context {
  req: Request;
  res: Response;
  db: db.IDB
}

export const createContext = (ctx: any) => ({
  ...ctx,
  db: db
})