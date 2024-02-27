import { KyselyAdapter } from "kysely-schema";
import path from "path";

console.log(path.resolve(process.cwd(), "db"));
export const Ky = KyselyAdapter(path.resolve(process.cwd(), "db"), { fileMustExist: true });
