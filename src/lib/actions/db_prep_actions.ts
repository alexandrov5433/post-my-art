'use server';
import { sql } from "@vercel/postgres";

export async function createDb() {
    try {
        await sql`
            CREATE TABLE "User" (
                "userID" int PRIMARY KEY,
                "username" varchar(200) NOT NULL,
                "email" varchar(200) NOT NULL,
                "password" varchar(1000) NOT NULL,
                "favoriteArts" int[] NOT NULL,
                "followedArtists" int[] NOT NULL,
                "postedArts" int[] NOT NULL,
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
                "artID" int PRIMARY KEY,
                "artPictureURL" text NOT NULL,
                "artOwnerID" int NOT NULL REFERENCES "User" ("userID"),
                "name" varchar(200) NOT NULL,
                "description" text NULL,
                "tags" text[] NOT NULL,
                "likes" int[] NOT NULL,
                "comments" int[] NOT NULL
            );
        `;
        await sql`
            CREATE TABLE "Comment" (
                "commentID" int PRIMARY KEY,
                "commentOwnerID" int NOT NULL REFERENCES "User" ("userID"),
                "commentText" text NOT NULL,
                "timeOfPostingMS" bigint NOT NULL,
                "likes" int[] NOT NULL
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