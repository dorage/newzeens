import "./libs/dotenv";
import { createNewMigration } from "./libs/new-migration";
import { migrator } from "./libs/migrator";

const main = async () => {
  if (process.argv.includes("latest")) {
    await migrator.toLatest();
    console.log("✔️ migrate to latest has been done");
    return;
  }

  if (process.argv.includes("down")) {
    await migrator.down();
    console.log("✔️ migrate to down has been done");
    return;
  }

  if (process.argv.includes("new")) {
    createNewMigration();
    console.log("✔️ new migration has been created");
    return;
  }
};

main();
