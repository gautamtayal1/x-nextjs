/*
  Warnings:

  - The `likes` column on the `Comment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "likes",
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "media" DROP NOT NULL,
ALTER COLUMN "likes" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profilePhoto" DROP NOT NULL;
