import * as path from "path";
import { DIR_MIGRATION } from "../constants/path";
import { Ky } from "../libs/kysely";
import { getAppliedLatestMigrationName } from "./utils";

const insertMock = async () => {
  const latestMigrationName = await getAppliedLatestMigrationName();

  const mockModule = await import(path.join(DIR_MIGRATION, latestMigrationName, "mocks", "index"));
  if (mockModule?.insert == null || typeof mockModule.insert !== "function")
    throw new Error("Can't find insert() function");

  mockModule.insert.call(null, Ky);
};

export const mock = insertMock;
