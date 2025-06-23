// import "dotenv/config";
// import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//   out: "./drizzle",
//   schema: "./db/schema.ts",
//   dialect: "turso",
//   dbCredentials: {
//     url: (process.env.TURSO_DATABASE_URL as string) || "file:dev.db",
//     authToken: process.env.TURSO_AUTH_TOKEN,
//   },
// });
// drizzle.config.ts
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema:           './src/db/schema.ts',
  out:              './drizzle/migrations',
  dialect:          'turso',                     // libSQL/Turso dialect
  dbCredentials: {
    url:       process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});
