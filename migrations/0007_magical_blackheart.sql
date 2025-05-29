ALTER TABLE "followings" RENAME COLUMN "my_id" TO "myId";--> statement-breakpoint
ALTER TABLE "followings" RENAME COLUMN "following_id" TO "followingId";--> statement-breakpoint
ALTER TABLE "followings" DROP CONSTRAINT "followings_my_id_usersTable_id_fk";
--> statement-breakpoint
ALTER TABLE "followings" DROP CONSTRAINT "followings_following_id_usersTable_id_fk";
--> statement-breakpoint
ALTER TABLE "followings" ADD CONSTRAINT "followings_myId_usersTable_id_fk" FOREIGN KEY ("myId") REFERENCES "public"."usersTable"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "followings" ADD CONSTRAINT "followings_followingId_usersTable_id_fk" FOREIGN KEY ("followingId") REFERENCES "public"."usersTable"("id") ON DELETE no action ON UPDATE no action;