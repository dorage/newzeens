import { KyselyAdapter } from "kysely-schema";
import path from "path";

export const Ky = KyselyAdapter(path.resolve(process.cwd(), "db"), { fileMustExist: true });
