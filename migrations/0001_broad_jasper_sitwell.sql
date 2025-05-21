CREATE TABLE "blogs" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"author" varchar(100) NOT NULL,
	"excerpt" text,
	"content" text NOT NULL,
	"tags" text,
	"categories" text,
	"thumbnail_url" text,
	"reading_time" varchar(10),
	"metadata" text,
	"is_published" boolean DEFAULT false,
	"published_at" timestamp,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug")
);
