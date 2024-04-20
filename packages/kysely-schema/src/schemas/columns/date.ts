import { z } from "zod";
import moment from "moment";

// export const zMomentDatetime = z
//   .string()
//   .transform((arg) => moment(arg, "YYYY-MM-DD HH:mm:ss").utc(false));

export const zMomentDatetime = z.string().datetime();
