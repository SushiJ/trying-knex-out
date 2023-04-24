import { nanoid } from "nanoid";
import knex from "../config/knex";

export async function createShortUrl(url: string, userId: number) {
  const result = await knex("urls").insert({
    url: url,
    id: nanoid(),
    userId: userId,
  });
  return result[0];
}

export async function getUrl(id: string) {
  const url = await knex("urls").where({ id }).select(["url"]).first();
  if (!url) {
    throw new Error("The id is not valid");
  }
  return url.url;
}

export async function updateUrl(urlId: string, url: string, userId: number) {
  const current_url = await knex("urls")
    .where({ id: urlId })
    .select(["userId"])
    .first();

  if (!current_url) {
    throw new Error("URL not found");
  }
  if (current_url.userId !== userId) {
    throw new Error("Permission denined");
  }
  const result = await knex("urls").where({ id: urlId }).update({ url });
  return result;
}

export async function deleteUrl(urlId: string, userId: number) {
  const current_url = await knex("urls")
    .where({ id: urlId })
    .select(["userId"])
    .first();

  if (!current_url) {
    throw new Error("URL not found");
  }
  if (current_url.userId !== userId) {
    throw new Error("Permission denined");
  }

  await knex("urls").where({ id: urlId }).delete();
  return true;
}

export async function getAllUrls(
  userId: number,
  limit: number = 15,
  offset: number = 0
) {
  const result = await knex("urls")
    .where({ userId })
    .limit(limit)
    .offset(offset);

  if (!result) {
    throw new Error("No urls found");
  }
  return result;
}
