import "./libs/dotenv.ts";
import fs from "fs";
import path from "path";

(async () => {
  const dirs = fs.readdirSync(path.resolve("src/scrap"));

  for (const dir of dirs) {
    if (dir.includes(".test.")) continue;
    console.log("start job: " + dir.split("/").pop());
    await require("./scrap/dol-letter.ts").default({ threshold: 6 });
    console.log("end job: " + dir.split("/").pop());
  }
})();
