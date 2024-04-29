import { promises as _fs } from "fs";
import fs from "fs";
import { FileMigrationProvider, MigrationResultSet, Migrator } from "kysely";
import * as path from "path";
import { Ky as db } from "../libs/kysely";
import { DIR_MIGRATION } from "../constants/path";

const insertMock = async () => {};

export const mock = insertMock;
