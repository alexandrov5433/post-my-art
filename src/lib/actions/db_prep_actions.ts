'use server';
import { sql } from "@vercel/postgres";

export async function createDb() {
    try {
        await sql`
            CREATE TABLE "User" (
                "userID" SERIAL PRIMARY KEY,
                "username" varchar(200) NOT NULL,
                "email" varchar(200) NOT NULL,
                "password" varchar(1000) NOT NULL,
                "favoriteArts" int[] DEFAULT array[]::int[],
                "followedArtists" int[] DEFAULT array[]::int[],
                "postedArts" int[] DEFAULT array[]::int[],
                "profilePictureURL" text NOT NULL,
                "country" varchar(200) NULL,
                "instagramURL" text NULL,
                "facebookURL" text NULL,
                "exURL" text NULL,
                "publicEmail" varchar(200) NULL
            );
        `;
        await sql`
            CREATE TABLE "Art" (
                "artID" SERIAL PRIMARY KEY,
                "artPictureURL" text NOT NULL,
                "artOwnerID" int NOT NULL REFERENCES "User" ("userID"),
                "name" varchar(200) NOT NULL,
                "description" text NULL,
                "tags" text[] DEFAULT array[]::text[],
                "likes" int[] DEFAULT array[]::int[],
                "comments" int[] DEFAULT array[]::int[]
            );
        `;
        await sql`
            CREATE TABLE "Comment" (
                "commentID" SERIAL PRIMARY KEY,
                "commentOwnerID" int NOT NULL REFERENCES "User" ("userID"),
                "commentText" text NOT NULL,
                "timeOfPostingMS" bigint NOT NULL,
                "likes" int[] DEFAULT array[]::int[]
            );
        `;
        console.log('DB CREATED successfully!');
    } catch (error) {
        console.error(error);
    }
}

export async function dropDb() {
    try {
        await sql`DROP TABLE IF EXISTS "User", "Art", "Comment" CASCADE;`;
        console.log('DB DROPPED successfully!');
    } catch (error) {
        console.error(error);
    }
}