import { down, toLatest, up } from "./migrate";
import { mock } from "./mock";
import { createNewMigration } from "./new";

const Migrator = {
  new: createNewMigration,
  mock,
  toLatest,
  up,
  down,
};

export default Migrator;
