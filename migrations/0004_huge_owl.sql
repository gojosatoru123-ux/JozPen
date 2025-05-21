ALTER TABLE "users_table" RENAME TO "usersTable";--> statement-breakpoint
ALTER TABLE "usersTable" DROP CONSTRAINT "users_table_id_unique";--> statement-breakpoint
ALTER TABLE "usersTable" DROP CONSTRAINT "users_table_email_unique";--> statement-breakpoint
ALTER TABLE "usersTable" ADD COLUMN "profile_url" text;--> statement-breakpoint
ALTER TABLE "usersTable" ADD CONSTRAINT "usersTable_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "usersTable" ADD CONSTRAINT "usersTable_email_unique" UNIQUE("email");