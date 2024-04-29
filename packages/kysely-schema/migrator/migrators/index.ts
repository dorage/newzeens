import { down, toLatest, up } from "./migrate";
import { createNewMigration } from "./new";

const Migrator = {
  new: createNewMigration,
  toLatest,
  up,
  down,
};

export default Migrator;
