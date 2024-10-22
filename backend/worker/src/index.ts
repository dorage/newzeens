import "./libs/dotenv.ts";
import fs from "fs";
import path from "path";

(async () => {
  const dirs = fs.readdirSync(path.resolve("src/scrap"));
  const filename = `error_${Date.now()}`;

  for (const dir of dirs) {
    const newsletter = dir.split("/").pop();
    try {
      if (dir.includes(".test.")) continue;
      console.log(dir);
      console.log("start job: " + newsletter);
      await require(`./scrap/${dir}`).default({ threshold: 6 });
      console.log("end job: " + newsletter);
    } catch (err) {
      console.error(`❌ Error has occured in ${newsletter}`, err);
      fs.appendFileSync(filename, `\n❌ ${newsletter} : ${err}`);
    }
  }
})();
