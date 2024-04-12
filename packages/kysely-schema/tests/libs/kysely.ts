import { KyselyAdapter } from "@/src/index";
import path from "path";

const db = process.env.DB_TEST;
export const Ky = KyselyAdapter(path.resolve(db), { fileMustExist: true });
