import { migrate } from "drizzle-orm/postgres-js/migrator";

import { db, sql } from "./";

(async () => {
  await migrate(db, { migrationsFolder: __dirname + "/migrations" });
  console.log(__dirname + "/migrations");
  await sql.end();
})();
