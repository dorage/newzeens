import { KyselyAdapter } from "@/src/index";
import path from "path";

export const Ky = KyselyAdapter(path.resolve("db.local"), { fileMustExist: true });
