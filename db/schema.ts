import { createInsertSchema } from "drizzle-zod";
import { pgTable, text } from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  plaidId: text("plaidId"),
  name: text("name").notNull(),
  userId: text("userId").notNull(),
});

export const insertAccountSchema = createInsertSchema(accounts);
