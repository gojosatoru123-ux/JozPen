ALTER TABLE "blogs" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_id_unique" UNIQUE("id");