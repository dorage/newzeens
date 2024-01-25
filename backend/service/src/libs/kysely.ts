import { KyselyAdapter } from "kysely-schema";

export const Ky = () => KyselyAdapter("./db", { fileMustExist: true });
