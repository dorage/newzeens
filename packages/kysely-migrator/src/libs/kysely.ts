import { KyselyAdapter } from "kysely-schema";
import path from "path";

export const Ky = KyselyAdapter(path.resolve("db.local"), { fileMustExist: true });
