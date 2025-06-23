// import { drizzle } from "drizzle-orm/libsql";
// import * as schema from "./schema";

// export const db = drizzle({
//   connection: {
//     url: (process.env.TURSO_DATABASE_URL as string) || "file:dev.db",
//     authToken: process.env.TURSO_AUTH_TOKEN,
//   },
//   schema: schema,
// });

// src/lib/db.ts
import 'dotenv/config';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

const client = createClient({
  url:       process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

console.log('env TURSO_DATABASE_URL=', process.env.TURSO_DATABASE_URL);
console.log('env TURSO_AUTH_TOKEN=', process.env.TURSO_AUTH_TOKEN);

export const db = drizzle(client, { schema });

