export type User = {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Url = {
  id: string;
  url: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Visit = {
  id: string;
  urlId: string;
  createdAt: Date;
  updatedAt: Date;
};

declare module "knex/types/tables" {
  interface Tables {
    users: User;
    urls: Url;
    visits: Visit;
  }
}
