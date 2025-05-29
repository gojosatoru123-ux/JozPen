CREATE TABLE "followings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"my_id" uuid NOT NULL,
	"following_id" uuid NOT NULL,
	"joined_at" date DEFAULT now() NOT NULL,
	CONSTRAINT "followings_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "followings" ADD CONSTRAINT "followings_my_id_usersTable_id_fk" FOREIGN KEY ("my_id") REFERENCES "public"."usersTable"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "followings" ADD CONSTRAINT "followings_following_id_usersTable_id_fk" FOREIGN KEY ("following_id") REFERENCES "public"."usersTable"("id") ON DELETE no action ON UPDATE no action;