import { DB } from "./db";

export interface Context {
  db: DB
}

export const context: Context = {
  db: new DB(),
}