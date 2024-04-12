import { createNewMigration } from "./libs/new-migration";
import { migrator } from "./libs/migrator";

const main = async () => {
  if (process.argv.includes("latest")) {
    console.log("migrate to latest");
    await migrator.toLatest();
    console.log("migrate to latest done");
  } else if (process.argv.includes("down")) {
    await migrator.down();
    console.log("migrate down done");
  } else if (process.argv.includes("new")) {
    createNewMigration();
  } else {
    console.log("not prepared yet");
  }
};

main();
