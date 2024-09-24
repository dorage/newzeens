import "./libs/dotenv.ts";

(async () => {
  console.log(await require("./scrap/dol-letter.ts").default({ threshold: 3 }));
})();
