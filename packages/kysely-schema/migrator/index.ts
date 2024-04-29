import "./libs/dotenv";
import Migrator from "./migrators";

const main = async () => {
  if (process.argv.includes("latest")) {
    await Migrator.toLatest();
    console.log("✔️ migrate to latest has been done");
    return;
  }

  if (process.argv.includes("down")) {
    await Migrator.down();
    console.log("✔️ migrate to down has been done");
    return;
  }

  if (process.argv.includes("new")) {
    Migrator.new();
    console.log("✔️ new migration has been created");
    return;
  }
};

main();
