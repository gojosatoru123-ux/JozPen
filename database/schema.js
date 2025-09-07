import { pgTable, uuid, varchar, date, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable('usersTable', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull().unique(),
  joinedAt: date('joined_at', { withTimeZone: true, }).notNull().defaultNow(),
  profileUrl: text('profile_url'),
  isAuthorized: boolean('is_authorized').notNull().default(false),
})
// format of column name is a_b not camel Case
export const blogs = pgTable('blogs', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  author: varchar('author', { length: 100 }).notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  tags: text('tags'),
  categories: text('categories'),
  thumbnailUrl: text('thumbnail_url'),
  readingTime: varchar('reading_time', { length: 10 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  expireAt: timestamp('expire_at', { withTimezone: true }),
});

export const followings = pgTable('followings',{
  id:uuid('id').notNull().primaryKey().defaultRandom().unique(),
  myId:uuid('myId').notNull().references(()=>usersTable.id),
  followingId:uuid('followingId').notNull().references(()=>usersTable.id),
  createdAt:date('joined_at').notNull().defaultNow()
})